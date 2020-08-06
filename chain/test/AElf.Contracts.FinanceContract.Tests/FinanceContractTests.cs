using System;
using System.Linq;
using System.Threading.Tasks;
using AElf.ContractTestBase.ContractTestKit;
using AElf.Contracts.MultiToken;
using AElf.Types;
using Google.Protobuf;
using Google.Protobuf.Collections;
using Google.Protobuf.WellKnownTypes;
using Shouldly;
using Xunit;

namespace AElf.Contracts.FinanceContract
{
    public class FinanceContractTests : FinanceContractTestBase
    {
        [Fact]
        public async Task Test()
        {
            await FinanceContractStub.Initialize.SendAsync(new InitializeInput()
            {
                CloseFactor = "0.1",
                LiquidationIncentive = "1.1",
                MaxAssets = 5
            });
            var result = await FinanceContractStub.GetCloseFactor.SendAsync(new Empty());
            result.Output.Value.ShouldBe("0.1");

            await FinanceContractStub.SupportMarket.SendAsync(new SupportMarketInput()
            {
                BaseRatePerBlock = "0.0000000001",
                InitialExchangeRate = "1.1",
                MultiplierPerBlock = "0.000000001",
                ReserveFactor = "0.001",
                Symbol = "ELF"
            });

            await TokenContractStub.Transfer.SendAsync(new TransferInput()
            {
                Amount = 100000,
                Symbol = "ELF",
                Memo = "Recharge",
                To = UserTomAddress
            });
            var banlance = await TokenContractStub.GetBalance.SendAsync(new GetBalanceInput()
            {
                Owner = UserTomAddress,
                Symbol = "ELF"
            });
            banlance.Output.Balance.ShouldBe(100000);
            await UserTomTokenContractStub.Approve.SendAsync(new ApproveInput()
            {
                Amount = 100000,
                Spender = FinanceContractAddress,
                Symbol = "ELF"
            });
            await UserTomStub.Mint.SendAsync(new MintInput()
            {
                Amount = 500, Symbol = "ELF"
            });
            var snapshotOutput = await UserTomStub.GetAccountSnapshot.SendAsync(new Account()
            {
                Address = UserTomAddress,
                Symbol = "ELF"
            });
            var initialExchangeRate = "1.1";
            snapshotOutput.Output.CTokenBalance.ShouldBe(decimal.ToInt64(500/decimal.Parse(initialExchangeRate)));
            await UserTomStub.EnterMarkets.SendAsync(new EnterMarketsInput()
            {
                Symbols = {"ELF"}
            });
            var borrowBalance = await UserTomStub.GetBorrowBalanceStored.SendAsync(new Account()
            {
                Address = UserTomAddress,
                Symbol = "ELF"
            });
            borrowBalance.Output.Value.ShouldNotBeNull();
        }


        [Fact]
        public async Task SetUnderlyingPriceTest()
        {
            await Initialize();
            await SupportMarket();
            await FinanceContractStub.SetUnderlyingPrice.SendAsync(new SetUnderlyingPriceInput()
            {
                Symbol = "ELF",
                Price = "1.5",
            });
            var price = await FinanceContractStub.GetUnderlyingPrice.CallAsync(new StringValue()
            {
                Value = "ELF"
            });
            price.Value.ShouldBe("1.5");
        }

        [Fact]
        public async Task InitializeTest()
        {
            await FinanceContractStub.Initialize.SendAsync(new InitializeInput()
            {
                CloseFactor = "0.1",
                LiquidationIncentive = "1.1",
                MaxAssets = 5
            });
            var closeFactor = await FinanceContractStub.GetCloseFactor.SendAsync(new Empty());
            closeFactor.Output.Value.ShouldBe("0.1");
            var liquidationIncentive = await FinanceContractStub.GetLiquidationIncentive.SendAsync(new Empty());
            liquidationIncentive.Output.Value.ShouldBe("1.1");
            var maxAssets = await FinanceContractStub.GetMaxAssets.SendAsync(new Empty());
            maxAssets.Output.Value.ShouldBe(5);
        }

