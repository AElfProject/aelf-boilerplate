using System.Threading.Tasks;
using AElf.Contracts.AESwapContract;
using Google.Protobuf.WellKnownTypes;
using Xunit;
using System;
using System.Linq;
using AElf.Contracts.MultiToken;
using AElf.CSharp.Core;
using AElf.Types;
using Google.Protobuf;
using Google.Protobuf.Collections;
using Google.Protobuf.WellKnownTypes;
using Shouldly;
using Xunit;

namespace AElf.Contract.AESwapContract.Tests
{
    public class AESwapContractTests : AESwapContractTestBase
    {
        [Fact]
        public async Task CompleteFlowTest()
        {
            await CreateAndGetToken();
            await AESwapContractStub.Initialize.SendAsync(new Empty());
            await UserTomStub.CreatePair.SendAsync(new CreatePairInput()
            {
                SymbolPair = "ELF-TEST"
            });

            await UserTomStub.CreatePair.SendAsync(new CreatePairInput()
            {
                SymbolPair = "ELF-DAI"
            });
            var pairList = await UserTomStub.GetPairs.CallAsync(new Empty());
            // var pairList = await UserTomStub.GetPairs.CallAsync(new Empty());
            pairList.SymbolPair.ShouldContain("ELF-TEST");
            pairList.SymbolPair.ShouldContain("ELF-DAI");

            await UserTomStub.AddLiquidity.SendAsync(new AddLiquidityInput()
            {
                AmountADesired = 100000000,
                AmountAMin = 100000000,
                AmountBDesired = 200000000,
                AmountBMin = 200000000,
                Deadline = Timestamp.FromDateTime(DateTime.UtcNow.Add(new TimeSpan(0, 0, 3))),
                SymbolA = "ELF",
                SymbolB = "TEST"
            });
            await UserTomStub.AddLiquidity.SendAsync(new AddLiquidityInput()
            {
                AmountADesired = 100000000,
                AmountAMin = 100000000,
                AmountBDesired = 200000000,
                AmountBMin = 200000000,
                Deadline = Timestamp.FromDateTime(DateTime.UtcNow.Add(new TimeSpan(0, 0, 3))),
                SymbolA = "ELF",
                SymbolB = "DAI"
            });
            var reserves = await UserTomStub.GetReserves.SendAsync(new GetReservesInput()
            {
                SymbolPair = {"ELF-TEST", "ELF-DAI"}
            });
            var reserveA = reserves.Output.Results[0].ReserveA;
            var reserveB = reserves.Output.Results[0].ReserveB;
            reserveA.ShouldBe(100000000);
            reserveB.ShouldBe(200000000);

            var assets = await UserTomStub.GetAccountAssets.CallAsync(new Empty());
            assets.SymbolPair.ShouldContain("ELF-TEST");

            var balance = await UserTomStub.GetLiquidityTokenBalance.CallAsync(new PairList()
            {
                SymbolPair = {"ELF-TEST"}
            });
            //token=math.sqrt(reserveA*reserveB)
            balance.Results[0].SymbolPair.ShouldBe("ELF-TEST");
            var balanceExpect = (long) Math.Sqrt(reserveA * reserveB);
            balance.Results[0].Balance.ShouldBe(balanceExpect);

            var totalSupply = UserTomStub.GetTotalSupply.CallAsync(new PairList()
            {
                SymbolPair = {"ELF-TEST"}
            });
            totalSupply.Result.Results[0].SymbolPair.ShouldBe("ELF-TEST");
            totalSupply.Result.Results[0].TotalSupply.ShouldBe(balanceExpect);

            var result = await UserTomStub.RemoveLiquidity.SendAsync(new RemoveLiquidityInput()
            {
                LiquidityRemove = balanceExpect,
                AmountAMin = 100000000,
                AmountBMin = 200000000,
                SymbolA = "ELF",
                SymbolB = "TEST",
                Deadline = Timestamp.FromDateTime(DateTime.UtcNow.Add(new TimeSpan(0, 0, 3)))
            });
            result.Output.SymbolA.ShouldBe("ELF");
            result.Output.SymbolB.ShouldBe("TEST");
            result.Output.AmountA.ShouldBe(100000000);
            result.Output.AmountB.ShouldBe(200000000);

            var balanceAfter = await UserTomStub.GetLiquidityTokenBalance.CallAsync(new PairList()
            {
                SymbolPair = {"ELF-TEST"}
            });
            balanceAfter.Results[0].Balance.ShouldBe(0);

            var amountOut = 200000000;
            // var amountIn= UserTomStub.GetAmountIn.CallAsync(new GetAmountInInput()
            // {
            //     SymbolIn = "ELF",
            //     SymbolOut = "DAI",
            //     AmountOut = amountOut
            // });
            // var reserveElf = reserves.Output.Results[1].ReserveA;
            // var reserveDai = reserves.Output.Results[1].ReserveB;
            // var numerator = reserveElf.Mul(amountOut).Mul(1000);
            // var denominator = reserveDai.Sub(amountOut).Mul(997);
            // var amountInExpect = (numerator / denominator).Add(1);
            //
            // amountIn.Result.Value.ShouldBe(amountInExpect);
            
        }


