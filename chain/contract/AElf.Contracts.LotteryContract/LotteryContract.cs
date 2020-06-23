using System.Collections.Generic;
using System.Linq;
using AElf.Contracts.MultiToken;
using AElf.CSharp.Core;
using AElf.Sdk.CSharp;
using AElf.Types;
using Google.Protobuf.WellKnownTypes;

namespace AElf.Contracts.LotteryContract
{
    public partial class LotteryContract : LotteryContractContainer.LotteryContractBase
    {
        public override Empty Initialize(InitializeInput input)
        {
            Assert(State.TokenSymbol.Value == null, "Already initialized");
            State.TokenSymbol.Value = input.TokenSymbol;

            State.Admin.Value = Context.Sender;

            State.TokenContract.Value =
                Context.GetContractAddressByName(SmartContractConstants.TokenContractSystemName);
            State.AEDPoSContract.Value =
                Context.GetContractAddressByName(SmartContractConstants.ConsensusContractSystemName);

            State.Price.Value = input.Price == 0 ? DefaultPrice : input.Price;
            State.DrawingLag.Value = input.DrawingLag == 0 ? DefaultDrawingLag : input.DrawingLag;
            State.MaximumAmount.Value = input.MaximumAmount == 0 ? MaximumBuyAmount : input.MaximumAmount;
            State.SelfIncreasingIdForLottery.Value = 1;

            State.CurrentPeriod.Value = 1;
            State.Periods[1] = new PeriodBody
            {
                StartId = State.SelfIncreasingIdForLottery.Value,
                BlockNumber = Context.CurrentHeight.Add(State.DrawingLag.Value),
                RandomHash = Hash.Empty
            };

            return new Empty();
        }

        public override BoughtLotteriesInformation Buy(Int64Value input)
        {
            AssertIsNotSuspended();
            Assert(input.Value < State.MaximumAmount.Value, $"单次购买数量不能超过{State.MaximumAmount.Value} :)");
            Assert(input.Value > 0, "单次购买数量不能低于1");

            var currentPeriod = State.CurrentPeriod.Value;
            // 如果Sender为本期第一次购买，为其初始化一些信息
            if (State.OwnerToLotteries[Context.Sender][currentPeriod] == null)
            {
                State.OwnerToLotteries[Context.Sender][currentPeriod] = new LotteryList();
            }

            State.BoughtLotteriesCount[Context.Sender] = State.BoughtLotteriesCount[Context.Sender].Add(input.Value);

            // 转账到本合约（需要Sender事先调用Token合约的Approve方法进行额度授权）
            var amount = State.Price.Value.Mul(input.Value);
            Context.LogDebug(() => $"Lottery cost {amount} {State.TokenSymbol} tokens.");
            State.TokenContract.TransferToContract.Send(new TransferToContractInput
            {
                Symbol = State.TokenSymbol.Value,
                Amount = amount
            });

            var startId = State.SelfIncreasingIdForLottery.Value;
            var newIds = new List<long>();
            // 买多少个，添加多少个彩票
            for (var i = 0; i < input.Value; i++)
            {
                var selfIncreasingId = State.SelfIncreasingIdForLottery.Value;
                var lottery = new Lottery
                {
                    Id = selfIncreasingId,
                    Owner = Context.Sender,
                    Block = Context.CurrentHeight,
                };
                State.Lotteries[selfIncreasingId] = lottery;

                newIds.Add(selfIncreasingId);

                State.SelfIncreasingIdForLottery.Value = selfIncreasingId.Add(1);
            }

            var currentIds = State.OwnerToLotteries[Context.Sender][currentPeriod];
            currentIds.Ids.Add(newIds);
            State.OwnerToLotteries[Context.Sender][currentPeriod] = currentIds;

            return new BoughtLotteriesInformation
            {
                StartId = startId,
                Amount = input.Value
            };
        }

        public override Empty PrepareDraw(Empty input)
        {
            AssertIsNotSuspended();
            Assert(Context.Sender == State.Admin.Value, "No permission to prepare!");

            // Check whether current period drew except period 1.
            if (State.CurrentPeriod.Value != 1)
            {
                Assert(State.Periods[State.CurrentPeriod.Value.Sub(1)].RandomHash != Hash.Empty,
                    $"Period {State.CurrentPeriod.Value} hasn't drew.");
            }

            Assert(State.SelfIncreasingIdForLottery.Value > State.RewardCount.Value.Add(1),
                "Unable to terminate this period.");

            State.CurrentPeriod.Value = State.CurrentPeriod.Value.Add(1);

            // 初始化下一届基本信息
            InitialNextPeriod();

            return new Empty();
        }