        [Fact]
        public async Task SupportMarketTest()
        {
            await Initialize();
            //UNAUTHORIZED
            var result = await UserTomStub.SupportMarket.SendWithExceptionAsync(new SupportMarketInput()
            {
                BaseRatePerBlock = "0.0001",
                InitialExchangeRate = "1.1",
                MultiplierPerBlock = "0.0001",
                ReserveFactor = "0.001",
                Symbol = "ELF"
            });
            result.TransactionResult.Error.ShouldContain("UNAUTHORIZED");
            //success
            await FinanceContractStub.SupportMarket.SendAsync(new SupportMarketInput()
            {
                BaseRatePerBlock = "0.0001",
                InitialExchangeRate = "1.1",
                MultiplierPerBlock = "0.0001",
                ReserveFactor = "0.001",
                Symbol = "ELF"
            });
            var interestRate = await FinanceContractStub.GetInterestRate.CallAsync(new StringValue()
            {
                Value = "ELF"
            });
            interestRate.BaseRatePerBlock.ShouldBe("0.0001");
            interestRate.MultiplierPerBlock.ShouldBe("0.0001");
            var reserve = await FinanceContractStub.GetReserveFactor.CallAsync(new StringValue()
            {
                Value = "ELF"
            });
            reserve.Value.ShouldBe("0.001");
            //MARKET_EXISTS
            var exception = await FinanceContractStub.SupportMarket.SendWithExceptionAsync(new SupportMarketInput()
            {
                BaseRatePerBlock = "0.0000000001",
                InitialExchangeRate = "1.1",
                MultiplierPerBlock = "0.000000001",
                ReserveFactor = "0.00001",
                Symbol = "ELF"
            });
            exception.TransactionResult.Error.ShouldContain("MARKET_EXISTS");
        }

        [Fact]
        public async Task MintTest()
        {
            await Initialize();
            await SupportMarket();
            await UserTomStub.Mint.SendAsync(new MintInput()
            {
                Amount = 500, Symbol = "ELF"
            });
            var snapshotOutputTom = await UserTomStub.GetAccountSnapshot.SendAsync(new Account()
            {
                Address = UserTomAddress,
                Symbol = "ELF"
            });
            var initialExchangeRate = "0.02";
            snapshotOutputTom.Output.CTokenBalance.ShouldBe(decimal.ToInt64(500/decimal.Parse(initialExchangeRate)));
        }

        [Fact]
        public async Task BorrowTest()
        {
            await Initialize();
            await SupportMarket();
            await Mint(500, "ELF");
            await EnterMarket();

            await UserTomStub.Borrow.SendAsync(new BorrowInput()
            {
                Symbol = "ELF",
                Amount = 10
            });
            var borrowBalance = await UserTomStub.GetBorrowBalanceStored.SendAsync(new Account()
            {
                Address = UserTomAddress,
                Symbol = "ELF"
            });
            borrowBalance.Output.Value.ShouldBe(10);
            //PRICE_ERROR
            await SetUnderlyingPrice("ELF", "0");
            var priceException = await UserTomStub.Borrow.SendWithExceptionAsync(new BorrowInput()
            {
                Symbol = "ELF",
                Amount = 10
            });
            priceException.TransactionResult.Error.ShouldContain("PRICE_ERROR");
            await SetUnderlyingPrice("ELF", "1");
            //INSUFFICIENT_LIQUIDITY
            var insufficientException = await UserTomStub.Borrow.SendWithExceptionAsync(new BorrowInput()
            {
                Symbol = "ELF",
                Amount = 500
            });
            insufficientException.TransactionResult.Error.ShouldContain("INSUFFICIENT_LIQUIDITY");
            //borrow is paused
            await FinanceContractStub.SetBorrowPaused.SendAsync(new SetPausedInput()
            {
                State = true,
                Symbol = "ELF"
            });
            var pausedException = await UserTomStub.Borrow.SendWithExceptionAsync(new BorrowInput()
            {
                Symbol = "ELF",
                Amount = 10
            });
            pausedException.TransactionResult.Error.ShouldContain("borrow is paused");
        }

