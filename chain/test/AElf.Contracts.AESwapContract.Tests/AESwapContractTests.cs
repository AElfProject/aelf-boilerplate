using System.Threading.Tasks;
using AElf.Contracts.AESwapContract;
using Google.Protobuf.WellKnownTypes;
using Xunit;
using System;
using AElf.Contracts.MultiToken;
using AElf.CSharp.Core;
using AElf.Types;
using Shouldly;

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
            pairList.SymbolPair.ShouldContain("DAI-ELF");
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
            var myPairList = await UserTomStub.GetAccountAssets.CallAsync(new Empty());
            myPairList.SymbolPair.ShouldContain("ELF-TEST");
            myPairList.SymbolPair.ShouldContain("DAI-ELF");

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
            var balanceExpect = (long) Math.Sqrt(reserveA * reserveB) - 1;
            balance.Results[0].Balance.ShouldBe(balanceExpect);

            var totalSupply = UserTomStub.GetTotalSupply.CallAsync(new PairList()
            {
                SymbolPair = {"ELF-TEST"}
            });
            totalSupply.Result.Results[0].SymbolPair.ShouldBe("ELF-TEST");
            totalSupply.Result.Results[0].TotalSupply.ShouldBe(balanceExpect + 1);

            var result = await UserTomStub.RemoveLiquidity.SendAsync(new RemoveLiquidityInput()
            {
                LiquidityRemove = balanceExpect,
                AmountAMin = Convert.ToInt64(100000000 * 0.995),
                AmountBMin = Convert.ToInt64(200000000 * 0.995),
                SymbolA = "ELF",
                SymbolB = "TEST",
                Deadline = Timestamp.FromDateTime(DateTime.UtcNow.Add(new TimeSpan(0, 0, 3)))
            });
            var amountA = balanceExpect.Mul(reserveA).Div(totalSupply.Result.Results[0].TotalSupply);
            var amountB = balanceExpect.Mul(reserveB).Div(totalSupply.Result.Results[0].TotalSupply);
            result.Output.SymbolA.ShouldBe("ELF");
            result.Output.SymbolB.ShouldBe("TEST");
            result.Output.AmountA.ShouldBe(amountA);
            result.Output.AmountB.ShouldBe(amountB);

            var balanceAfter = await UserTomStub.GetLiquidityTokenBalance.CallAsync(new PairList()
            {
                SymbolPair = {"ELF-TEST"}
            });
            balanceAfter.Results[0].Balance.ShouldBe(0);

            var amountOut = 20000000;
            var amountIn = await UserTomStub.GetAmountIn.CallAsync(new GetAmountInInput()
            {
                SymbolIn = "ELF",
                SymbolOut = "DAI",
                AmountOut = amountOut
            });
            var reserveElf = Convert.ToDecimal(reserves.Output.Results[1].ReserveB);
            var reserveDai = reserves.Output.Results[1].ReserveA;
            var numerator = reserveElf * amountOut * 1000;
            var denominator = (reserveDai - amountOut) * 997;
            var amountInExpect = decimal.ToInt64(numerator / denominator) + 1;

            amountIn.Value.ShouldBe(amountInExpect);

            var balanceTomElfBefore = UserTomTokenContractStub.GetBalance.CallAsync(new GetBalanceInput()
            {
                Owner = UserTomAddress,
                Symbol = "ELF"
            });
            var balanceTomDaiBefore = UserTomTokenContractStub.GetBalance.CallAsync(new GetBalanceInput()
            {
                Owner = UserTomAddress,
                Symbol = "DAI"
            });
            await UserTomStub.SwapTokenForExactToken.SendAsync(new SwapTokenForExactTokenInput()
            {
                SymbolIn = "ELF",
                SymbolOut = "DAI",
                AmountOut = amountOut,
                AmountInMax = amountInExpect,
                Deadline = Timestamp.FromDateTime(DateTime.UtcNow.Add(new TimeSpan(0, 0, 3)))
            });
            var balanceTomElfAfter = UserTomTokenContractStub.GetBalance.CallAsync(new GetBalanceInput()
            {
                Owner = UserTomAddress,
                Symbol = "ELF"
            });
            var balanceTomDaiAfter = UserTomTokenContractStub.GetBalance.CallAsync(new GetBalanceInput()
            {
                Owner = UserTomAddress,
                Symbol = "DAI"
            });
            balanceTomElfAfter.Result.Balance.ShouldBe(balanceTomElfBefore.Result.Balance.Sub(amountIn.Value));
            balanceTomDaiAfter.Result.Balance.ShouldBe(balanceTomDaiBefore.Result.Balance.Add(amountOut));
        }

        [Fact]
        public async Task AddLiquidityTest()
        {
            await Initialize();
            //Expired 
            var expiredException = await UserTomStub.AddLiquidity.SendWithExceptionAsync(new AddLiquidityInput()
            {
                AmountADesired = 100000000,
                AmountAMin = 100000000,
                AmountBDesired = 200000000,
                AmountBMin = 200000000,
                Deadline = Timestamp.FromDateTime(DateTime.UtcNow.Add(new TimeSpan(0, 0, -1))),
                SymbolA = "ELF",
                SymbolB = "TEST"
            });
            expiredException.TransactionResult.Error.ShouldContain("Expired");
            //Invalid Input
            var amountADesiredInputException = await UserTomStub.AddLiquidity.SendWithExceptionAsync(
                new AddLiquidityInput()
                {
                    AmountADesired = 0,
                    AmountAMin = 100000000,
                    AmountBDesired = 200000000,
                    AmountBMin = 200000000,
                    Deadline = Timestamp.FromDateTime(DateTime.UtcNow.Add(new TimeSpan(0, 0, 3))),
                    SymbolA = "ELF",
                    SymbolB = "TEST"
                });
            amountADesiredInputException.TransactionResult.Error.ShouldContain("Invalid Input");
            var amountBDesiredInputException = await UserTomStub.AddLiquidity.SendWithExceptionAsync(
                new AddLiquidityInput()
                {
                    AmountADesired = 100000000,
                    AmountAMin = 100000000,
                    AmountBDesired = 0,
                    AmountBMin = 200000000,
                    Deadline = Timestamp.FromDateTime(DateTime.UtcNow.Add(new TimeSpan(0, 0, 3))),
                    SymbolA = "ELF",
                    SymbolB = "TEST"
                });
            amountBDesiredInputException.TransactionResult.Error.ShouldContain("Invalid Input");
            var amountAMinInputException = await UserTomStub.AddLiquidity.SendWithExceptionAsync(new AddLiquidityInput()
            {
                AmountADesired = 100000000,
                AmountAMin = 0,
                AmountBDesired = 200000000,
                AmountBMin = 200000000,
                Deadline = Timestamp.FromDateTime(DateTime.UtcNow.Add(new TimeSpan(0, 0, 3))),
                SymbolA = "ELF",
                SymbolB = "TEST"
            });
            amountAMinInputException.TransactionResult.Error.ShouldContain("Invalid Input");
            var amountBMinInputException = await UserTomStub.AddLiquidity.SendWithExceptionAsync(new AddLiquidityInput()
            {
                AmountADesired = 100000000,
                AmountAMin = 100000000,
                AmountBDesired = 200000000,
                AmountBMin = 0,
                Deadline = Timestamp.FromDateTime(DateTime.UtcNow.Add(new TimeSpan(0, 0, 3))),
                SymbolA = "ELF",
                SymbolB = "TEST"
            });
            amountBMinInputException.TransactionResult.Error.ShouldContain("Invalid Input");
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

        private async Task Initialize()
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
        }

        private async Task GetBalance(string symbol, Address account)
        {
            await UserTomTokenContractStub.GetBalance.CallAsync(new GetBalanceInput()
            {
                Owner = account,
                Symbol = symbol
            });
        }
    }
}