using System;
using System.Collections.Generic;
using System.Linq;
using AElf.Contracts.MultiToken;
using AElf.Sdk.CSharp;
using AElf.Types;
using Google.Protobuf.WellKnownTypes;

namespace AElf.Contracts.LotteryDemoContract
{
    public partial class LotteryDemoContract : LotteryDemoContractContainer.LotteryDemoContractBase
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

            var tokenInfo = State.TokenContract.GetTokenInfo.Call(new GetTokenInfoInput
            {
                Symbol = input.TokenSymbol
            });
            State.Decimals.Value = tokenInfo.Decimals;

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

        public override BoughtLotteriesInformation Buy(SInt64Value input)
        {
            Assert(input.Value < State.MaximumAmount.Value, $"单次购买数量不能超过{State.MaximumAmount.Value} :)");
            Assert(input.Value > 0, "单次购买数量不能低于1");

            var currentPeriod = State.CurrentPeriod.Value;
            // 如果Sender为本届第一次购买，为其初始化一些信息
            if (State.OwnerToLotteries[Context.Sender][currentPeriod] == null)
            {
                State.OwnerToLotteries[Context.Sender][currentPeriod] = new LotteryList();
            }

            // 转账到本合约（需要Sender事先调用Token合约的Approve方法进行额度授权）
            State.TokenContract.TransferToContract.Send(new TransferToContractInput
            {
                Symbol = State.TokenSymbol.Value,
                Amount = GetPrecision().Mul(State.Price.Value).Mul(input.Value)
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
                    Level = 0,
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
            Assert(Context.Sender == State.Admin.Value, "No permission to prepare!");

            // 检查没有未开的奖
            Assert(State.CurrentPeriod.Value == 1 || // 为1则跳过验证，此时该交易的意义是结束第1期
                   State.Periods[State.CurrentPeriod.Value].RandomHash != Hash.Empty,
                "There's still at least one period not finished.");

            State.CurrentPeriod.Value = State.CurrentPeriod.Value.Add(1);

            // 初始化下一届基本信息
            State.Periods[State.CurrentPeriod.Value] = new PeriodBody
            {
                StartId = State.SelfIncreasingIdForLottery.Value,
                BlockNumber = Context.CurrentHeight.Add(State.DrawingLag.Value),
                RandomHash = Hash.Empty
            };

            return new Empty();
        }

        public override Empty Draw(DrawInput input)
        {
            Assert(Context.Sender == State.Admin.Value, "No permission to draw!");
            Assert(State.Periods[State.CurrentPeriod.Value].RandomHash == Hash.Empty, "Latest period already drawn.");
            var expectedBlockNumber = State.Periods[State.CurrentPeriod.Value].BlockNumber;
            Assert(Context.CurrentHeight >= expectedBlockNumber, "Block height not enough.");

            var randomHash = State.AEDPoSContract.GetRandomHash.Call(new SInt64Value
            {
                Value = expectedBlockNumber
            });

            // 根据随机数处理彩票
            DealWithLotteries(input.LevelsCount, randomHash);

            return new Empty();
        }

        public override Empty TakeReward(TakeRewardInput input)
        {
            Assert(State.OwnerToLotteries[Context.Sender][input.Period] != null, $"宁没有买过第{input.Period}期的彩票 :)");
            Assert(State.OwnerToLotteries[Context.Sender][input.Period].Ids.Contains(input.LotteryId),
                "只能领取宁亲自买的彩票 :)");
            Assert(State.Lotteries[input.LotteryId].Level != 0, "宁没有中奖嗷 :(");
            Assert(!State.Lotteries[input.LotteryId].RegistrationInformation.Any(),
                $"宁已经领取过啦！登记信息：{State.Lotteries[input.LotteryId].RegistrationInformation}");

            State.Lotteries[input.LotteryId].RegistrationInformation = input.RegistrationInformation;
            
            // Distribute the reward now. Maybe transfer some tokens.

            return new Empty();
        }

        public override GetRewardResultOutput GetRewardResult(SInt64Value input)
        {
            var period = State.Periods[input.Value];
            var rewardIds = period?.RewardIds;
            Assert(rewardIds != null, "Result of this period not found.");
            // ReSharper disable once PossibleNullReferenceException
            var randomHash = period.RandomHash;
            // ReSharper disable once AssignNullToNotNullAttribute
            var lotteries = rewardIds.Select(id => State.Lotteries[id] ?? new Lottery()).ToList();

            return new GetRewardResultOutput
            {
                Period = input.Value,
                RandomHash = randomHash,
                RewardLotteries = {lotteries}
            };
        }

        public override GetBoughtLotteriesOutput GetBoughtLotteries(GetBoughtLotteriesInput input)
        {
            List<long> returnLotteryIds;
            var owner = input.Owner ?? Context.Sender;
            var allLotteryIds = State.OwnerToLotteries[owner][input.Period].Ids.ToList();
            if (allLotteryIds.Count <= MaximumReturnAmount)
            {
                returnLotteryIds = allLotteryIds;
            }
            else
            {
                Assert(input.StartIndex < allLotteryIds.Count, "Invalid start index.");
                var takeAmount = Math.Min(allLotteryIds.Count.Sub(input.StartIndex), MaximumReturnAmount);
                returnLotteryIds = allLotteryIds.Skip(input.StartIndex).Take((int) takeAmount).ToList();
            }

            return new GetBoughtLotteriesOutput
            {
                Lotteries =
                {
                    returnLotteryIds.Select(id => State.Lotteries[id] ?? new Lottery())
                }
            };
        }

        private void DealWithLotteries(IEnumerable<long> levelsCount, Hash randomHash)
        {
            var currentPeriodNumber = State.CurrentPeriod.Value;
            var startId = State.Periods[currentPeriodNumber.Sub(1)].StartId;
            var endId = State.Periods[currentPeriodNumber].StartId.Sub(1);
            var poolCount = endId.Sub(startId).Add(1);
            // category为奖品编号
            // 比如LevelsCount = [2,0,3,6,0]，category从1到5
            // 1号奖品的奖品数为2，2号奖品的奖品数为0，3号奖品的奖品书为3，……
            long category = 1;
            var rewardIds = new List<long>();
            var alreadyReward = new List<long>();
            foreach (var count in levelsCount)
            {
                var i = count;
                while (i > 0)
                {
                    var luckyIndex = Math.Abs(randomHash.ToInt64() % poolCount);
                    var luckyId = startId.Add(luckyIndex);
                    if (!alreadyReward.Contains(luckyId))
                    {
                        State.Lotteries[luckyId].Level = category;
                        rewardIds.Add(luckyId);
                    }
                    else
                    {
                        // 如果已经得过奖，往后顺延一定数量的候选池的Id
                        var newLuckyId = luckyId.Add(poolCount.Div(count)) % poolCount;
                        var newLuckyIdIndex = startId.Add(newLuckyId);
                        State.Lotteries[newLuckyIdIndex].Level = category;
                        rewardIds.Add(newLuckyIdIndex);
                    }

                    alreadyReward.Add(luckyId);

                    // 不断对自己做Hash运算以产生新随机数
                    randomHash = Hash.FromMessage(randomHash);
                    i--;
                }

                category++;
            }

            var period = State.Periods[currentPeriodNumber.Sub(1)];
            period.RandomHash = randomHash;
            period.RewardIds.Add(rewardIds);
            State.Periods[State.CurrentPeriod.Value] = period;
        }

        public override Empty ResetPrice(SInt64Value input)
        {
            AssertSenderIsAdmin();
            State.Price.Value = input.Value;
            return new Empty();
        }

        public override Empty ResetDrawingLag(SInt64Value input)
        {
            AssertSenderIsAdmin();
            State.DrawingLag.Value = input.Value;
            return new Empty();
        }

        public override Empty ResetMaximumBuyAmount(SInt64Value input)
        {
            AssertSenderIsAdmin();
            State.MaximumAmount.Value = input.Value;
            return new Empty();
        }

        private void AssertSenderIsAdmin()
        {
            Assert(Context.Sender == State.Admin.Value, "Sender should be admin.");
        }

        public override SInt64Value GetPrice(Empty input)
        {
            return new SInt64Value {Value = State.Price.Value};
        }

        private long GetPrecision()
        {
            var precision = 1L;
            for (var i = 0; i < State.Decimals.Value; i++)
            {
                precision = precision.Mul(10);
            }

            return precision;
        }
    }
}