        [Fact]
        public async Task RepayBorrowTest()
        {
            await Initialize();
            await SupportMarket();
            await Mint(500, "ELF");
            await EnterMarket();
            await Borrow("ELF", 10);
            var borrowBalanceBefore = await UserTomStub.GetBorrowBalanceStored.SendAsync(new Account()
            {
                Address = UserTomAddress,
                Symbol = "ELF"
            });
            borrowBalanceBefore.Output.Value.ShouldBe(10);
            await UserTomStub.RepayBorrow.SendAsync(new RepayBorrowInput()
            {
                Amount = -1,
                Symbol = "ELF"
            });
            var borrowBalanceAfter = await UserTomStub.GetBorrowBalanceStored.SendAsync(new Account()
            {
                Address = UserTomAddress,
                Symbol = "ELF"
            });
            borrowBalanceAfter.Output.Value.ShouldBe(0);
        }

        [Fact]
        public async Task RepayBorrowBehalfTest()
        {
            await Initialize();
            await SupportMarket();
            await Mint(500, "ELF");
            await EnterMarket();
            await Borrow("ELF", 10);
            var borrowBalanceBefore = await UserTomStub.GetBorrowBalanceStored.SendAsync(new Account()
            {
                Address = UserTomAddress,
                Symbol = "ELF"
            });
            borrowBalanceBefore.Output.Value.ShouldBe(10);
            await UserLilyStub.RepayBorrowBehalf.SendAsync(new RepayBorrowBehalfInput()
            {
                Symbol = "ELF", Amount = -1, Borrower = UserTomAddress
            });
            var borrowBalanceAfter = await UserTomStub.GetBorrowBalanceStored.SendAsync(new Account()
            {
                Address = UserTomAddress,
                Symbol = "ELF"
            });
            borrowBalanceAfter.Output.Value.ShouldBe(0);
        }

        [Fact]
        public async Task AddOrReduceReservesTest()
        {
            await Initialize();
            await SupportMarket();
            var totalReservesBefore = await FinanceContractStub.GetTotalReserves.SendAsync(new StringValue()
            {
                Value = "ELF"
            });
            totalReservesBefore.Output.Value.ShouldBe(0);
            //AddReserves method
            await FinanceContractStub.AddReserves.SendAsync(new AddReservesInput()
            {
                Amount = 100,
                Symbol = "ELF"
            });
            var totalReservesAfter = await FinanceContractStub.GetTotalReserves.SendAsync(new StringValue()
            {
                Value = "ELF"
            });
            totalReservesAfter.Output.Value.ShouldBe(100);
            //
             await FinanceContractStub.ReduceReserves.SendAsync(new ReduceReservesInput()
            {
                Amount = 50,
                Symbol = "ELF"
            });
             var totalReservesFinally = await FinanceContractStub.GetTotalReserves.SendAsync(new StringValue()
            {
                Value = "ELF"
            });
             totalReservesFinally.Output.Value.ShouldBe(50);
        }

        [Fact]
        public async Task RedeemTest()
        {
            await Initialize();
            await SupportMarket();
            await Mint(500, "ELF");
            await EnterMarket();
            var balanceBefore = await UserTomStub.GetBalance.SendAsync(new Account()
            {
                Address = UserTomAddress,
                Symbol = "ELF"
            });
            balanceBefore.Output.Value.ShouldBe(decimal.ToInt64(500/decimal.Parse("0.02")));
            await UserTomStub.Redeem.SendAsync(new RedeemInput()
            {
                Amount = balanceBefore.Output.Value,
                Symbol = "ELF"
            });
            var balanceAfter = await UserTomStub.GetBalance.SendAsync(new Account()
            {
                Address = UserTomAddress,
                Symbol = "ELF"
            });
            balanceAfter.Output.Value.ShouldBe(0);
        }
         