        public override Empty Draw(Int64Value input)
        {
            AssertIsNotSuspended();
            var currentPeriod = State.CurrentPeriod.Value;
            var previousPeriodBody = State.Periods[currentPeriod.Sub(1)];
            var currentPeriodBody = State.Periods[currentPeriod];

            Assert(input.Value.Add(1) == currentPeriod, "Incorrect period.");
            Assert(currentPeriod > 1, "Not ready to draw.");
            Assert(Context.Sender == State.Admin.Value, "No permission to draw!");
            Assert(previousPeriodBody.RandomHash == Hash.Empty, "Latest period already drawn.");
            Assert(
                previousPeriodBody.SupposedDrawDate == null ||
                previousPeriodBody.SupposedDrawDate.ToDateTime().DayOfYear >=
                Context.CurrentBlockTime.ToDateTime().DayOfYear,
                "Invalid draw date.");

            var expectedBlockNumber = currentPeriodBody.BlockNumber;
            Assert(Context.CurrentHeight >= expectedBlockNumber, "Block height not enough.");

            if (previousPeriodBody.Rewards == null || !previousPeriodBody.Rewards.Any())
            {
                throw new AssertionException("Reward list is empty.");
            }

            var randomHash = State.AEDPoSContract.GetRandomHash.Call(new Int64Value
            {
                Value = expectedBlockNumber
            });

            // Deal with lotteries base on the random hash.
            DealWithLotteries(previousPeriodBody.Rewards.ToDictionary(r => r.Key, r => r.Value), randomHash);

            return new Empty();
        }

        public override Empty TakeReward(TakeRewardInput input)
        {
            AssertIsNotSuspended();
            var lottery = State.Lotteries[input.LotteryId];
            if (lottery == null)
            {
                throw new AssertionException("Lottery id not found.");
            }

            Assert(lottery.Owner == Context.Sender, "只能领取宁亲自买的彩票 :)");
            Assert(!string.IsNullOrEmpty(lottery.RewardName), "宁没有中奖嗷 :(");
            Assert(string.IsNullOrEmpty(lottery.RegistrationInformation),
                $"宁已经领取过啦！登记信息：{State.Lotteries[input.LotteryId].RegistrationInformation}");

            State.Lotteries[input.LotteryId].RegistrationInformation = input.RegistrationInformation;

            // Distribute the reward now. Maybe transfer some tokens.

            return new Empty();
        }

        public override Empty AddRewardList(RewardList input)
        {
            AssertSenderIsAdmin();
            foreach (var map in input.RewardMap)
            {
                State.RewardMap[map.Key] = map.Value;
            }

            if (State.RewardCodeList.Value == null)
            {
                State.RewardCodeList.Value = new StringList {Value = {input.RewardMap.Keys}};
            }
            else
            {
                State.RewardCodeList.Value.Value.AddRange(input.RewardMap.Keys);
            }

            return new Empty();
        }

        public override Empty SetRewardListForOnePeriod(RewardsInfo input)
        {
            AssertSenderIsAdmin();
            var periodBody = State.Periods[input.Period];
            Assert(periodBody.RandomHash == Hash.Empty, "This period already terminated.");
            if (periodBody == null)
            {
                periodBody = new PeriodBody
                {
                    Rewards = {input.Rewards},
                    SupposedDrawDate = input.SupposedDrawDate
                };
                State.AllRewardsCount.Value = State.AllRewardsCount.Value.Add(input.Rewards.Values.Sum());
            }
            else
            {
                var count = State.AllRewardsCount.Value;
                count = count.Sub(periodBody.Rewards.Values.Sum());
                count = count.Add(input.Rewards.Values.Sum());
                State.AllRewardsCount.Value = count;
                periodBody.Rewards.Clear();
                periodBody.Rewards.Add(input.Rewards);
                periodBody.SupposedDrawDate = input.SupposedDrawDate;
            }

            State.Periods[input.Period] = periodBody;
            return new Empty();
        }

        public override Empty ResetPrice(Int64Value input)
        {
            AssertSenderIsAdmin();
            State.Price.Value = input.Value;
            return new Empty();
        }

        public override Empty ResetDrawingLag(Int64Value input)
        {
            AssertSenderIsAdmin();
            State.DrawingLag.Value = input.Value;
            return new Empty();
        }

        public override Empty ResetMaximumBuyAmount(Int64Value input)
        {
            AssertSenderIsAdmin();
            State.MaximumAmount.Value = input.Value;
            return new Empty();
        }

        public override Empty Suspend(Empty input)
        {
            AssertSenderIsAdmin();
            State.IsSuspend.Value = true;
            return new Empty();
        }

        public override Empty Recover(Empty input)
        {
            AssertSenderIsAdmin();
            State.IsSuspend.Value = false;
            return new Empty();
        }
    }
}