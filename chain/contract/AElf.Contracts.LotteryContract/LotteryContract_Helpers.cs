using System;
using System.Collections.Generic;
using System.Linq;
using AElf.CSharp.Core;
using AElf.Types;

namespace AElf.Contracts.LotteryContract
{
    public partial class LotteryContract
    {
        private void AssertSenderIsAdmin()
        {
            Assert(Context.Sender == State.Admin.Value, "Sender should be admin.");
        }

        private void InitialNextPeriod()
        {
            var periodBody = State.Periods[State.CurrentPeriod.Value];
            if (periodBody == null)
            {
                periodBody = new PeriodBody
                {
                    StartId = State.SelfIncreasingIdForLottery.Value,
                    BlockNumber = Context.CurrentHeight.Add(State.DrawingLag.Value),
                    RandomHash = Hash.Empty
                };
            }
            else
            {
                periodBody.StartId = State.SelfIncreasingIdForLottery.Value;
                periodBody.BlockNumber = Context.CurrentHeight.Add(State.DrawingLag.Value);
                periodBody.RandomHash = Hash.Empty;
            }

            State.Periods[State.CurrentPeriod.Value] = periodBody;
        }

        private void DealWithLotteries(Dictionary<string, int> rewards, Hash randomHash)
        {
            var currentPeriodNumber = State.CurrentPeriod.Value;
            var previousPeriodNumber = currentPeriodNumber.Sub(1);
            var poolCount = State.Periods[currentPeriodNumber].StartId.Sub(1);

            var period = State.Periods[previousPeriodNumber];
            if (randomHash == null)
            {
                // Only can happen in test cases.
                randomHash = HashHelper.ComputeFrom(Context.PreviousBlockHash);
            }

            period.RandomHash = randomHash;

            var levelsCount = rewards.Values.ToList();
            var rewardCount = levelsCount.Sum();
            State.RewardCount.Value = State.RewardCount.Value.Add(rewardCount);
            Assert(rewardCount > 0, "Reward pool cannot be empty.");
            Assert(poolCount >= State.RewardCount.Value,
                $"Too many rewards, lottery pool size: {poolCount.Sub(State.RewardCount.Value)}.");

            var ranks = new List<string>();

            foreach (var reward in rewards)
            {
                for (var i = 0; i < reward.Value; i++)
                {
                    ranks.Add(reward.Key);
                }
            }

            var rewardIds = new List<long>();
            var rewardId = Math.Abs(randomHash.ToInt64() % poolCount).Add(1);

            for (var i = 0; i < rewardCount; i++)
            {
                while (!string.IsNullOrEmpty(State.Lotteries[rewardId].RewardName))
                {
                    // Keep updating luckyIndex
                    randomHash = HashHelper.ComputeFrom(randomHash);
                    rewardId = Math.Abs(randomHash.ToInt64() % poolCount).Add(1);
                }

                rewardIds.Add(rewardId);
                State.Lotteries[rewardId].RewardName = GetRewardName(ranks[i]);
            }

            period.RewardIds.Add(rewardIds);
            State.Periods[previousPeriodNumber] = period;
        }

        private string GetRewardName(string rewardCode)
        {
            return State.RewardMap[rewardCode] ?? rewardCode;
        }

        private void AssertIsNotSuspended()
        {
            Assert(!State.IsSuspend.Value, "Cannot do anything.");
        }
    }
}