        [Fact]
        public async Task RedeemUnderlyingTest()
        {
            await Initialize();
            await SupportMarket();
            await Mint(500, "ELF");
            await EnterMarket();
            var balanceBefore = await UserTomStub.GetUnderlyingBalance.SendAsync(new Account()
            {
                Address = UserTomAddress,
                Symbol = "ELF"
            });
            balanceBefore.Output.Value.ShouldBe(500);
            await UserTomStub.RedeemUnderlying.SendAsync(new RedeemUnderlyingInput()
            {
                Amount = balanceBefore.Output.Value,
                Symbol = "ELF"
            });
            var balanceAfter = await UserTomStub.GetUnderlyingBalance.SendAsync(new Account()
            {
                Address = UserTomAddress,
                Symbol = "ELF"
            });
            balanceAfter.Output.Value.ShouldBe(0);
        }

        [Fact]
        public async Task SetPendingAdminTest()
        {
            await Initialize();
            //UNAUTHORIZED
            var unauthorizedException=  await  UserTomStub.SetPendingAdmin.SendWithExceptionAsync(UserTomAddress);
            unauthorizedException.TransactionResult.Error.ShouldContain("UNAUTHORIZED");
            //SUCCESS
            await FinanceContractStub.SetPendingAdmin.SendAsync(UserTomAddress);
           var pendingAdmin= await FinanceContractStub.GetPendingAdmin.SendAsync(new Empty());
           pendingAdmin.Output.ShouldBe(UserTomAddress);
        }

        [Fact]
        public async Task AcceptAdminTest()
        {
            await Initialize();
            var  unauthorizedException= await UserTomStub.AcceptAdmin.SendWithExceptionAsync(new Empty());
            unauthorizedException.TransactionResult.Error.ShouldContain("UNAUTHORIZED");
            await FinanceContractStub.SetPendingAdmin.SendAsync(UserTomAddress);
            await UserTomStub.AcceptAdmin.SendAsync(new Empty());
            var admin = await UserTomStub.GetAdmin.CallAsync(new Empty());
            admin.Value.ShouldBe(UserTomAddress.Value);
        }

        [Fact]
        public async Task GetMethodTest()
        {
            await Initialize();
            await SupportMarket();
            await Mint(500, "ELF");
            await EnterMarket();
            //GetCash
            var cash= await UserTomStub.GetCash.CallAsync(new StringValue()
            {
                Value = "ELF"
            });
            cash.Value.ShouldBe(500);
            //GetUnitSymbol
            var unitSymbol = await UserTomStub.GetUnitSymbol.CallAsync(new Empty());
            unitSymbol.Value.ShouldBe("ELF");
            //GetAssetsIn
            var assetList = await UserTomStub.GetAssetsIn.CallAsync(UserTomAddress);
            assetList.Assets.First().ShouldBe("ELF");
            //GetCollateralFactor
            var collateralFactor=await UserTomStub.GetCollateralFactor.CallAsync(new StringValue()
            {
                Value = "ELF"
            });
            collateralFactor.Value.ShouldBe("0.75");
            //GetAllMarkets
           var symbolList= await UserTomStub.GetAllMarkets.CallAsync(new Empty());
           symbolList.Symbols.First().ShouldBe("ELF");
            //GetExchangeRateStored
           var exchangeRate= await UserTomStub.GetExchangeRateStored.CallAsync(new StringValue()
            {
                Value = "ELF"
            });
            exchangeRate.Value.ShouldBe("0.02");
            //
            var borrowRate=   await UserTomStub.GetBorrowRatePerBlock.SendAsync(new StringValue()
            {
               Value = "ELF"
            });
            borrowRate.Output.Value.ShouldBe("0.000000000317098");
            var supplyRate= await UserTomStub.GetSupplyRatePerBlock.SendAsync(new StringValue()
            {
                Value = "ELF"
            });
            supplyRate.Output.Value.ShouldBe("0.");
           var currentBorrowBalance= await UserTomStub.GetCurrentBorrowBalance.SendAsync(new Account()
            {
                Symbol = "ELF",
                Address = UserTomAddress
            });
           currentBorrowBalance.Output.Value.ShouldBe(0);
           var totalBorrows= await UserTomStub.GetTotalBorrows.SendAsync(new StringValue()
            {
                Value = "ELF"
            });
           totalBorrows.Output.Value.ShouldBe(0);
            var currentExchangeRate=await UserTomStub.GetCurrentExchangeRate.SendAsync(new StringValue()
            {
                Value = "ELF"
            });
            decimal.Parse(currentExchangeRate.Output.Value).ShouldBeGreaterThan(0);
            var isMembership= await UserTomStub.CheckMembership.CallAsync(new Account()
            {
                Address = UserTomAddress,
                Symbol = "ELF"
            });
            isMembership.Value.ShouldBe(true);
        }

