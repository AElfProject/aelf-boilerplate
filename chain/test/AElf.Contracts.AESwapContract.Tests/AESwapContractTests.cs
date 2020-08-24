using System.Threading.Tasks;
using AElf.Contracts.AESwapContract;
using Google.Protobuf.WellKnownTypes;
using Xunit;
using System;
using System.Threading;
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
            pairList.SymbolPair.ShouldContain("ELF-TEST");
            pairList.SymbolPair.ShouldContain("DAI-ELF");

            #region AddLiquidity

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

            #endregion

            #region RemoveLiquidity

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

            #endregion

            #region Swap

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

            #endregion
        }

        [Fact]
        public async Task AddLiquidityTest()
        {
            await Initialize();
            const long amountADesired = 100000000;
            const long amountBDesired = 200000000;
            const long errorInput = 0;

            #region Exceptions

            //Expired 
            var expiredException = await UserTomStub.AddLiquidity.SendWithExceptionAsync(new AddLiquidityInput()
            {
                AmountADesired = amountADesired,
                AmountAMin = amountADesired,
                AmountBDesired = amountBDesired,
                AmountBMin = amountBDesired,
                Deadline = Timestamp.FromDateTime(DateTime.UtcNow.Add(new TimeSpan(0, 0, -1))),
                SymbolA = "ELF",
                SymbolB = "TEST"
            });
            expiredException.TransactionResult.Error.ShouldContain("Expired");

            //Invalid Input
            var amountADesiredInputException = await UserTomStub.AddLiquidity.SendWithExceptionAsync(
                new AddLiquidityInput()
                {
                    AmountADesired = errorInput,
                    AmountAMin = amountADesired,
                    AmountBDesired = amountBDesired,
                    AmountBMin = amountBDesired,
                    Deadline = Timestamp.FromDateTime(DateTime.UtcNow.Add(new TimeSpan(0, 0, 3))),
                    SymbolA = "ELF",
                    SymbolB = "TEST"
                });
            amountADesiredInputException.TransactionResult.Error.ShouldContain("Invalid Input");

            var amountBDesiredInputException = await UserTomStub.AddLiquidity.SendWithExceptionAsync(
                new AddLiquidityInput()
                {
                    AmountADesired = amountADesired,
                    AmountAMin = amountADesired,
                    AmountBDesired = errorInput,
                    AmountBMin = amountBDesired,
                    Deadline = Timestamp.FromDateTime(DateTime.UtcNow.Add(new TimeSpan(0, 0, 3))),
                    SymbolA = "ELF",
                    SymbolB = "TEST"
                });
            amountBDesiredInputException.TransactionResult.Error.ShouldContain("Invalid Input");

            var amountAMinInputException = await UserTomStub.AddLiquidity.SendWithExceptionAsync(new AddLiquidityInput()
            {
                AmountADesired = amountADesired,
                AmountAMin = errorInput,
                AmountBDesired = amountBDesired,
                AmountBMin = amountBDesired,
                Deadline = Timestamp.FromDateTime(DateTime.UtcNow.Add(new TimeSpan(0, 0, 3))),
                SymbolA = "ELF",
                SymbolB = "TEST"
            });
            amountAMinInputException.TransactionResult.Error.ShouldContain("Invalid Input");

            var amountBMinInputException = await UserTomStub.AddLiquidity.SendWithExceptionAsync(new AddLiquidityInput()
            {
                AmountADesired = amountADesired,
                AmountAMin = amountADesired,
                AmountBDesired = amountBDesired,
                AmountBMin = errorInput,
                Deadline = Timestamp.FromDateTime(DateTime.UtcNow.Add(new TimeSpan(0, 0, 3))),
                SymbolA = "ELF",
                SymbolB = "TEST"
            });
            amountBMinInputException.TransactionResult.Error.ShouldContain("Invalid Input");

            #endregion


            #region AddLiquidity at first time

            var liquidityBalanceBefore = await UserTomStub.GetLiquidityTokenBalance.CallAsync(new PairList()
            {
                SymbolPair = {"ELF-TEST"}
            });
            var reservesBefore = await UserTomStub.GetReserves.CallAsync(new GetReservesInput()
            {
                SymbolPair = {"ELF-TEST"}
            });
            var totalSupplyBefore = await UserTomStub.GetTotalSupply.CallAsync(new PairList()
            {
                SymbolPair = {"ELF-TEST"}
            });
            var elfBalanceBefore = await TokenContractStub.GetBalance.CallAsync(new GetBalanceInput()
            {
                Owner = UserTomAddress,
                Symbol = "ELF"
            });
            var testBalanceBefore = await TokenContractStub.GetBalance.CallAsync(new GetBalanceInput()
            {
                Owner = UserTomAddress,
                Symbol = "TEST"
            });

            await UserTomStub.AddLiquidity.SendAsync(new AddLiquidityInput()
            {
                AmountADesired = amountADesired,
                AmountAMin = amountADesired,
                AmountBDesired = amountBDesired,
                AmountBMin = amountADesired,
                Deadline = Timestamp.FromDateTime(DateTime.UtcNow.Add(new TimeSpan(0, 0, 3))),
                SymbolA = "ELF",
                SymbolB = "TEST"
            });

            var balanceExpect = (long) Math.Sqrt(amountADesired * amountBDesired) - 1;
            var reservesAfter = await UserTomStub.GetReserves.CallAsync(new GetReservesInput()
            {
                SymbolPair = {"ELF-TEST"}
            });
            var totalSupplyAfter = await UserTomStub.GetTotalSupply.CallAsync(new PairList()
            {
                SymbolPair = {"ELF-TEST"}
            });
            var elfBalanceAfter = await TokenContractStub.GetBalance.CallAsync(new GetBalanceInput()
            {
                Owner = UserTomAddress,
                Symbol = "ELF"
            });
            var testBalanceAfter = await TokenContractStub.GetBalance.CallAsync(new GetBalanceInput()
            {
                Owner = UserTomAddress,
                Symbol = "TEST"
            });
            var liquidityBalanceAfter = await UserTomStub.GetLiquidityTokenBalance.CallAsync(new PairList()
            {
                SymbolPair = {"ELF-TEST"}
            });

            reservesAfter.Results[0].ReserveA.ShouldBe(reservesBefore.Results[0].ReserveA.Add(amountADesired));
            reservesAfter.Results[0].ReserveB.ShouldBe(reservesBefore.Results[0].ReserveB.Add(amountBDesired));

            liquidityBalanceAfter.Results[0].Balance
                .ShouldBe(liquidityBalanceBefore.Results[0].Balance.Add(balanceExpect));
            totalSupplyAfter.Results[0].TotalSupply.ShouldBe(totalSupplyBefore.Results[0].TotalSupply
                .Add(balanceExpect).Add(1));

            elfBalanceAfter.Balance.ShouldBe(elfBalanceBefore.Balance.Sub(amountADesired));
            testBalanceAfter.Balance.ShouldBe(testBalanceBefore.Balance.Sub(amountBDesired));

            #endregion
            Thread.Sleep(3000);

            #region AddLiquidity at second time

            const long amountADesiredSecond = 100000000;
            const long amountBDesiredSecond = 200000000;
            const long floatAmount = 1000;

            var amountBOptimal = decimal.ToInt64(Convert.ToDecimal(amountADesiredSecond) *
                reservesAfter.Results[0].ReserveB / reservesAfter.Results[0].ReserveA);
            var amountAOptimal = decimal.ToInt64(Convert.ToDecimal(amountBDesiredSecond) *
                reservesAfter.Results[0].ReserveA / reservesAfter.Results[0].ReserveB);

            //Insufficient amount of tokenB
            var tokenBException = await UserTomStub.AddLiquidity.SendWithExceptionAsync(new AddLiquidityInput()
            {
                AmountADesired = amountADesiredSecond,
                AmountAMin = amountADesiredSecond,
                AmountBDesired = amountBOptimal.Add(floatAmount),
                AmountBMin = amountBOptimal.Add(floatAmount),
                Deadline = Timestamp.FromDateTime(DateTime.UtcNow.Add(new TimeSpan(0, 0, 3))),
                SymbolA = "ELF",
                SymbolB = "TEST"
            });
            tokenBException.TransactionResult.Error.ShouldContain("Insufficient amount of tokenB");

            //Insufficient amount of tokenA
            var tokenAException = await UserTomStub.AddLiquidity.SendWithExceptionAsync(new AddLiquidityInput()
            {
                AmountADesired = amountAOptimal.Add(floatAmount),
                AmountAMin = amountAOptimal.Add(floatAmount),
                AmountBDesired = amountBDesiredSecond,
                AmountBMin = amountBDesiredSecond,
                Deadline = Timestamp.FromDateTime(DateTime.UtcNow.Add(new TimeSpan(0, 0, 3))),
                SymbolA = "ELF",
                SymbolB = "TEST"
            });
            tokenAException.TransactionResult.Error.ShouldContain("Insufficient amount of tokenA");

            //success
            await UserTomStub.AddLiquidity.SendAsync(new AddLiquidityInput()
            {
                AmountADesired = amountADesiredSecond,
                AmountAMin = amountADesiredSecond,
                AmountBDesired = amountBDesiredSecond,
                AmountBMin = amountBDesiredSecond,
                Deadline = Timestamp.FromDateTime(DateTime.UtcNow.Add(new TimeSpan(0, 0, 3))),
                SymbolA = "ELF",
                SymbolB = "TEST"
            });
            var amountASecond = amountADesiredSecond;
            var amountBSecond = amountBOptimal;
            var liquidityFromElf = decimal.ToInt64(Convert.ToDecimal(amountASecond) *
                                                   totalSupplyAfter.Results[0].TotalSupply /
                                                   reservesAfter.Results[0].ReserveA);
            var liquidityFromTest = decimal.ToInt64(Convert.ToDecimal(amountBSecond) *
                                                    totalSupplyAfter.Results[0].TotalSupply /
                                                    reservesAfter.Results[0].ReserveB);
            var liquidityMintSecond = Math.Min(liquidityFromElf, liquidityFromTest);

            var reservesAfterSecond = await UserTomStub.GetReserves.CallAsync(new GetReservesInput()
            {
                SymbolPair = {"ELF-TEST"}
            });
            var totalSupplyAfterSecond = await UserTomStub.GetTotalSupply.CallAsync(new PairList()
            {
                SymbolPair = {"ELF-TEST"}
            });
            var elfBalanceAfterSecond = await TokenContractStub.GetBalance.CallAsync(new GetBalanceInput()
            {
                Owner = UserTomAddress,
                Symbol = "ELF"
            });
            var testBalanceAfterSecond = await TokenContractStub.GetBalance.CallAsync(new GetBalanceInput()
            {
                Owner = UserTomAddress,
                Symbol = "TEST"
            });
            var liquidityBalanceSecond = await UserTomStub.GetLiquidityTokenBalance.CallAsync(new PairList()
            {
                SymbolPair = {"ELF-TEST"}
            });

            reservesAfterSecond.Results[0].ReserveA.ShouldBe(reservesAfter.Results[0].ReserveA.Add(amountASecond));
            reservesAfterSecond.Results[0].ReserveB.ShouldBe(reservesAfter.Results[0].ReserveB.Add(amountBSecond));

            liquidityBalanceSecond.Results[0].Balance
                .ShouldBe(liquidityBalanceAfter.Results[0].Balance.Add(liquidityMintSecond));
            totalSupplyAfterSecond.Results[0].TotalSupply.ShouldBe(totalSupplyAfter.Results[0].TotalSupply
                .Add(liquidityMintSecond));

            elfBalanceAfterSecond.Balance.ShouldBe(elfBalanceAfter.Balance.Sub(amountASecond));
            testBalanceAfterSecond.Balance.ShouldBe(testBalanceAfter.Balance.Sub(amountBSecond));

            #endregion
        }

        [Fact]
        public async Task RemoveLiquidityTest()
        {
            await Initialize();

            const long amountADesired = 100000000;
            const long amountBDesired = 200000000;
            const long liquidityRemove = 200000000;
            const long floatAmount = 10000;
            const long errorInput = 0;

            #region Exceptions

            //Expired 
            var expiredException = await UserTomStub.RemoveLiquidity.SendWithExceptionAsync(new RemoveLiquidityInput()
            {
                AmountAMin = amountADesired,
                AmountBMin = amountBDesired,
                LiquidityRemove = liquidityRemove,
                Deadline = Timestamp.FromDateTime(DateTime.UtcNow.Add(new TimeSpan(0, 0, -1))),
                SymbolA = "ELF",
                SymbolB = "TEST"
            });
            expiredException.TransactionResult.Error.ShouldContain("Expired");

            //Invalid Input
            var amountAMinInvalidException = await UserTomStub.RemoveLiquidity.SendWithExceptionAsync(
                new RemoveLiquidityInput()
                {
                    AmountAMin = errorInput,
                    AmountBMin = amountBDesired,
                    LiquidityRemove = liquidityRemove,
                    Deadline = Timestamp.FromDateTime(DateTime.UtcNow.Add(new TimeSpan(0, 0, 3))),
                    SymbolA = "ELF",
                    SymbolB = "TEST"
                });
            amountAMinInvalidException.TransactionResult.Error.ShouldContain("Invalid Input");

            var amountBMinInvalidException = await UserTomStub.RemoveLiquidity.SendWithExceptionAsync(
                new RemoveLiquidityInput()
                {
                    AmountAMin = amountADesired,
                    AmountBMin = errorInput,
                    LiquidityRemove = liquidityRemove,
                    Deadline = Timestamp.FromDateTime(DateTime.UtcNow.Add(new TimeSpan(0, 0, 3))),
                    SymbolA = "ELF",
                    SymbolB = "TEST"
                });
            amountBMinInvalidException.TransactionResult.Error.ShouldContain("Invalid Input");

            var liquidityRemoveInvalidException = await UserTomStub.RemoveLiquidity.SendWithExceptionAsync(
                new RemoveLiquidityInput()
                {
                    AmountAMin = amountADesired,
                    AmountBMin = amountBDesired,
                    LiquidityRemove = errorInput,
                    Deadline = Timestamp.FromDateTime(DateTime.UtcNow.Add(new TimeSpan(0, 0, 3))),
                    SymbolA = "ELF",
                    SymbolB = "TEST"
                });
            liquidityRemoveInvalidException.TransactionResult.Error.ShouldContain("Invalid Input");

            // Pair is not exist
            var pairException = await UserTomStub.RemoveLiquidity.SendWithExceptionAsync(new RemoveLiquidityInput()
            {
                AmountAMin = amountADesired,
                AmountBMin = amountBDesired,
                LiquidityRemove = liquidityRemove,
                Deadline = Timestamp.FromDateTime(DateTime.UtcNow.Add(new TimeSpan(0, 0, 3))),
                SymbolA = "ELF",
                SymbolB = "INVALID"
            });
            pairException.TransactionResult.Error.ShouldContain("Pair is not exist");

            //Insufficient LiquidityToken
            var zeroLiquidityException = await UserTomStub.RemoveLiquidity.SendWithExceptionAsync(
                new RemoveLiquidityInput()
                {
                    AmountAMin = amountADesired,
                    AmountBMin = amountBDesired,
                    LiquidityRemove = liquidityRemove,
                    Deadline = Timestamp.FromDateTime(DateTime.UtcNow.Add(new TimeSpan(0, 0, 3))),
                    SymbolA = "ELF",
                    SymbolB = "TEST"
                });
            zeroLiquidityException.TransactionResult.Error.ShouldContain("Insufficient LiquidityToken");

            await UserTomStub.AddLiquidity.SendAsync(new AddLiquidityInput()
            {
                AmountADesired = amountADesired,
                AmountAMin = amountADesired,
                AmountBDesired = amountBDesired,
                AmountBMin = amountBDesired,
                Deadline = Timestamp.FromDateTime(DateTime.UtcNow.Add(new TimeSpan(0, 0, 3))),
                SymbolA = "ELF",
                SymbolB = "TEST"
            });
            var liquidityBalanceBefore = await UserTomStub.GetLiquidityTokenBalance.CallAsync(new PairList()
            {
                SymbolPair = {"ELF-TEST"}
            });
            var insufficientLiquidityException = await UserTomStub.RemoveLiquidity.SendWithExceptionAsync(
                new RemoveLiquidityInput()
                {
                    AmountAMin = amountADesired,
                    AmountBMin = amountBDesired,
                    LiquidityRemove = liquidityBalanceBefore.Results[0].Balance.Add(1),
                    Deadline = Timestamp.FromDateTime(DateTime.UtcNow.Add(new TimeSpan(0, 0, 3))),
                    SymbolA = "ELF",
                    SymbolB = "TEST"
                });
            insufficientLiquidityException.TransactionResult.Error.ShouldContain("Insufficient LiquidityToken");

            //Insufficient tokenA
            var insufficientTokenAException = await UserTomStub.RemoveLiquidity.SendWithExceptionAsync(
                new RemoveLiquidityInput()
                {
                    AmountAMin = amountADesired.Add(floatAmount),
                    AmountBMin = amountBDesired,
                    LiquidityRemove = liquidityBalanceBefore.Results[0].Balance,
                    Deadline = Timestamp.FromDateTime(DateTime.UtcNow.Add(new TimeSpan(0, 0, 3))),
                    SymbolA = "ELF",
                    SymbolB = "TEST"
                });
            insufficientTokenAException.TransactionResult.Error.ShouldContain("Insufficient tokenA");

            //Insufficient tokenB
            var insufficientTokenBException = await UserTomStub.RemoveLiquidity.SendWithExceptionAsync(
                new RemoveLiquidityInput()
                {
                    AmountAMin = amountADesired.Sub(floatAmount),
                    AmountBMin = amountBDesired.Add(floatAmount),
                    LiquidityRemove = liquidityBalanceBefore.Results[0].Balance,
                    Deadline = Timestamp.FromDateTime(DateTime.UtcNow.Add(new TimeSpan(0, 0, 3))),
                    SymbolA = "ELF",
                    SymbolB = "TEST"
                });
            insufficientTokenBException.TransactionResult.Error.ShouldContain("Insufficient tokenB");

            #endregion

            #region Success

            var reservesBefore = await UserTomStub.GetReserves.CallAsync(new GetReservesInput()
            {
                SymbolPair = {"ELF-TEST"}
            });
            var totalSupplyBefore = await UserTomStub.GetTotalSupply.CallAsync(new PairList()
            {
                SymbolPair = {"ELF-TEST"}
            });
            var elfBalanceBefore = await TokenContractStub.GetBalance.CallAsync(new GetBalanceInput()
            {
                Owner = UserTomAddress,
                Symbol = "ELF"
            });
            var testBalanceBefore = await TokenContractStub.GetBalance.CallAsync(new GetBalanceInput()
            {
                Owner = UserTomAddress,
                Symbol = "TEST"
            });

            await UserTomStub.RemoveLiquidity.SendAsync(new RemoveLiquidityInput()
            {
                AmountAMin = amountADesired.Sub(floatAmount),
                AmountBMin = amountBDesired.Sub(floatAmount),
                LiquidityRemove = liquidityBalanceBefore.Results[0].Balance,
                Deadline = Timestamp.FromDateTime(DateTime.UtcNow.Add(new TimeSpan(0, 0, 3))),
                SymbolA = "ELF",
                SymbolB = "TEST"
            });
            // amountA =liquidityRemoveAmountDecimal * balanceA / totalSupply);
            // amountB =liquidityRemoveAmountDecimal * balanceB / totalSupply);
            var liquidityRemoveAmountDecimal = Convert.ToDecimal(liquidityBalanceBefore.Results[0].Balance);
            var amountAGet = decimal.ToInt64(liquidityRemoveAmountDecimal * reservesBefore.Results[0].ReserveA /
                                             totalSupplyBefore.Results[0].TotalSupply);
            var amountBGet = decimal.ToInt64(liquidityRemoveAmountDecimal * reservesBefore.Results[0].ReserveB /
                                             totalSupplyBefore.Results[0].TotalSupply);
            var reservesAfter = await UserTomStub.GetReserves.CallAsync(new GetReservesInput()
            {
                SymbolPair = {"ELF-TEST"}
            });
            var totalSupplyAfter = await UserTomStub.GetTotalSupply.CallAsync(new PairList()
            {
                SymbolPair = {"ELF-TEST"}
            });
            var elfBalanceAfter = await TokenContractStub.GetBalance.CallAsync(new GetBalanceInput()
            {
                Owner = UserTomAddress,
                Symbol = "ELF"
            });
            var testBalanceAfter = await TokenContractStub.GetBalance.CallAsync(new GetBalanceInput()
            {
                Owner = UserTomAddress,
                Symbol = "TEST"
            });
            var liquidityBalance = await UserTomStub.GetLiquidityTokenBalance.CallAsync(new PairList()
            {
                SymbolPair = {"ELF-TEST"}
            });

            reservesAfter.Results[0].ReserveA.ShouldBe(reservesBefore.Results[0].ReserveA.Sub(amountAGet));
            reservesAfter.Results[0].ReserveB.ShouldBe(reservesBefore.Results[0].ReserveB.Sub(amountBGet));

            liquidityBalance.Results[0].Balance.ShouldBe(0);
            totalSupplyAfter.Results[0].TotalSupply.ShouldBe(totalSupplyBefore.Results[0].TotalSupply
                .Sub(liquidityBalanceBefore.Results[0].Balance));

            elfBalanceAfter.Balance.ShouldBe(elfBalanceBefore.Balance.Add(amountAGet));
            testBalanceAfter.Balance.ShouldBe(testBalanceBefore.Balance.Add(amountBGet));

            #endregion
        }

        [Fact]
        public async Task SwapTest()
        {
            await Initialize();
            const long amountIn = 100000000;
            const long amountOut = 100000000;
            const long errorInput = -1;

            #region Exceptions

            //Expired
            var expiredException = await UserTomStub.SwapExactTokenForToken.SendWithExceptionAsync(
                new SwapExactTokenForTokenInput()
                {
                    SymbolIn = "ELF",
                    SymbolOut = "TEST",
                    AmountIn = amountIn,
                    AmountOutMin = amountOut,
                    Deadline = Timestamp.FromDateTime(DateTime.UtcNow.Add(new TimeSpan(0, 0, -1))),
                });
            expiredException.TransactionResult.Error.ShouldContain("Expired");

            //Pair not Exists
            var pairException = await UserTomStub.SwapExactTokenForToken.SendWithExceptionAsync(
                new SwapExactTokenForTokenInput()
                {
                    SymbolIn = "ELF",
                    SymbolOut = "INVALID",
                    AmountIn = amountIn,
                    AmountOutMin = amountOut,
                    Deadline = Timestamp.FromDateTime(DateTime.UtcNow.Add(new TimeSpan(0, 0, 3))),
                });
            pairException.TransactionResult.Error.ShouldContain("Pair not Exists");

            //Invalid Input
            var amountInException = await UserTomStub.SwapExactTokenForToken.SendWithExceptionAsync(
                new SwapExactTokenForTokenInput()
                {
                    SymbolIn = "ELF",
                    SymbolOut = "TEST",
                    AmountIn = errorInput,
                    AmountOutMin = amountOut,
                    Deadline = Timestamp.FromDateTime(DateTime.UtcNow.Add(new TimeSpan(0, 0, 3))),
                });
            amountInException.TransactionResult.Error.ShouldContain("Invalid Input");
            var amountOutMinException = await UserTomStub.SwapExactTokenForToken.SendWithExceptionAsync(
                new SwapExactTokenForTokenInput()
                {
                    SymbolIn = "ELF",
                    SymbolOut = "TEST",
                    AmountIn = amountIn,
                    AmountOutMin = errorInput,
                    Deadline = Timestamp.FromDateTime(DateTime.UtcNow.Add(new TimeSpan(0, 0, 3))),
                });
            amountOutMinException.TransactionResult.Error.ShouldContain("Invalid Input");

            //Insufficient reserves
            var reservesException = await UserTomStub.SwapExactTokenForToken.SendWithExceptionAsync(
                new SwapExactTokenForTokenInput()
                {
                    SymbolIn = "ELF",
                    SymbolOut = "TEST",
                    AmountIn = amountIn,
                    AmountOutMin = amountOut,
                    Deadline = Timestamp.FromDateTime(DateTime.UtcNow.Add(new TimeSpan(0, 0, 3)))
                });
            reservesException.TransactionResult.Error.ShouldContain("Insufficient reserves");

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

            var reserveBefore = await UserTomStub.GetReserves.CallAsync(new GetReservesInput()
            {
                SymbolPair = {"ELF-TEST"}
            });
            var elfBalanceBefore = await UserTomTokenContractStub.GetBalance.CallAsync(new GetBalanceInput()
            {
                Owner = UserTomAddress,
                Symbol = "ELF"
            });
            var testBalanceBefore = await UserTomTokenContractStub.GetBalance.CallAsync(new GetBalanceInput()
            {
                Owner = UserTomAddress,
                Symbol = "TEST"
            });

            var amountInWithFee = Convert.ToDecimal(amountIn) * 997;
            var numerator = amountInWithFee * Convert.ToDecimal(reserveBefore.Results[0].ReserveB);
            var denominator = Convert.ToDecimal(reserveBefore.Results[0].ReserveA * 1000) + amountInWithFee;
            var amountOutExpect = decimal.ToInt64(numerator / denominator);

            //Insufficient Output amount
            var outputException = await UserTomStub.SwapExactTokenForToken.SendWithExceptionAsync(
                new SwapExactTokenForTokenInput()
                {
                    SymbolIn = "ELF",
                    SymbolOut = "TEST",
                    AmountIn = amountIn,
                    AmountOutMin = amountOutExpect.Sub(-1),
                    Deadline = Timestamp.FromDateTime(DateTime.UtcNow.Add(new TimeSpan(0, 0, 3)))
                });
            outputException.TransactionResult.Error.ShouldContain("Insufficient Output amount");

            #endregion

            #region SwapExactTokenForToken

            await UserTomStub.SwapExactTokenForToken.SendAsync(new SwapExactTokenForTokenInput()
            {
                SymbolIn = "ELF",
                SymbolOut = "TEST",
                AmountIn = amountIn,
                AmountOutMin = amountOutExpect,
                Deadline = Timestamp.FromDateTime(DateTime.UtcNow.Add(new TimeSpan(0, 0, 3)))
            });
            var reserveAfter = await UserTomStub.GetReserves.CallAsync(new GetReservesInput()
            {
                SymbolPair = {"ELF-TEST"}
            });
            reserveAfter.Results[0].ReserveA.ShouldBe(reserveBefore.Results[0].ReserveA.Add(amountIn));
            reserveAfter.Results[0].ReserveB.ShouldBe(reserveBefore.Results[0].ReserveB.Sub(amountOutExpect));
            var elfBalanceAfter = await UserTomTokenContractStub.GetBalance.CallAsync(new GetBalanceInput()
            {
                Owner = UserTomAddress,
                Symbol = "ELF"
            });
            var testBalanceAfter = await UserTomTokenContractStub.GetBalance.CallAsync(new GetBalanceInput()
            {
                Owner = UserTomAddress,
                Symbol = "TEST"
            });
            elfBalanceAfter.Balance.ShouldBe(elfBalanceBefore.Balance.Sub(amountIn));
            testBalanceAfter.Balance.ShouldBe(testBalanceBefore.Balance.Add(amountOutExpect));

            #endregion

            #region SwapTokenForExactToken

            const long amountOut1 = 10000000;
            var reserveInDecimal = Convert.ToDecimal(reserveAfter.Results[0].ReserveA);
            var reserveOutDecimal = Convert.ToDecimal(reserveAfter.Results[0].ReserveB);
            numerator = reserveInDecimal * amountOut1 * 1000;
            denominator = (reserveOutDecimal - amountOut1) * 997;
            var amountIn1 = decimal.ToInt64(numerator / denominator) + 1;
            await UserTomStub.SwapTokenForExactToken.SendAsync(new SwapTokenForExactTokenInput()
            {
                SymbolIn = "ELF",
                SymbolOut = "TEST",
                AmountOut = amountOut1,
                AmountInMax = amountIn1,
                Deadline = Timestamp.FromDateTime(DateTime.UtcNow.Add(new TimeSpan(0, 0, 3)))
            });
            var reserveAfter1 = await UserTomStub.GetReserves.CallAsync(new GetReservesInput()
            {
                SymbolPair = {"ELF-TEST"}
            });
            reserveAfter1.Results[0].ReserveA.ShouldBe(reserveAfter.Results[0].ReserveA.Add(amountIn1));
            reserveAfter1.Results[0].ReserveB.ShouldBe(reserveAfter.Results[0].ReserveB.Sub(amountOut1));
            var elfBalanceAfter1 = await UserTomTokenContractStub.GetBalance.CallAsync(new GetBalanceInput()
            {
                Owner = UserTomAddress,
                Symbol = "ELF"
            });
            var testBalanceAfter1 = await UserTomTokenContractStub.GetBalance.CallAsync(new GetBalanceInput()
            {
                Owner = UserTomAddress,
                Symbol = "TEST"
            });
            elfBalanceAfter1.Balance.ShouldBe(elfBalanceAfter.Balance.Sub(amountIn1));
            testBalanceAfter1.Balance.ShouldBe(testBalanceAfter.Balance.Add(amountOut1));

            #endregion
        }

        [Fact]
        public async Task CreatePairTest()
        {
            await CreateAndGetToken();
            await AESwapContractStub.Initialize.SendAsync(new Empty());
            //Invalid TokenPair
            var tokenPairException = await UserTomStub.CreatePair.SendWithExceptionAsync(new CreatePairInput()
            {
                SymbolPair = "ELF"
            });
            tokenPairException.TransactionResult.Error.ShouldContain("Invalid TokenPair");

            //Identical Tokens
            var identicalException = await UserTomStub.CreatePair.SendWithExceptionAsync(new CreatePairInput()
            {
                SymbolPair = "ELF-ELF"
            });
            identicalException.TransactionResult.Error.ShouldContain("Identical Tokens");

            //Invalid Tokens
            var tokensException = await UserTomStub.CreatePair.SendWithExceptionAsync(new CreatePairInput()
            {
                SymbolPair = "ELF-INVALID"
            });
            tokensException.TransactionResult.Error.ShouldContain("Invalid Tokens");

            //success
            await UserTomStub.CreatePair.SendAsync(new CreatePairInput()
            {
                SymbolPair = "ELF-TEST"
            });

            //Pair Exists
            var existsException = await UserTomStub.CreatePair.SendWithExceptionAsync(new CreatePairInput()
            {
                SymbolPair = "ELF-TEST"
            });
            existsException.TransactionResult.Error.ShouldContain("Pair Exists");
            var pairList = await UserTomStub.GetPairs.CallAsync(new Empty());
            pairList.SymbolPair.ShouldContain("ELF-TEST");
        }

        [Fact]
        public async  Task InitializeTest()
        {
            await CreateAndGetToken();
            await AESwapContractStub.Initialize.SendAsync(new Empty());
            //Already initialized
           var initializedException= await AESwapContractStub.Initialize.SendWithExceptionAsync(new Empty());
           initializedException.TransactionResult.Error.ShouldContain("Already initialized");
        }

        [Fact]
        public async Task GetReservesTest()
        {
            await Initialize();
            const long amountADesired = 100000000;
            const long amountBDesired = 200000000;
            //Pair not existed
            var pairException = await UserTomStub.GetReserves.CallWithExceptionAsync(new GetReservesInput()
            {
                SymbolPair = {"ELF-INVALID"}
            });
            pairException.Value.ShouldContain("Pair not existed");
            await UserTomStub.AddLiquidity.SendAsync(new AddLiquidityInput()
            {
                AmountADesired = amountADesired,
                AmountAMin = amountADesired,
                AmountBDesired = amountBDesired,
                AmountBMin = amountBDesired,
                Deadline = Timestamp.FromDateTime(DateTime.UtcNow.Add(new TimeSpan(0, 0, 3))),
                SymbolA = "ELF",
                SymbolB = "TEST"
            });
            var reserves = await UserTomStub.GetReserves.CallAsync(new GetReservesInput()
            {
                SymbolPair = {"ELF-TEST"}
            });
            reserves.Results[0].ReserveA.ShouldBe(amountADesired);
            reserves.Results[0].ReserveB.ShouldBe(amountBDesired);
        }

        [Fact]
        public async Task GetTotalSupplyTest()
        {
            await Initialize();
            const long amountADesired = 100000000;
            const long amountBDesired = 200000000;
            //Pair not existed
            var pairException = await UserTomStub.GetTotalSupply.CallWithExceptionAsync(new PairList()
            {
                SymbolPair = {"ELF-INVALID"}
            });
            pairException.Value.ShouldContain("Pair not existed");
            //Success
            await UserTomStub.AddLiquidity.SendAsync(new AddLiquidityInput()
            {
                AmountADesired = amountADesired,
                AmountAMin = amountADesired,
                AmountBDesired = amountBDesired,
                AmountBMin = amountBDesired,
                Deadline = Timestamp.FromDateTime(DateTime.UtcNow.Add(new TimeSpan(0, 0, 3))),
                SymbolA = "ELF",
                SymbolB = "TEST"
            });
            var totalSupply = await UserTomStub.GetTotalSupply.CallAsync(new PairList()
            {
                SymbolPair = {"ELF-TEST"}
            });
            var totalSupplyExpect = (long) Math.Sqrt(amountADesired * amountBDesired);
            totalSupply.Results[0].TotalSupply.ShouldBe(totalSupplyExpect);
        }

        [Fact]
        public async Task GetLiquidityTokenBalanceTest()
        {
            await Initialize();
            const long amountADesired = 100000000;
            const long amountBDesired = 200000000;
            //Pair not existed
            var pairException = await UserTomStub.GetLiquidityTokenBalance.CallWithExceptionAsync(new PairList()
            {
                SymbolPair = {"ELF-INVALID"}
            });
            pairException.Value.ShouldContain("Pair not existed");
            //Success  
            await UserTomStub.AddLiquidity.SendAsync(new AddLiquidityInput()
            {
                AmountADesired = amountADesired,
                AmountAMin = amountADesired,
                AmountBDesired = amountBDesired,
                AmountBMin = amountBDesired,
                Deadline = Timestamp.FromDateTime(DateTime.UtcNow.Add(new TimeSpan(0, 0, 3))),
                SymbolA = "ELF",
                SymbolB = "TEST"
            });
            var liquidity = await UserTomStub.GetLiquidityTokenBalance.CallAsync(new PairList()
            {
                SymbolPair = {"ELF-TEST"}
            });
            var liquidityExpect = (long) Math.Sqrt(amountADesired * amountBDesired)-1;
            liquidity.Results[0].Balance.ShouldBe(liquidityExpect);
        }

        [Fact]
        public async Task QuoteTest()
        {
            const long amountA = 100000000;
            const long errorInput = 0;
            const long amountADesired = 100000000;
            const long amountBDesired = 200000000;
            await Initialize();
            var pairException = await UserTomStub.Quote.CallWithExceptionAsync(new QuoteInput()
            {
                SymbolA = "ELF",
                SymbolB = "INVALID",
                AmountA = amountA
            });
            pairException.Value.ShouldContain("Pair not existed");
            //Insufficient  amount
            var amountException = await UserTomStub.Quote.CallWithExceptionAsync(new QuoteInput()
            {
                SymbolA = "ELF",
                SymbolB = "TEST",
                AmountA = errorInput
            });
            amountException.Value.ShouldContain("Insufficient Amount");
            //Insufficient reserves
            var reservesException = await UserTomStub.Quote.CallWithExceptionAsync(new QuoteInput()
            {
                SymbolA = "ELF",
                SymbolB = "TEST",
                AmountA = amountA
            });
            reservesException.Value.ShouldContain("Insufficient reserves");
            //Success  
            await UserTomStub.AddLiquidity.SendAsync(new AddLiquidityInput()
            {
                AmountADesired = amountADesired,
                AmountAMin = amountADesired,
                AmountBDesired = amountBDesired,
                AmountBMin = amountBDesired,
                Deadline = Timestamp.FromDateTime(DateTime.UtcNow.Add(new TimeSpan(0, 0, 3))),
                SymbolA = "ELF",
                SymbolB = "TEST"
            });
            var amountBExpect = decimal.ToInt64(Convert.ToDecimal(amountA) * amountBDesired / amountADesired);
            var amountB = await UserTomStub.Quote.CallAsync(new QuoteInput()
                {
                    SymbolA = "ELF",
                    SymbolB = "TEST",
                    AmountA = amountA
                }
            );
            amountB.Value.ShouldBe(amountBExpect);
        }

        [Fact]
        public async Task GetAmountInTest()
        {
            const long amountOut = 100000000;
            const long errorInput = 0;
            const long amountADesired = 100000000;
            const long amountBDesired = 200000000;
            await Initialize();
            var pairException = await UserTomStub.GetAmountIn.CallWithExceptionAsync(new GetAmountInInput()
            {
                SymbolIn = "ELF",
                SymbolOut = "INVALID",
                AmountOut = amountOut
            });
            pairException.Value.ShouldContain("Pair not existed");
            //Insufficient Output amount
            var amountException = await UserTomStub.GetAmountIn.CallWithExceptionAsync(new GetAmountInInput()
            {
                SymbolIn = "ELF",
                SymbolOut = "TEST",
                AmountOut = errorInput
            });
            amountException.Value.ShouldContain("Insufficient Output Amount");
            //Insufficient reserves
            var reservesException = await UserTomStub.GetAmountIn.CallWithExceptionAsync(new GetAmountInInput()
            {
                SymbolIn = "ELF",
                SymbolOut = "TEST",
                AmountOut = amountOut
            });
            reservesException.Value.ShouldContain("Insufficient reserves");
            await UserTomStub.AddLiquidity.SendAsync(new AddLiquidityInput()
            {
                AmountADesired = amountADesired,
                AmountAMin = amountADesired,
                AmountBDesired = amountBDesired,
                AmountBMin = amountBDesired,
                Deadline = Timestamp.FromDateTime(DateTime.UtcNow.Add(new TimeSpan(0, 0, 3))),
                SymbolA = "ELF",
                SymbolB = "TEST"
            });
            var numerator = Convert.ToDecimal(amountADesired) * amountOut * 1000;
            var denominator = (Convert.ToDecimal(amountBDesired) - amountOut) * 997;
            var amountInExpect = decimal.ToInt64(numerator / denominator) + 1;
            var amountIn = await UserTomStub.GetAmountIn.CallAsync(new GetAmountInInput()
            {
                SymbolIn = "ELF",
                SymbolOut = "TEST",
                AmountOut = amountOut
            });
            amountIn.Value.ShouldBe(amountInExpect);
        }

        [Fact]
        public async Task GetAmountOutTest()
        {
            const long amountIn = 100000000;
            const long errorInput = 0;
            const long amountADesired = 100000000;
            const long amountBDesired = 200000000;
            await Initialize();
            var pairException = await UserTomStub.GetAmountOut.CallWithExceptionAsync(new GetAmountOutInput()
            {
                SymbolIn = "ELF",
                SymbolOut = "INVALID",
                AmountIn = amountIn
            });
            pairException.Value.ShouldContain("Pair not existed");
            //Insufficient Output amount
            var amountException = await UserTomStub.GetAmountOut.CallWithExceptionAsync(new GetAmountOutInput()
            {
                SymbolIn = "ELF",
                SymbolOut = "TEST",
                AmountIn = errorInput
            });
            amountException.Value.ShouldContain("Insufficient Output Amount");
            //Insufficient reserves
            var reservesException = await UserTomStub.GetAmountOut.CallWithExceptionAsync(new GetAmountOutInput()
            {
                SymbolIn = "ELF",
                SymbolOut = "TEST",
                AmountIn = amountIn
            });
            reservesException.Value.ShouldContain("Insufficient reserves");
            await UserTomStub.AddLiquidity.SendAsync(new AddLiquidityInput()
            {
                AmountADesired = amountADesired,
                AmountAMin = amountADesired,
                AmountBDesired = amountBDesired,
                AmountBMin = amountBDesired,
                Deadline = Timestamp.FromDateTime(DateTime.UtcNow.Add(new TimeSpan(0, 0, 3))),
                SymbolA = "ELF",
                SymbolB = "TEST"
            });
            var amountInWithFee = amountIn.Mul(997);
            var numerator = amountInWithFee * Convert.ToDecimal(amountBDesired);
            var denominator = (Convert.ToDecimal(amountADesired) * 1000) + amountInWithFee;
            var amountOutExpect = decimal.ToInt64(numerator / denominator);
            var amountOut = await UserTomStub.GetAmountOut.CallAsync(new GetAmountOutInput()
            {
                SymbolIn = "ELF",
                SymbolOut = "TEST",
                AmountIn = amountIn
            });
            amountOut.Value.ShouldBe(amountOutExpect);
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
    }
}