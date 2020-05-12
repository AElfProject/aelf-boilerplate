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

        private void DealWithLotteries(List<int> levelsCount, Hash randomHash)
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

            var rewardCount = levelsCount.Sum();
            Assert(rewardCount > 0, "Reward pool cannot be empty.");
            Assert(poolCount >= rewardCount, $"Too many rewards, we just sells {poolCount} lotteries.");

            var ranks = new List<int>();
            foreach (var count in levelsCount)
            {
                for (var i = 0; i < count; i++)
                {
                    ranks.Add(count);
                }
            }

            var rewardIds = new List<long>();
            var rewardId = Math.Abs(randomHash.ToInt64() % poolCount).Add(1);

            for (var i = 0; i < rewardCount; i++)
            {
                while (State.Lotteries[rewardId].Level > 0)
                {
                    // Keep updating luckyIndex
                    randomHash = HashHelper.ComputeFrom(randomHash);
                    rewardId = Math.Abs(randomHash.ToInt64() % poolCount).Add(1);
                }

                rewardIds.Add(rewardId);
                State.Lotteries[rewardId].Level = ranks[i];
            }

            /*
            var rewardIdIndices = new List<long>();
            var luckyIndex = Math.Abs(randomHash.ToInt64() % poolCount);
            for (var i = 0; i < rewardCount; i++)
            {
                while (rewardIdIndices.Contains(luckyIndex))
                {
                    // Keep update luckyIndex
                    randomHash = HashHelper.ComputeFrom(randomHash);
                    luckyIndex = Math.Abs(randomHash.ToInt64() % poolCount);
                }

                rewardIdIndices.Add(luckyIndex);
            }

            Assert(rewardIdIndices.Count == rewardCount, "Incorrect reward count.");
            var rewardIds = rewardIdIndices.Select(i => i.Add(startId)).ToList();

            var rewardIndex = 0;
            for (var rewardRank = 1; rewardRank <= levelsCount.Count; rewardRank++)
            {
                var rewardAmount = levelsCount[rewardRank.Sub(1)];
                for (var i = 0; i < rewardAmount; i++)
                {
                    var rewardId = rewardIds[rewardIndex];
                    State.Lotteries[rewardId].Level = rewardRank;
                    rewardIndex++;
                }
            }
            
            */

            period.RewardIds.Add(rewardIds);
            State.Periods[previousPeriodNumber] = period;
        }
    }
}