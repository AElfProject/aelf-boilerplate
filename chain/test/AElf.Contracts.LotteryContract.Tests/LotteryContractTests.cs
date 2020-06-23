using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AElf.Contracts.MultiToken;
using AElf.Types;
using Google.Protobuf.Collections;
using Google.Protobuf.WellKnownTypes;
using Shouldly;
using Xunit;

namespace AElf.Contracts.LotteryContract
{
    // ReSharper disable InconsistentNaming
    public class LotteryContractTests : LotteryContractTestBase
    {
        private const long Price = 10_00000000;

        private LotteryContractContainer.LotteryContractStub AliceLotteryContractStub =>
            GetLotteryContractStub(AliceKeyPair);

        private TokenContractContainer.TokenContractStub AliceTokenContractStub => GetTokenContractStub(AliceKeyPair);

        private LotteryContractContainer.LotteryContractStub BobLotteryContractStub =>
            GetLotteryContractStub(BobKeyPair);

        private TokenContractContainer.TokenContractStub BobTokenContractStub => GetTokenContractStub(BobKeyPair);

        [Fact]
        public async Task InitializeAndCheckStatus()
        {
            await LotteryContractStub.Initialize.SendAsync(new InitializeInput
            {
                TokenSymbol = "ELF",
                MaximumAmount = 100,
                Price = Price,
                DrawingLag = 1
            });

            var currentPeriod = await LotteryContractStub.GetCurrentPeriod.CallAsync(new Empty());
            currentPeriod.StartId.ShouldBe(1);
            currentPeriod.RandomHash.ShouldBe(Hash.Empty);

            // Transfer some money to Alice & Bob.
            await TokenContractStub.Transfer.SendAsync(new TransferInput
            {
                To = AliceAddress,
                Symbol = "ELF",
                Amount = 100000000_00000000
            });

            await TokenContractStub.Transfer.SendAsync(new TransferInput
            {
                To = BobAddress,
                Symbol = "ELF",
                Amount = 100000000_00000000
            });

            await AliceTokenContractStub.Approve.SendAsync(new ApproveInput
            {
                Spender = LotteryContractAddress,
                Symbol = "ELF",
                Amount = 100000000_00000000
            });

            await BobTokenContractStub.Approve.SendAsync(new ApproveInput
            {
                Spender = LotteryContractAddress,
                Symbol = "ELF",
                Amount = 100000000_00000000
            });

            await LotteryContractStub.AddRewardList.SendAsync(new RewardList
            {
                RewardMap =
                {
                    {"啊", "一等奖"},
                    {"啊啊", "二等奖"},
                    {"啊啊啊", "三等奖"}
                }
            });
        }

        [Fact]
        public async Task PrepareDrawWithoutSelling()
        {
            await InitializeAndCheckStatus();

            var result = await LotteryContractStub.PrepareDraw.SendWithExceptionAsync(new Empty());
            result.TransactionResult.Error.ShouldContain("Unable to terminate this period.");
        }

        [Fact]
        public async Task BuyTest()
        {
            await InitializeAndCheckStatus();

            {
                var lotteries = await AliceBuy(20, 1);
                lotteries.Count.ShouldBe(20);
            }

            {
                var lotteries = await BobBuy(5, 1);
                lotteries.Count.ShouldBe(5);
            }
        }

        [Fact]
        public async Task PrepareDrawTest()
        {
            await BuyTest();
            await LotteryContractStub.PrepareDraw.SendAsync(new Empty());

            var currentPeriodNumber = await LotteryContractStub.GetCurrentPeriodNumber.CallAsync(new Empty());
            currentPeriodNumber.Value.ShouldBe(2);

            {
                var lotteries = await AliceBuy(1, 2);
                lotteries.Count.ShouldBe(1);
            }

            {
                var lotteries = await BobBuy(1, 2);
                lotteries.Count.ShouldBe(1); // Only return 20 at one time.
            }

            var result = await LotteryContractStub.PrepareDraw.SendWithExceptionAsync(new Empty());
            result.TransactionResult.Error.ShouldContain("hasn't drew.");
        }

        [Fact]
        public async Task DrawTest()
        {
            await PrepareDrawTest();

            await LotteryContractStub.SetRewardListForOnePeriod.SendAsync(new RewardsInfo
            {
                Period = 1,
                Rewards =
                {
                    {"啊", 1},
                    {"啊啊", 2},
                    {"啊啊啊", 5}
                }
            });

            await LotteryContractStub.Draw.SendAsync(new Int64Value {Value = 1});

            var rewardResult = await LotteryContractStub.GetRewardResult.CallAsync(new Int64Value
            {
                Value = 1
            });
            var reward =
                rewardResult.RewardLotteries.First(r => r.Owner == AliceAddress && !string.IsNullOrEmpty(r.RewardName));
            const string registrationInformation = "hiahiahia";
            await AliceLotteryContractStub.TakeReward.SendAsync(new TakeRewardInput
            {
                LotteryId = reward.Id,
                RegistrationInformation = registrationInformation
            });

            var lottery = await LotteryContractStub.GetLottery.CallAsync(new Int64Value {Value = reward.Id});
            lottery.RegistrationInformation.ShouldBe(registrationInformation);
        }

        private async Task<RepeatedField<Lottery>> AliceBuy(int amount, long period)
        {
            var boughtInformation = (await AliceLotteryContractStub.Buy.SendAsync(new Int64Value
            {
                Value = amount
            })).Output;

            boughtInformation.Amount.ShouldBe(amount);

            var boughtInfo = await LotteryContractStub.GetBoughtLotteries.CallAsync(new GetBoughtLotteriesInput
            {
                Owner = AliceAddress,
                Period = period
            });
            boughtInfo.Lotteries.First().Id.ShouldBe(boughtInformation.StartId);
            return boughtInfo.Lotteries;
        }

        private async Task<RepeatedField<Lottery>> BobBuy(int amount, long period)
        {
            var boughtInformation = (await BobLotteryContractStub.Buy.SendAsync(new Int64Value
            {
                Value = amount
            })).Output;

            boughtInformation.Amount.ShouldBe(amount);

            var boughtOutput = await LotteryContractStub.GetBoughtLotteries.CallAsync(new GetBoughtLotteriesInput
            {
                Owner = BobAddress,
                Period = period
            });
            boughtOutput.Lotteries.First().Id.ShouldBe(boughtInformation.StartId);
            return boughtOutput.Lotteries;
        }

        [Fact]
        public void TestGetRanks()
        {
            var levelsCount = new List<int> {0, 1, 2, 3, 4};
            var ranks = GetRanks(levelsCount);
            ranks.Count.ShouldBe(10);
            ranks.ShouldBe(new List<int> {2, 3, 3, 4, 4, 4, 5, 5, 5, 5});
        }

        private List<int> GetRanks(List<int> levelsCount)
        {
            var ranks = new List<int>();

            for (var i = 0; i < levelsCount.Count; i++)
            {
                for (var j = 0; j < levelsCount[i]; j++)
                {
                    ranks.Add(i + 1);
                }
            }

            return ranks;
        }
    }
}