        [Fact]
        public async Task SetMethodTest()
        {   await Initialize();
            await SupportMarket();
            await FinanceContractStub.SetCloseFactor.SendAsync(new StringValue()
            {
                Value = "0.1"
            });
            var closeFactor = await FinanceContractStub.GetCloseFactor.CallAsync(new Empty());
            closeFactor.Value.ShouldBe("0.1");
            await FinanceContractStub.SetSeizePaused.SendAsync(new SetPausedInput()
            {
                State = true,
                Symbol = "ELF"
            });
            await FinanceContractStub.SetCollateralFactor.SendAsync(new SetCollateralFactorInput()
            {
                Symbol = "ELF",
                CollateralFactor = "0.8"
            });
            var collateralFactor = await FinanceContractStub.GetCollateralFactor.CallAsync(new StringValue()
            {
                Value = "ELF"
            });
            collateralFactor.Value.ShouldBe("0.8");
            await FinanceContractStub.SetInterestRate.SendAsync(new SetInterestRateInput()
            {
                Symbol = "ELF",
                BaseRatePerBlock = "0.0000000002",
                MultiplierPerBlock = "0.0000000002"
            });
            var interestRate= await FinanceContractStub.GetInterestRate.CallAsync(new StringValue()
            {
                Value = "ELF"
            });
            interestRate.MultiplierPerBlock.ShouldBe("0.0000000002");
            interestRate.BaseRatePerBlock.ShouldBe("0.0000000002");
            await FinanceContractStub.SetMaxAssets.SendAsync(new Int32Value()
            {
                Value = 8
            });
            var maxAssets= await FinanceContractStub.GetMaxAssets.CallAsync(new Empty());
            maxAssets.Value.ShouldBe(8);
            await FinanceContractStub.SetLiquidationIncentive.SendAsync(new StringValue()
            {
                Value = "1.1"
            });
            var liquidationIncentive=await FinanceContractStub.GetLiquidationIncentive.CallAsync(new Empty());
            liquidationIncentive.Value.ShouldBe("1.1");
            await FinanceContractStub.SetReserveFactor.SendAsync(new SetReserveFactorInput()
            {
                ReserveFactor = "0.9",
                Symbol = "ELF"
            });
            var reserveFactor= await FinanceContractStub.GetReserveFactor.CallAsync(new StringValue()
            {
                Value = "ELF"
            });
            reserveFactor.Value.ShouldBe("0.9");
        }
        
        [Fact]
        public async Task SetPauseGuardianTest()
        {
            await Initialize();
            await SupportMarket();
            var unauthorizedException= await UserTomStub.SetPauseGuardian.SendWithExceptionAsync(UserTomAddress);
            unauthorizedException.TransactionResult.Error.ShouldContain("UNAUTHORIZED");
            
            await FinanceContractStub.SetPauseGuardian.SendAsync(UserTomAddress);
            var pauseGuardian=await FinanceContractStub.GetPauseGuardian.CallAsync(new Empty());
            pauseGuardian.ShouldBe(UserTomAddress);
            var unauthorizedPausedException = await UserLilyStub.SetMintPaused.SendWithExceptionAsync(new SetPausedInput()
            {
                State = true,
                Symbol = "ELF"
            });
            unauthorizedPausedException.TransactionResult.Error.ShouldContain("only pause guardian and admin can pause");
            await UserTomStub.SetMintPaused.SendAsync(new SetPausedInput()
            {
                State = true,
                Symbol = "ELF"
            });
            var pausedException= UserTomStub.Mint.SendWithExceptionAsync(new MintInput()
            {
                Amount = 10,
                Symbol = "ELF"
            });
            pausedException.Result.TransactionResult.Error.ShouldContain("Mint is paused");
        }

