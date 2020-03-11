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

            return new Empty();
        }

        public override Empty Buy(BuyInput input)
        {
            Assert(input.Amount < State.MaximumAmount.Value, $"单次购买数量不能超过{State.MaximumAmount.Value} :)");
            Assert(input.Amount > 0, "单次购买数量不能低于1");

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
                Amount = State.Decimals.Value.Mul(DefaultPrice).Mul(input.Amount)
            });

            var newIds = new List<ulong>();
            // 买多少个，添加多少个彩票
            for (var i = 0; i < input.Amount; i++)
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
            ;
            State.OwnerToLotteries[Context.Sender][currentPeriod] = currentIds;

            return new Empty();
        }

        public override Empty PrepareDraw(Empty input)
        {
            Assert(Context.Sender == State.Admin.Value, "No permission to prepare!");

            // 检查没有未开的奖
            Assert(State.CurrentPeriod.Value == 0 || // 第0届信息
                   State.Periods[State.CurrentPeriod.Value].RandomHash != Hash.Empty,
                "There's still at least one period not finished.");

            var nextPeriod = State.CurrentPeriod.Value.Add(1);
            State.CurrentPeriod.Value = nextPeriod;

            // 初始化下一届基本信息
            State.Periods[nextPeriod] = new PeriodBody
            {
                Id = nextPeriod,
                BlockNumber = Context.CurrentHeight + State.DrawingLag.Value,
                RandomHash = Hash.Empty
            };

            return new Empty();
        }

        public override Empty Draw(DrawInput input)
        {
            Assert(Context.Sender == State.Admin.Value, "No permission to draw!");
            Assert(State.Periods[State.CurrentPeriod.Value].RandomHash == Hash.Empty, "Latest period already drawn");

            var randomHash = State.AEDPoSContract.GetRandomHash.Call(new SInt64Value
            {
                Value = State.Periods[State.CurrentPeriod.Value].BlockNumber,
            });

            State.Periods[State.CurrentPeriod.Value].RandomHash = randomHash;

            //根据随机数处理彩票
            DealWithLotteries(input);

            return new Empty();
        }

        public override Empty TakeReward(TakeRewardInput input)
        {
            Assert(State.OwnerToLotteries[Context.Sender][input.Period].Ids.Contains(input.LotteryId),
                "只能领取宁亲自买的彩票 :)");
            Assert(State.Lotteries[input.LotteryId].Level != 0, "没有中奖嗷 :(");
            Assert(State.Lotteries[input.LotteryId].RegistrationInformation == null,
                $"已经领取过啦！登记信息：{State.Lotteries[input.LotteryId].RegistrationInformation}");

            State.Lotteries[input.LotteryId].RegistrationInformation = input.RegistrationInformation;

            return new Empty();
        }

        public override GetRewardResultOutput GetRewardResult(GetRewardResultInput input)
        {
            var results = State.Periods[input.Period].RewardResults;
            Assert(results != null, "No results of this period.");
            var randomHash = State.Periods[input.Period].RandomHash;
            // ReSharper disable once AssignNullToNotNullAttribute
            var lotteries = results.Select(result => State.Lotteries[result.LotteryId] ?? new Lottery())
                .ToList();

            return new GetRewardResultOutput
            {
                Period = input.Period,
                RandomHash = randomHash,
                RewardLotteries = {lotteries}
            };
        }

        public override GetLotteriesOutput GetLotteries(GetLotteriesInput input)
        {
            List<ulong> returnLotteryIds;
            var allLotteryIds = State.OwnerToLotteries[Context.Sender][input.Period].Ids.ToList();
            if (allLotteryIds.Count <= MaximumReturnAmount)
            {
                returnLotteryIds = allLotteryIds;
            }
            else
            {
                Assert(input.StartIndex < allLotteryIds.Count, "Invalid start index.");
                var takeAmount = Math.Min(allLotteryIds.Count.Sub(input.StartIndex), MaximumReturnAmount);
                returnLotteryIds = allLotteryIds.Take(takeAmount).ToList();
            }

            return new GetLotteriesOutput
            {
                Lotteries =
                {
                    returnLotteryIds.Select(id => State.Lotteries[id] ?? new Lottery())
                }
            };
        }

        private void DealWithLotteries(DrawInput input)
        {
            var pool = new List<ulong>();
            ulong category = 1; //category为奖品   比如LevelsCount=[2,0,3,6,0] category从1到5  category为1的奖品数为2，2的奖品数为0，以此类推
            var randomHash = State.Periods[State.CurrentPeriod.Value].RandomHash;

            //把未中奖的lottery放入pool
            for (ulong i = 0; i < State.SelfIncreasingIdForLottery.Value; i++)
            {
                if (State.Lotteries[i].Level == 0 &&
                    State.Lotteries[i].Block < State.Periods[State.CurrentPeriod.Value].BlockNumber)
                    pool.Add(i);
            }

            Assert(pool.Any(), "Available lottery not found.");

            var rewardResultsList = new List<RewardResult>();
            //按level进行抽奖，有不少变量强制转换，有安全隐患
            foreach (var count in input.LevelsCount)
            {
                var i = count;
                while (i > 0)
                {
                    var luckyIndex = randomHash.ToInt64() % pool.Count;
                    var luckyId = pool.Skip((int) luckyIndex).Take(1).First();
                    State.Lotteries[luckyId].Level = category;
                    rewardResultsList.Add(new RewardResult
                    {
                        LotteryId = luckyId
                    });

                    pool.Remove(luckyId);
                    //不断对自己hash产生新随机数
                    randomHash = Hash.FromByteArray(randomHash.ToByteArray());

                    i--;
                }

                category++;
            }

            var period = State.Periods[State.CurrentPeriod.Value];
            period.RewardResults.Add(rewardResultsList);
            State.Periods[State.CurrentPeriod.Value] = period;
        }
    }
}