        private async Task CreateAndGetToken()
        {
            //TEST
            var result = await TokenContractStub.Create.SendAsync(new CreateInput
            {
                Issuer = AdminAddress,
                Symbol = "TEST",
                Decimals = 8,
                IsBurnable = true,
                TokenName = "TEST symbol",
                TotalSupply = 100000000_00000000
            });

            result.TransactionResult.Status.ShouldBe(TransactionResultStatus.Mined);

            var issueResult = await TokenContractStub.Issue.SendAsync(new IssueInput
            {
                Amount = 100000000000000,
                Symbol = "TEST",
                To = AdminAddress
            });
            issueResult.TransactionResult.Status.ShouldBe(TransactionResultStatus.Mined);
            var balance = await TokenContractStub.GetBalance.SendAsync(new GetBalanceInput()
            {
                Owner = AdminAddress,
                Symbol = "TEST"
            });
            balance.Output.Balance.ShouldBe(100000000000000);
            //DAI
            var result2 = await TokenContractStub.Create.SendAsync(new CreateInput
            {
                Issuer = AdminAddress,
                Symbol = "DAI",
                Decimals = 10,
                IsBurnable = true,
                TokenName = "DAI symbol",
                TotalSupply = 100000000_00000000
            });

            result2.TransactionResult.Status.ShouldBe(TransactionResultStatus.Mined);

            var issueResult2 = await TokenContractStub.Issue.SendAsync(new IssueInput
            {
                Amount = 100000000000000,
                Symbol = "DAI",
                To = AdminAddress
            });
            issueResult2.TransactionResult.Status.ShouldBe(TransactionResultStatus.Mined);
            var balance2 = await TokenContractStub.GetBalance.SendAsync(new GetBalanceInput()
            {
                Owner = AdminAddress,
                Symbol = "DAI"
            });
            balance2.Output.Balance.ShouldBe(100000000000000);
            await TokenContractStub.Transfer.SendAsync(new TransferInput()
            {
                Amount = 100000000000,
                Symbol = "ELF",
                Memo = "Recharge",
                To = UserTomAddress
            });
            await TokenContractStub.Transfer.SendAsync(new TransferInput()
            {
                Amount = 100000000000,
                Symbol = "ELF",
                Memo = "Recharge",
                To = UserLilyAddress
            });
            await TokenContractStub.Transfer.SendAsync(new TransferInput()
            {
                Amount = 100000000000,
                Symbol = "TEST",
                Memo = "Recharge",
                To = UserTomAddress
            });
            await TokenContractStub.Transfer.SendAsync(new TransferInput()
            {
                Amount = 100000000000,
                Symbol = "TEST",
                Memo = "Recharge",
                To = UserLilyAddress
            });
            await TokenContractStub.Transfer.SendAsync(new TransferInput()
            {
                Amount = 100000000000,
                Symbol = "DAI",
                Memo = "Recharge",
                To = UserTomAddress
            });
            //authorize  Tom and Lily and admin to transfer ELF and TEST and DAI to FinanceContract
            await UserTomTokenContractStub.Approve.SendAsync(new ApproveInput()
            {
                Amount = 100000000000,
                Spender = AESwapContractAddress,
                Symbol = "ELF"
            });
            await UserTomTokenContractStub.Approve.SendAsync(new ApproveInput()
            {
                Amount = 100000000000,
                Spender = AESwapContractAddress,
                Symbol = "DAI"
            });
            await TokenContractStub.Approve.SendAsync(new ApproveInput()
            {
                Amount = 100000000000,
                Spender = AESwapContractAddress,
                Symbol = "ELF"
            });
            await UserLilyTokenContractStub.Approve.SendAsync(new ApproveInput()
            {
                Amount = 100000000000,
                Spender = AESwapContractAddress,
                Symbol = "ELF"
            });
            await UserTomTokenContractStub.Approve.SendAsync(new ApproveInput()
            {
                Amount = 100000000000,
                Spender = AESwapContractAddress,
                Symbol = "TEST"
            });
            await TokenContractStub.Approve.SendAsync(new ApproveInput()
            {
                Amount = 100000000000,
                Spender = AESwapContractAddress,
                Symbol = "TEST"
            });
            await UserLilyTokenContractStub.Approve.SendAsync(new ApproveInput()
            {
                Amount = 100000000000,
                Spender = AESwapContractAddress,
                Symbol = "TEST"
            });
        }
    }
}