        [Fact]
        public async Task AccrueInterestTest()
        {   
            await Initialize();
            await SupportMarket();
            await Mint(100000000000, "ELF");
            await EnterMarket();
            await Borrow("ELF",10000000000);
            var before= await FinanceContractStub.GetTotalBorrows.SendAsync(new StringValue()
            {
               Value = "ELF",
            });
            
            await FinanceContractStub.AccrueInterest.SendAsync(new StringValue()
            {
                Value = "ELF"
            });
            var after= await FinanceContractStub.GetTotalBorrows.SendAsync(new StringValue()
            {
                Value = "ELF",
            });
            before.Output.Value.ShouldNotBe(after.Output.Value);
        }
        [Fact]
        public async Task EnterAndExitMarketTest()
        {
            await Initialize();
            await SupportMarket();
            await Mint(10000000, "ELF");
            var enterMarketsResult = await UserTomStub.EnterMarkets.SendAsync(new EnterMarketsInput()
            {
                Symbols = {"TEST", "ELF","DAI"}
            });
            enterMarketsResult.Output.Results.First().Success.ShouldBe(true);
            enterMarketsResult.Output.Results.Reverse().First().Success.ShouldBe(false);
            var isMember = await UserTomStub.CheckMembership.CallAsync(new Account()
            {
                Address = UserTomAddress,
                Symbol = "ELF"
            });
            isMember.Value.ShouldBe(true);
            //ExitMarket
            await Borrow("ELF", 1000);
            var nonzeroException = await UserTomStub.ExitMarket.SendWithExceptionAsync(new StringValue()
            {
                Value = "ELF"
            });
            nonzeroException.TransactionResult.Error.ShouldContain("NONZERO_BORROW_BALANCE");
            await Repay("ELF", -1);
            await UserTomStub.ExitMarket.SendAsync(new StringValue()
            {
                Value = "ELF"
            });
            var isMemberAfterExit = await UserTomStub.CheckMembership.CallAsync(new Account()
            {
                Address = UserTomAddress,
                Symbol = "ELF"
            });
            isMemberAfterExit.Value.ShouldBe(false);
        }

