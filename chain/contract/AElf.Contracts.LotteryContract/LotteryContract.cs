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
            Assert(input.Value < State.MaximumAmount.Value, $"Maximum buy amount: {State.MaximumAmount.Value} :)");
            Assert(input.Value > 0, "Invalid amount.");

            var currentPeriod = State.CurrentPeriod.Value;
            if (State.OwnerToLotteries[Context.Sender][currentPeriod] == null)
            {
                State.OwnerToLotteries[Context.Sender][currentPeriod] = new LotteryList();
            }

            var amount = State.Price.Value.Mul(input.Value);
            Context.LogDebug(() => $"Lottery cost {amount} {State.TokenSymbol} tokens.");
            State.TokenContract.TransferToContract.Send(new TransferToContractInput
            {
                Symbol = State.TokenSymbol.Value,
                Amount = amount
            });

            var startId = State.SelfIncreasingIdForLottery.Value;
            var newIds = new List<long>();
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

            // Check whether current period drew except period 1.
            if (State.CurrentPeriod.Value != 1)
            {
                Assert(State.Periods[State.CurrentPeriod.Value.Sub(1)].RandomHash != Hash.Empty,
                    $"Period {State.CurrentPeriod.Value} hasn't drew.");
            }

            Assert(State.SelfIncreasingIdForLottery.Value > State.RewardCount.Value.Add(1), "No valid lottery exists.");

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
            var currentPeriod = State.CurrentPeriod.Value;
            Assert(currentPeriod > 1, "Not ready to draw.");
            Assert(Context.Sender == State.Admin.Value, "No permission to draw!");
            Assert(State.Periods[currentPeriod.Sub(1)].RandomHash == Hash.Empty, "Latest period already drawn.");
            var expectedBlockNumber = State.Periods[State.CurrentPeriod.Value].BlockNumber;
            Assert(Context.CurrentHeight >= expectedBlockNumber, "Block height not enough.");

            var randomHash = State.AEDPoSContract.GetRandomHash.Call(new Int64Value
            {
                Value = expectedBlockNumber
            });

            // Deal with lotteries base on the random hash.
            DealWithLotteries(input.LevelsCount.ToList(), randomHash);

            return new Empty();
        }

        public override Empty TakeReward(TakeRewardInput input)
        {
            var lottery = State.Lotteries[input.LotteryId];
            if (lottery == null)
            {
                throw new AssertionException("Lottery id not found.");
            }
            Assert(lottery.Owner == Context.Sender,   "No permission");
            Assert(lottery.Level != 0, "Sry but you're not lucky :(");
            Assert(string.IsNullOrEmpty(lottery.RegistrationInformation),
                $"Reward already taken！Registration information：{State.Lotteries[input.LotteryId].RegistrationInformation}");

            State.Lotteries[input.LotteryId].RegistrationInformation = input.RegistrationInformation;

            // Distribute the reward now. Maybe transfer some tokens.

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
    }
}