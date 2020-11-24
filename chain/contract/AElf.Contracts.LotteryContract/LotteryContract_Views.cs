using System;
using System.Collections.Generic;
using System.Linq;
using AElf.CSharp.Core;
using AElf.Types;
using Google.Protobuf.WellKnownTypes;

namespace AElf.Contracts.LotteryContract
{
    public partial class LotteryContract
    {
        public override Lottery GetLottery(Int64Value input)
        {
            return State.Lotteries[input.Value];
        }

        public override GetRewardResultOutput GetRewardResult(Int64Value input)
        {
            var period = State.Periods[input.Value];
            var rewardIds = period?.RewardIds;
            if (rewardIds == null || !rewardIds.Any())
            {
                return new GetRewardResultOutput();
            }

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

            var lotteryList = new LotteryList();
            if (input.Period == 0)
            {
                for (var period = 1; period <= State.CurrentPeriod.Value; period++)
                {
                    var list = State.OwnerToLotteries[owner][period];
                    if (list != null)
                    {
                        // TODO: Optimize this if current period number is big enough.
                        lotteryList.Ids.Add(list.Ids.Where(i => i > input.StartId));
                    }
                }
            }
            else
            {
                lotteryList = State.OwnerToLotteries[owner][input.Period];
                if (lotteryList == null)
                {
                    return new GetBoughtLotteriesOutput();
                }
            }

            var allLotteryIds = lotteryList.Ids.ToList();
            if (allLotteryIds.Count <= MaximumReturnAmount)
            {
                returnLotteryIds = allLotteryIds;
            }
            else
            {
                Assert(input.StartId < allLotteryIds.Last(), "Start id is too big.");
                var takeAmount = Math.Min(allLotteryIds.Count(i => i > input.StartId), MaximumReturnAmount);
                returnLotteryIds = allLotteryIds.Where(i => i > input.StartId).Take(takeAmount).ToList();
            }

            return new GetBoughtLotteriesOutput
            {
                Lotteries =
                {
                    returnLotteryIds.Select(id => State.Lotteries[id] ?? new Lottery())
                }
            };
        }

        public override Int64Value GetSales(Int64Value input)
        {
            var period = State.Periods[input.Value];
            Assert(period != null, "Period information not found.");
            if (State.CurrentPeriod.Value == input.Value)
            {
                return new Int64Value
                {
                    // ReSharper disable once PossibleNullReferenceException
                    Value = State.SelfIncreasingIdForLottery.Value.Sub(period.StartId)
                };
            }

            var nextPeriod = State.Periods[input.Value.Add(1)];
            return new Int64Value
            {
                // ReSharper disable once PossibleNullReferenceException
                Value = nextPeriod.StartId.Sub(period.StartId)
            };
        }

        public override Int64Value GetPrice(Empty input)
        {
            return new Int64Value {Value = State.Price.Value};
        }

        public override Int64Value GetDrawingLag(Empty input)
        {
            return new Int64Value {Value = State.DrawingLag.Value};
        }

        public override Int64Value GetMaximumBuyAmount(Empty input)
        {
            return new Int64Value {Value = State.MaximumAmount.Value};
        }

        public override Int64Value GetCurrentPeriodNumber(Empty input)
        {
            return new Int64Value {Value = State.CurrentPeriod.Value};
        }

        public override PeriodBody GetPeriod(Int64Value input)
        {
            var period = State.Periods[input.Value];
            return period ?? new PeriodBody();
        }

        public override PeriodBody GetCurrentPeriod(Empty input)
        {
            var period = State.Periods[State.CurrentPeriod.Value];
            return period ?? new PeriodBody();
        }

        public override RewardList GetRewardList(Empty input)
        {
            return new RewardList
            {
                RewardMap = {State.RewardCodeList.Value.Value.ToDictionary(c => c, c => State.RewardMap[c])}
            };
        }

        public override StringValue GetRewardName(StringValue input)
        {
            return new StringValue {Value = State.RewardMap[input.Value]};
        }

        public override Int64Value GetBoughtLotteriesCount(Address input)
        {
            return new Int64Value {Value = State.BoughtLotteriesCount[input]};
        }

        public override Int64Value GetAllLotteriesCount(Empty input)
        {
            return new Int64Value {Value = State.SelfIncreasingIdForLottery.Value.Sub(1)};
        }

        public override Int64Value GetNoRewardLotteriesCount(Empty input)
        {
            return new Int64Value
                {Value = State.SelfIncreasingIdForLottery.Value.Sub(1).Sub(State.AllRewardsCount.Value)};
        }
    }
}