        [Fact]
        public async Task LiquidateBorrowTest()
        {
            await Initialize();
            await SupportMarket();
            await Mint(1000000, "ELF");
            await EnterMarket();
            await UserLilyStub.Mint.SendAsync(new MintInput()
            {
                Symbol = "TEST",
                Amount = 1000000
            });
            await UserLilyStub.EnterMarkets.SendAsync(new EnterMarketsInput()
            {
                Symbols = {"TEST"}
            });
            await UserTomStub.Borrow.SendAsync(new BorrowInput()
            {
                Symbol = "TEST",
                Amount = 500000
            });
            var balance = await UserTomStub.GetBorrowBalanceStored.SendAsync(new Account()
            {
                Address = UserTomAddress,
                Symbol = "TEST"
            });
            balance.Output.Value.ShouldBe(500000);
            //shortfall<=0 INSUFFICIENT_SHORTFALL Exception
            var shortfallException = await UserLilyStub.LiquidateBorrow.SendWithExceptionAsync(
                new LiquidateBorrowInput()
                {
                    Borrower = UserTomAddress,
                    BorrowSymbol = "TEST",
                    CollateralSymbol = "ELF",
                });
            shortfallException.TransactionResult.Error.ShouldContain("INSUFFICIENT_SHORTFALL");
            //set test price arise to cause LiquidateBorrow
            await FinanceContractStub.SetUnderlyingPrice.SendAsync(new SetUnderlyingPriceInput()
            {
                Price = "3",
                Symbol = "TEST"
            });
            //TOO_MUCH_REPAY  Exception
            var  tooMuchRepayException= await UserLilyStub.LiquidateBorrow.SendWithExceptionAsync(new LiquidateBorrowInput()
            {
                Borrower = UserTomAddress,
                BorrowSymbol = "TEST",
                CollateralSymbol = "ELF",
                RepayAmount = 100000
            });
            tooMuchRepayException.TransactionResult.Error.ShouldContain("TOO_MUCH_REPAY");
            //LIQUIDATE_LIQUIDATOR_IS_BORROWER
            var  liquidatorException= await UserTomStub.LiquidateBorrow.SendWithExceptionAsync(new LiquidateBorrowInput()
            {
                Borrower = UserTomAddress,
                BorrowSymbol = "TEST",
                CollateralSymbol = "ELF",
                RepayAmount = 10000
            });
            liquidatorException.TransactionResult.Error.ShouldContain("LIQUIDATE_LIQUIDATOR_IS_BORROWER");
            //INVALID_CLOSE_AMOUNT_REQUESTED
            var  invalidRepayException= await UserLilyStub.LiquidateBorrow.SendWithExceptionAsync(new LiquidateBorrowInput()
            {
                Borrower = UserTomAddress,
                BorrowSymbol = "TEST",
                CollateralSymbol = "ELF",
                RepayAmount = -1
            });
            invalidRepayException.TransactionResult.Error.ShouldContain("INVALID_CLOSE_AMOUNT_REQUESTED");
            //LIQUIDATE_SEIZE_TOO_MUCH
            await UserTomStub.Mint.SendAsync(new MintInput()
            {
                Amount = 100,
                Symbol = "DAI"
            });
            await UserTomStub.EnterMarkets.SendAsync(new EnterMarketsInput()
            {
                Symbols = {"DAI"}
            });
            var  seizeException= await UserLilyStub.LiquidateBorrow.SendWithExceptionAsync(new LiquidateBorrowInput()
            {
                Borrower = UserTomAddress,
                BorrowSymbol = "TEST",
                CollateralSymbol = "DAI",
                RepayAmount = 10000
            });
            seizeException.TransactionResult.Error.ShouldContain("LIQUIDATE_SEIZE_TOO_MUCH");
            //SUCCESS
            var lilyBalanceBefore= UserLilyStub.GetBalance.CallAsync(new Account()
            {
                Address = UserLilyAddress,
                Symbol = "ELF"
            });
            lilyBalanceBefore.Result.Value.ShouldBe(0);
            var seizeTokens=  await UserLilyStub.LiquidateCalculateSeizeTokens.SendAsync(new LiquidateCalculateSeizeTokensInput()
            {
                BorrowSymbol = "TEST",
                CollateralSymbol = "ELF",
                RepayAmount = "10000"
            });
            await UserLilyStub.LiquidateBorrow.SendAsync(new LiquidateBorrowInput()
            {
                Borrower = UserTomAddress,
                BorrowSymbol = "TEST",
                CollateralSymbol = "ELF",
                RepayAmount = 10000
            });
           var lilyBalanceAfter= UserLilyStub.GetBalance.CallAsync(new Account()
            {
                Address = UserLilyAddress,
                Symbol = "ELF"
            });
           lilyBalanceAfter.Result.Value.ShouldBe(seizeTokens.Output.Value);
        }
        
        private async Task Initialize()
        {
            await FinanceContractStub.Initialize.SendAsync(new InitializeInput()
            {
                CloseFactor = "0.1",
                LiquidationIncentive = "1.1",
                MaxAssets = 5
            });
           await  CreateToken();
        }

       
        private async Task SupportMarket()
        {
            //support ELF and TEST and DAI
            await FinanceContractStub.SupportMarket.SendAsync(new SupportMarketInput()
            {
                Symbol = "ELF",
                ReserveFactor = "0.1",
                InitialExchangeRate = "0.02",
                MultiplierPerBlock = "0.00000000158549",
                BaseRatePerBlock = "0.000000000317098",
            });
            await FinanceContractStub.SupportMarket.SendAsync(new SupportMarketInput()
            {
                ReserveFactor = "0.1",
                InitialExchangeRate = "0.02",
                MultiplierPerBlock = "0.00000000158549",
                BaseRatePerBlock = "0.000000000317098",
                Symbol = "TEST"
            });
            await FinanceContractStub.SupportMarket.SendAsync(new SupportMarketInput()
            {
                ReserveFactor = "0.1",
                InitialExchangeRate = "0.02",
                MultiplierPerBlock = "0.00000000158549",
                BaseRatePerBlock = "0.000000000317098",
                Symbol = "DAI"
            });
            await FinanceContractStub.SetUnderlyingPrice.SendAsync(new SetUnderlyingPriceInput()
            {
                Price = "1",
                Symbol = "ELF"
            });
            await FinanceContractStub.SetUnderlyingPrice.SendAsync(new SetUnderlyingPriceInput()
            {
                Price = "1",
                Symbol = "TEST"
            });
            await FinanceContractStub.SetUnderlyingPrice.SendAsync(new SetUnderlyingPriceInput()
            {
                Price = "1",
                Symbol = "DAI"
            });
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
                Spender = FinanceContractAddress,
                Symbol = "ELF"
            });
            await UserTomTokenContractStub.Approve.SendAsync(new ApproveInput()
            {
                Amount = 100000000000,
                Spender = FinanceContractAddress,
                Symbol = "DAI"
            });
            await TokenContractStub.Approve.SendAsync(new ApproveInput()
            {
                Amount = 100000000000,
                Spender = FinanceContractAddress,
                Symbol = "ELF"
            });
            await UserLilyTokenContractStub.Approve.SendAsync(new ApproveInput()
            {
                Amount = 100000000000,
                Spender = FinanceContractAddress,
                Symbol = "ELF"
            });
            await UserTomTokenContractStub.Approve.SendAsync(new ApproveInput()
            {
                Amount = 100000000000,
                Spender = FinanceContractAddress,
                Symbol = "TEST"
            });
            await TokenContractStub.Approve.SendAsync(new ApproveInput()
            {
                Amount = 100000000000,
                Spender = FinanceContractAddress,
                Symbol = "TEST"
            });
            await UserLilyTokenContractStub.Approve.SendAsync(new ApproveInput()
            {
                Amount = 100000000000,
                Spender = FinanceContractAddress,
                Symbol = "TEST"
            });
        }

        private async Task EnterMarket()
        {
            await UserTomStub.EnterMarkets.SendAsync(new EnterMarketsInput()
            {
                Symbols = {"ELF"}
            });
        }

        private async Task Mint(long amount, string symbol)
        {
            await UserTomStub.Mint.SendAsync(new MintInput()
            {
                Amount = amount, Symbol = symbol
            });
        }

        private async Task Borrow(string symbol, long amount)
        {
            await UserTomStub.Borrow.SendAsync(new BorrowInput()
            {
                Symbol = symbol,
                Amount = amount
            });
        }
        private async Task Repay(string symbol, long amount)
        {
            await UserTomStub.RepayBorrow.SendAsync(new RepayBorrowInput()
            {
                Symbol = symbol,
                Amount = amount
            });
        }
        private async Task SetUnderlyingPrice(string symbol, string price)
        {
            await FinanceContractStub.SetUnderlyingPrice.SendAsync(new SetUnderlyingPriceInput()
            {
                Price = price,
                Symbol = symbol
            });
        }

        private async Task CreateToken()
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
                Symbol ="TEST",
                To = AdminAddress
            });
            issueResult.TransactionResult.Status.ShouldBe(TransactionResultStatus.Mined);
            var balance =await TokenContractStub.GetBalance.SendAsync(new GetBalanceInput()
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
                Decimals = 8,
                IsBurnable = true,
                TokenName = "DAI symbol",
                TotalSupply = 100000000_00000000
            });

            result2.TransactionResult.Status.ShouldBe(TransactionResultStatus.Mined);

            var issueResult2 = await TokenContractStub.Issue.SendAsync(new IssueInput
            {
                Amount = 100000000000000,
                Symbol ="DAI",
                To = AdminAddress
            });
            issueResult2.TransactionResult.Status.ShouldBe(TransactionResultStatus.Mined);
            var balance2 =await TokenContractStub.GetBalance.SendAsync(new GetBalanceInput()
            {
                Owner = AdminAddress,
                Symbol = "DAI"
            });
            balance2.Output.Balance.ShouldBe(100000000000000);
        }
    }
}