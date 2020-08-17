using System;
using System.Linq;
using System.Threading.Tasks;
using AElf.ContractTestBase.ContractTestKit;
using AElf.Contracts.MultiToken;
using AElf.CSharp.Core;
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
            //Invalid CloseFactor
            var closeFactorMinException = await FinanceContractStub.Initialize.SendWithExceptionAsync(new InitializeInput()
            {
                CloseFactor = "0.01",
                LiquidationIncentive = "1.1",
                MaxAssets = 5
            });
            closeFactorMinException.TransactionResult.Error.ShouldContain("Invalid CloseFactor");
            var closeFactorMaxException = await FinanceContractStub.Initialize.SendWithExceptionAsync(new InitializeInput()
            {
                CloseFactor = "1.0",
                LiquidationIncentive = "1.1",
                MaxAssets = 5
            });
            closeFactorMaxException.TransactionResult.Error.ShouldContain("Invalid CloseFactor");
            //Invalid LiquidationIncentive
            var liquidationIncentiveMinException = await FinanceContractStub.Initialize.SendWithExceptionAsync(
                new InitializeInput()
                {
                    CloseFactor = "0.1",
                    LiquidationIncentive = "0.5",
                    MaxAssets = 5
                });
            liquidationIncentiveMinException.TransactionResult.Error.ShouldContain("Invalid LiquidationIncentive");
            var liquidationIncentiveMaxException = await FinanceContractStub.Initialize.SendWithExceptionAsync(
                new InitializeInput()
                {
                    CloseFactor = "0.1",
                    LiquidationIncentive = "2.0",
                    MaxAssets = 5
                });
            liquidationIncentiveMaxException.TransactionResult.Error.ShouldContain("Invalid LiquidationIncentive");
            //MaxAssets must greater than 0
            var maxAssetsException = await FinanceContractStub.Initialize.SendWithExceptionAsync(new InitializeInput()
            {
                CloseFactor = "0.1",
                LiquidationIncentive = "1.1",
                MaxAssets = 0
            });
            maxAssetsException.TransactionResult.Error.ShouldContain("MaxAssets must greater than 0");
             //Only admin may initialize the market
             var adminException = await UserTomStub.Initialize.SendWithExceptionAsync(new InitializeInput()
             {
                 CloseFactor = "0.1",
                 LiquidationIncentive = "1.1",
                 MaxAssets = 5
             });
             adminException.TransactionResult.Error.ShouldContain("Only Admin may initialize the market");
            //Success
            await FinanceContractStub.Initialize.SendAsync(new InitializeInput()
            {
                CloseFactor = "0.1",
                LiquidationIncentive = "1.1",
                MaxAssets = 5
            });
            var closeFactor = await FinanceContractStub.GetCloseFactor.CallAsync(new Empty());
            closeFactor.Value.ShouldBe("0.1");
            var liquidationIncentive = await FinanceContractStub.GetLiquidationIncentive.CallAsync(new Empty());
            liquidationIncentive.Value.ShouldBe("1.1");
            var maxAssets = await FinanceContractStub.GetMaxAssets.CallAsync(new Empty());
            maxAssets.Value.ShouldBe(5);
            //
            var alreadyInitializedException= await FinanceContractStub.Initialize.SendWithExceptionAsync(new InitializeInput()
            {
                CloseFactor = "0.1",
                LiquidationIncentive = "1.1",
                MaxAssets = 5
            });
            alreadyInitializedException.TransactionResult.Error.ShouldContain("Already initialized");
        }

        [Fact]
        public async Task SupportMarketTest()
        {
            await Initialize();
            //Unauthorized
            var unauthorizedException = await UserTomStub.SupportMarket.SendWithExceptionAsync(new SupportMarketInput()
            {
                BaseRatePerBlock = "0.0001",
                InitialExchangeRate = "1.1",
                MultiplierPerBlock = "0.0001",
                ReserveFactor = "0.001",
                Symbol = "ELF"
            });
            unauthorizedException.TransactionResult.Error.ShouldContain("Unauthorized");
            //Invalid Symbol
            var symbolException = await FinanceContractStub.SupportMarket.SendWithExceptionAsync(new SupportMarketInput()
            {
                BaseRatePerBlock = "0.0001",
                InitialExchangeRate = "1.1",
                MultiplierPerBlock = "0.0001",
                ReserveFactor = "0.001",
                Symbol = "INVALID" //INVALID
            });
            symbolException.TransactionResult.Error.ShouldContain("Invalid Symbol");
            //Invalid ReserveFactor
            var reserveFactorException =await FinanceContractStub.SupportMarket.SendWithExceptionAsync(new SupportMarketInput()
            {
                BaseRatePerBlock = "0.0001",
                InitialExchangeRate = "1.1",
                MultiplierPerBlock = "0.0001",
                ReserveFactor = "2",
                Symbol = "ELF"
            });
            reserveFactorException.TransactionResult.Error.ShouldContain("Invalid ReserveFactor");
            var reserveFactorNegativeException =await FinanceContractStub.SupportMarket.SendWithExceptionAsync(new SupportMarketInput()
            {
                BaseRatePerBlock = "0.0001",
                InitialExchangeRate = "1.1",
                MultiplierPerBlock = "0.0001",
                ReserveFactor = "-1",
                Symbol = "ELF"
            });
            reserveFactorNegativeException.TransactionResult.Error.ShouldContain("Invalid ReserveFactor");
            //Invalid InitialExchangeRate
            var initialExchangeRateException =await FinanceContractStub.SupportMarket.SendWithExceptionAsync(new SupportMarketInput()
            {
                BaseRatePerBlock = "0.0001",
                InitialExchangeRate = "0",
                MultiplierPerBlock = "0.0001",
                ReserveFactor = "0.001",
                Symbol = "ELF"
            });
            initialExchangeRateException.TransactionResult.Error.ShouldContain("Invalid InitialExchangeRate");
            //Invalid MultiplierPerBlock
            var multiplierPerBlockException =await FinanceContractStub.SupportMarket.SendWithExceptionAsync(new SupportMarketInput()
            {
                BaseRatePerBlock = "0.0001",
                InitialExchangeRate = "1.1",
                MultiplierPerBlock = "-0.0001",
                ReserveFactor = "0.001",
                Symbol = "ELF"
            });
            multiplierPerBlockException.TransactionResult.Error.ShouldContain("Invalid MultiplierPerBlock");
            //Invalid BaseRatePerBlock
            var baseRatePerBlockException = await FinanceContractStub.SupportMarket.SendWithExceptionAsync(new SupportMarketInput()
            {
                BaseRatePerBlock = "-0.0001",
                InitialExchangeRate = "1.1",
                MultiplierPerBlock = "0.0001",
                ReserveFactor = "0.001",
                Symbol = "ELF"
            });
            baseRatePerBlockException.TransactionResult.Error.ShouldContain("Invalid BaseRatePerBlock");
            //success
            await FinanceContractStub.SupportMarket.SendAsync(new SupportMarketInput()
            {
                ReserveFactor = "0.1",
                InitialExchangeRate = "0.02",
                MultiplierPerBlock = "0.00000000158549",
                BaseRatePerBlock = "0.000000000317098",
                Symbol = "ELF"
            });
            var interestRate = await FinanceContractStub.GetInterestRate.CallAsync(new StringValue()
            {
                Value = "ELF"
            });
            interestRate.BaseRatePerBlock.ShouldBe("0.000000000317098");
            interestRate.MultiplierPerBlock.ShouldBe("0.00000000158549");
            var reserve = await FinanceContractStub.GetReserveFactor.CallAsync(new StringValue()
            {
                Value = "ELF"
            });
            reserve.Value.ShouldBe("0.1");
            //MARKET_EXISTS
            var exception = await FinanceContractStub.SupportMarket.SendWithExceptionAsync(new SupportMarketInput()
            {
                BaseRatePerBlock = "0.0000000001",
                InitialExchangeRate = "1.1",
                MultiplierPerBlock = "0.000000001",
                ReserveFactor = "0.00001",
                Symbol = "ELF"
            });
            exception.TransactionResult.Error.ShouldContain("Support market exists");
        }

        [Fact]
        public async Task MintTest()
        {
            await Initialize();
            await SupportMarket();
            //Mint is paused
            await FinanceContractStub.SetPauseGuardian.SendAsync(UserTomAddress);
            var pauseGuardian=await FinanceContractStub.GetPauseGuardian.CallAsync(new Empty());
            pauseGuardian.ShouldBe(UserTomAddress);
            await UserTomStub.SetMintPaused.SendAsync(new SetPausedInput()
            {
                State = true,
                Symbol = "ELF"
            });
            var mintPausedException=await UserTomStub.Mint.SendWithExceptionAsync(new MintInput()
            {
                Amount = 500, Symbol = "ELF"
            });
            mintPausedException.TransactionResult.Error.ShouldContain("Mint is paused");
            await FinanceContractStub.SetMintPaused.SendAsync(new SetPausedInput()
            {
                State = false,
                Symbol = "ELF"
            });
            //Market is not listed
            var listedException=await UserTomStub.Mint.SendWithExceptionAsync(new MintInput()
            {
                Amount = 500, Symbol = "UNLISTED"
            });
            listedException.TransactionResult.Error.ShouldContain("Market is not listed");
            //success
            await UserTomStub.Mint.SendAsync(new MintInput()
            {
                Amount = 500, Symbol = "ELF"
            });
            var snapshotOutputTom = await UserTomStub.GetAccountSnapshot.CallAsync(new Account()
            {
                Address = UserTomAddress,
                Symbol = "ELF"
            });
            var token=await UserTomStub.GetUnderlyingBalance.CallAsync(new Account()
            {
                Address = UserTomAddress,
                Symbol = "ELF"
            });
            var exchangeRate= await UserTomStub.GetExchangeRateStored.CallAsync(new StringValue()
            {
                Value = "ELF"
            });
            snapshotOutputTom.CTokenBalance.ShouldBe(decimal.ToInt64(token.Value/decimal.Parse(exchangeRate.Value)));
        }

        [Fact]
        public async Task BorrowTest()
        {
            await Initialize();
            await SupportMarket();
            await Mint(500, "ELF");
            await EnterMarket();
            //Success
            await UserTomStub.Borrow.SendAsync(new BorrowInput()
            {
                Symbol = "ELF",
                Amount = 10
            });
            var borrowBalance = await UserTomStub.GetBorrowBalanceStored.CallAsync(new Account()
            {
                Address = UserTomAddress,
                Symbol = "ELF"
            });
            borrowBalance.Value.ShouldBe(10);
            //Market is not listed
            var listedException = await UserTomStub.Borrow.SendWithExceptionAsync(new BorrowInput()
            {
                Symbol = "UNLISTED",
                Amount = 10
            });
            listedException.TransactionResult.Error.ShouldContain("Market is not listed");
            //Error price
            await SetUnderlyingPrice("ELF", "0");
            var priceException = await UserTomStub.Borrow.SendWithExceptionAsync(new BorrowInput()
            {
                Symbol = "ELF",
                Amount = 10
            });
            priceException.TransactionResult.Error.ShouldContain("Error Price");
            await SetUnderlyingPrice("ELF", "1");
            //Insufficient liquidity
            var insufficientException = await UserTomStub.Borrow.SendWithExceptionAsync(new BorrowInput()
            {
                Symbol = "ELF",
                Amount = 500
            });
            insufficientException.TransactionResult.Error.ShouldContain("Insufficient liquidity");
            //Borrow is paused
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
            pausedException.TransactionResult.Error.ShouldContain("Borrow is paused");
        }

        [Fact]
        public async Task RepayBorrowTest()
        {
            await Initialize();
            await SupportMarket();
            await Mint(5000000000, "ELF");
            await EnterMarket();
            await Borrow("ELF", 1000000000);
            //Market is not listed
            var listedException = await UserTomStub.RepayBorrow.SendWithExceptionAsync(new RepayBorrowInput()
            {
                Symbol = "UNLISTED",
                Amount = 10
            });
            listedException.TransactionResult.Error.ShouldContain("Market is not listed");
            //success
            var borrowBalanceBefore = await UserTomStub.GetBorrowBalanceStored.CallAsync(new Account()
            {
                Address = UserTomAddress,
                Symbol = "ELF"
            });
            borrowBalanceBefore.Value.ShouldBe(1000000000);
            await UserTomStub.RepayBorrow.SendAsync(new RepayBorrowInput()
            {
                Amount = -1,
                Symbol = "ELF"
            });
            var borrowBalanceAfter = await UserTomStub.GetBorrowBalanceStored.CallAsync(new Account()
            {
                Address = UserTomAddress,
                Symbol = "ELF"
            });
            borrowBalanceAfter.Value.ShouldBe(0);
        }

        [Fact]
        public async Task RepayBorrowBehalfTest()
        {
            await Initialize();
            await SupportMarket();
            await Mint(500, "ELF");
            await EnterMarket();
            await Borrow("ELF", 10);
            //Market is not listed
            var listedException = await UserTomStub.RepayBorrowBehalf.SendWithExceptionAsync(new RepayBorrowBehalfInput()
            {
                Symbol = "UNLISTED",
                Amount = -1,
                Borrower = UserTomAddress
            });
            listedException.TransactionResult.Error.ShouldContain("Market is not listed");
            //success
            var borrowBalanceBefore = await UserTomStub.GetBorrowBalanceStored.CallAsync(new Account()
            {
                Address = UserTomAddress,
                Symbol = "ELF"
            });
            borrowBalanceBefore.Value.ShouldBe(10);
            await UserLilyStub.RepayBorrowBehalf.SendAsync(new RepayBorrowBehalfInput()
            {
                Symbol = "ELF", Amount = -1, Borrower = UserTomAddress
            });
            var borrowBalanceAfter = await UserTomStub.GetBorrowBalanceStored.CallAsync(new Account()
            {
                Address = UserTomAddress,
                Symbol = "ELF"
            });
            borrowBalanceAfter.Value.ShouldBe(0);
        }

        [Fact]
        public async Task AddOrReduceReservesTest()
        {
            await Initialize();
            await SupportMarket();
            var totalReservesBefore = await FinanceContractStub.GetTotalReserves.CallAsync(new StringValue()
            {
                Value = "ELF"
            });
            totalReservesBefore.Value.ShouldBe(0);
            //AddReserves method
            await FinanceContractStub.AddReserves.SendAsync(new AddReservesInput()
            {
                Amount = 100,
                Symbol = "ELF"
            });
            var totalReservesAfter = await FinanceContractStub.GetTotalReserves.CallAsync(new StringValue()
            {
                Value = "ELF"
            });
            totalReservesAfter.Value.ShouldBe(100);
            //reduce
            //Token insufficient cash
            var cashException= await FinanceContractStub.ReduceReserves.SendWithExceptionAsync(new ReduceReservesInput()
            {
                Amount = 10000000000,
                Symbol = "ELF"
            });
            cashException.TransactionResult.Error.ShouldContain("Token insufficient cash");
            //Invalid reserves
            var validException= await FinanceContractStub.ReduceReserves.SendWithExceptionAsync(new ReduceReservesInput()
            {
                Amount = 100,
                Symbol = "ELF"
            });
            validException.TransactionResult.Error.ShouldContain("Invalid reserves");
             await FinanceContractStub.ReduceReserves.SendAsync(new ReduceReservesInput()
            {
                Amount = 50,
                Symbol = "ELF"
            });
             var totalReservesFinally = await FinanceContractStub.GetTotalReserves.CallAsync(new StringValue()
            {
                Value = "ELF"
            });
             totalReservesFinally.Value.ShouldBe(50);
        }

        [Fact]
        public async Task RedeemTest()
        {
            await Initialize();
            await SupportMarket();
            await Mint(500, "ELF");
            await Mint(500, "TEST");
            await EnterMarket();
            var balanceBefore = await UserTomStub.GetBalance.CallAsync(new Account()
            {
                Address = UserTomAddress,
                Symbol = "ELF"
            });
            var exchangeRate = await UserLilyStub.GetExchangeRateStored.CallAsync(new StringValue()
            {
                Value = "ELF"
            });
            balanceBefore.Value.ShouldBe(decimal.ToInt64(500/decimal.Parse(exchangeRate.Value)));
            //Market is not listed
            var listedException = await UserTomStub.Redeem.SendWithExceptionAsync(new RedeemInput()
            {
                Symbol = "UNLISTED",
                Amount = 100
            });
            listedException.TransactionResult.Error.ShouldContain("Market is not listed");
            //Insufficient Liquidity
            var liquidityException = await UserTomStub.Redeem.SendWithExceptionAsync(new RedeemInput()
            {
                Symbol = "ELF",
                Amount = balanceBefore.Value.Add(1000000)
            });
            liquidityException.TransactionResult.Error.ShouldContain("Insufficient Liquidity");
            //Insufficient Token Cash
            var cashException = await UserTomStub.Redeem.SendWithExceptionAsync(new RedeemInput()
            {
                Symbol = "ELF",
                Amount = balanceBefore.Value.Add(10000)
            });
            cashException.TransactionResult.Error.ShouldContain("Insufficient Token Cash");
            //Insufficient Token Balance
            await UserLilyStub.Mint.SendAsync(new MintInput()
            {
                Amount = 500,
                Symbol = "ELF"
            });
            var balanceException = await UserTomStub.Redeem.SendWithExceptionAsync(new RedeemInput()
            {
                Symbol = "ELF",
                Amount = balanceBefore.Value.Add(10000)
            });
            balanceException.TransactionResult.Error.ShouldContain("Insufficient Token Balance");
            //success
            await UserTomStub.Redeem.SendAsync(new RedeemInput()
            {
                Amount = balanceBefore.Value,
                Symbol = "ELF"
            });
            var balanceAfter = await UserTomStub.GetBalance.CallAsync(new Account()
            {
                Address = UserTomAddress,
                Symbol = "ELF"
            });
            balanceAfter.Value.ShouldBe(0);

        }
         
        [Fact]
        public async Task RedeemUnderlyingTest()
        {
            await Initialize();
            await SupportMarket();
            await Mint(500, "ELF");
            await EnterMarket();
            var balanceBefore = await UserTomStub.GetUnderlyingBalance.CallAsync(new Account()
            {
                Address = UserTomAddress,
                Symbol = "ELF"
            });
            balanceBefore.Value.ShouldBe(500);
            await UserTomStub.RedeemUnderlying.SendAsync(new RedeemUnderlyingInput()
            {
                Amount = balanceBefore.Value,
                Symbol = "ELF"
            });
            var balanceAfter = await UserTomStub.GetUnderlyingBalance.CallAsync(new Account()
            {
                Address = UserTomAddress,
                Symbol = "ELF"
            });
            balanceAfter.Value.ShouldBe(0);
        }

        [Fact]
        public async Task SetPendingAdminTest()
        {
            await Initialize();
            //Unauthorized
            var unauthorizedException=  await  UserTomStub.SetPendingAdmin.SendWithExceptionAsync(UserTomAddress);
            unauthorizedException.TransactionResult.Error.ShouldContain("Unauthorized");
            //SUCCESS
            await FinanceContractStub.SetPendingAdmin.SendAsync(UserTomAddress);
           var pendingAdmin= await FinanceContractStub.GetPendingAdmin.CallAsync(new Empty());
           pendingAdmin.ShouldBe(UserTomAddress);
        }

        [Fact]
        public async Task AcceptAdminTest()
        {
            await Initialize();
            var  unauthorizedException= await UserTomStub.AcceptAdmin.SendWithExceptionAsync(new Empty());
            unauthorizedException.TransactionResult.Error.ShouldContain("Unauthorized");
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
            var borrowRate=   await UserTomStub.GetBorrowRatePerBlock.CallAsync(new StringValue()
            {
               Value = "ELF"
            });
            borrowRate.Value.ShouldBe("0.000000000317098");
            var supplyRate= await UserTomStub.GetSupplyRatePerBlock.CallAsync(new StringValue()
            {
                Value = "ELF"
            });
            supplyRate.Value.ShouldBe("0.");
           var currentBorrowBalance= await UserTomStub.GetCurrentBorrowBalance.CallAsync(new Account()
            {
                Symbol = "ELF",
                Address = UserTomAddress
            });
           currentBorrowBalance.Value.ShouldBe(0);
           var totalBorrows= await UserTomStub.GetTotalBorrows.CallAsync(new StringValue()
            {
                Value = "ELF"
            });
           totalBorrows.Value.ShouldBe(0);
            var currentExchangeRate=await UserTomStub.GetCurrentExchangeRate.CallAsync(new StringValue()
            {
                Value = "ELF"
            });
            decimal.Parse(currentExchangeRate.Value).ShouldBeGreaterThan(0);
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
            //SetCloseFactor -Unauthorized
            var unauthorizedCloseFactorException = await UserTomStub.SetCloseFactor.SendWithExceptionAsync(
                new StringValue()
                {
                    Value = "1.2"
                });
            unauthorizedCloseFactorException.TransactionResult.Error.ShouldContain("Unauthorized");
            //SetCloseFactor -Invalid CloseFactor
            var factorMinException = await FinanceContractStub.SetCloseFactor.SendWithExceptionAsync(
                new StringValue()
                {
                    Value = "0.01"
                });
            factorMinException.TransactionResult.Error.ShouldContain("Invalid CloseFactor");
            var factorMaxException = await FinanceContractStub.SetCloseFactor.SendWithExceptionAsync(
                new StringValue()
                {
                    Value = "1"
                });
            factorMaxException.TransactionResult.Error.ShouldContain("Invalid CloseFactor");
            //SetCloseFactor -success
            await FinanceContractStub.SetCloseFactor.SendAsync(new StringValue()
            {
                Value = "0.1"
            });
            var closeFactor = await FinanceContractStub.GetCloseFactor.CallAsync(new Empty());
            closeFactor.Value.ShouldBe("0.1");
           
            //SetCollateralFactor  --Market is not listed
             var listedException= await FinanceContractStub.SetCollateralFactor.SendWithExceptionAsync(new SetCollateralFactorInput()
            {
                Symbol = "INVALID",
                CollateralFactor = "0.8"
            });
             listedException.TransactionResult.Error.ShouldContain("Market is not listed");
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
            //l -Unauthorized
            var unauthorizedLiquidationIncentiveException = await UserTomStub.SetLiquidationIncentive.SendWithExceptionAsync(
                new StringValue()
                {
                    Value = "1.2"
                });
            unauthorizedLiquidationIncentiveException.TransactionResult.Error.ShouldContain("Unauthorized");
            // SetLiquidationIncentive - Invalid LiquidationIncentive
            var invalidMinException = await FinanceContractStub.SetLiquidationIncentive.SendWithExceptionAsync(
                new StringValue()
                {
                    Value = "0.5"
                });
            invalidMinException.TransactionResult.Error.ShouldContain("Invalid LiquidationIncentive");
            var invalidMaxException = await FinanceContractStub.SetLiquidationIncentive.SendWithExceptionAsync(
                new StringValue()
                {
                    Value = "2.0"
                });
            invalidMaxException.TransactionResult.Error.ShouldContain("Invalid LiquidationIncentive");
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
            unauthorizedException.TransactionResult.Error.ShouldContain("Unauthorized");
            
            await FinanceContractStub.SetPauseGuardian.SendAsync(UserTomAddress);
            var pauseGuardian=await FinanceContractStub.GetPauseGuardian.CallAsync(new Empty());
            pauseGuardian.ShouldBe(UserTomAddress);
            var unauthorizedPausedException = await UserLilyStub.SetMintPaused.SendWithExceptionAsync(new SetPausedInput()
            {
                State = true,
                Symbol = "ELF"
            });
            unauthorizedPausedException.TransactionResult.Error.ShouldContain("Only pause guardian and admin can pause");
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
            //SetSeizePaused -Only pause guardian and admin can pause
            var pauseException = await UserLilyStub.SetSeizePaused.SendWithExceptionAsync(
                new SetPausedInput()
                {
                    State = true,
                    Symbol = "ELF"
                });
            pauseException.TransactionResult.Error.ShouldContain("Only pause guardian and admin can pause");
            //SetSeizePaused -success
            await FinanceContractStub.SetSeizePaused.SendAsync(new SetPausedInput()
            {
                State = true,
                Symbol = "ELF"
            });
            //SetSeizePaused -only admin can unpause
            var unpauseException=await UserTomStub.SetSeizePaused.SendWithExceptionAsync(new SetPausedInput()
            {
                State = false,
                Symbol = "ELF"
            });
            unpauseException.TransactionResult.Error.ShouldContain("Only admin can unpause");
        }

        [Fact]
        public async Task AccrueInterestTest()
        {
            const long mintAmount = 100000000000;
            const long borrowAmount = 10000000000;
            const long initTotalReserves = 0;
            await Initialize();
            await SupportMarket();
            await Mint(mintAmount, "ELF");
            await EnterMarket();
            await Borrow("ELF",borrowAmount);
            var before = await FinanceContractStub.GetTotalBorrows.CallAsync(new StringValue()
            {
               Value = "ELF",
            });
            //not listed
            var listedException=await FinanceContractStub.AccrueInterest.SendWithExceptionAsync(new StringValue()
            {
                Value = "UNLISTED"
            });
            listedException.TransactionResult.Error.ShouldContain("Market is not listed");
           
           
            //utilizationRate = totalBorrows/(totalCash + totalBorrows - totalReserves)
            var cash= await FinanceContractStub.GetCash.CallAsync(new StringValue()
            {
                Value = "ELF"
            });
           
            var utilizationRate = (Convert.ToDecimal(borrowAmount) / (cash.Value + borrowAmount - initTotalReserves)); 
            //borrowRate=utilizationRate * multiplierPerBlock + baseRatePerBlock
            var interestRate= FinanceContractStub.GetInterestRate.CallAsync(new StringValue()
            {
                Value = "ELF"
            });
            var borrowRate= await FinanceContractStub.GetBorrowRatePerBlock.CallAsync(new StringValue()
            {
                Value = "ELF"
            });
            var borrowRateExpect = decimal.Parse(interestRate.Result.MultiplierPerBlock) * utilizationRate +
                                   decimal.Parse(interestRate.Result.BaseRatePerBlock);
            borrowRate.Value.ShouldBe(borrowRateExpect.ToInvariantString());
            //simpleInterestFactor = borrowRate * blockDelta
            //blockDelta=   chainBestChainHeight- accrualBlockNumber;
            var accrualBlockNumber = await FinanceContractStub.GetAccrualBlockNumber.CallAsync(new StringValue()
            {
                Value = "ELF"
            });
            //GetTotalBorrows contain AccrueInterest
            var after= await FinanceContractStub.GetTotalBorrows.CallAsync(new StringValue()
            {
                Value = "ELF",
            });
            var chain=await blockChainService.GetChainAsync();
            var chainBestChainHeight = chain.BestChainHeight+1;
            var blockDelta = chainBestChainHeight - accrualBlockNumber.Value;
            var simpleInterestFactor = decimal.Parse(borrowRate.Value) * blockDelta;
            //interestAccumulated = simpleInterestFactor * totalBorrows
            var interestAccumulated =decimal.ToInt64(simpleInterestFactor * borrowAmount) ;
            after.Value.ShouldBe(interestAccumulated+borrowAmount);
        }
        [Fact]
        public async Task EnterAndExitMarketTest()
        {
            await Initialize();
            await SupportMarket();
            await Mint(10000000, "ELF");
            //Market is not listed
            var listedException=  await UserTomStub.EnterMarket.SendWithExceptionAsync(new EnterMarketInput()
            {
                Symbol = "INVALID"
            });
            listedException.TransactionResult.Error.ShouldContain("Market is not listed");
             await UserTomStub.EnterMarket.SendAsync(new EnterMarketInput()
            {
                Symbol = "ELF"
            });
             var isMember = await UserTomStub.CheckMembership.CallAsync(new Account()
            {
                Address = UserTomAddress,
                Symbol = "ELF"
            });
            isMember.Value.ShouldBe(true);
            //Too Many Assets
            await FinanceContractStub.SetMaxAssets.SendAsync(new Int32Value()
            {
                Value = 1
            });
            var assetsException=  await UserTomStub.EnterMarket.SendWithExceptionAsync(new EnterMarketInput()
            {
                Symbol = "TEST"
            });
            assetsException.TransactionResult.Error.ShouldContain("Too Many Assets");
            //ExitMarket
            await Borrow("ELF", 1000);
            var nonzeroException = await UserTomStub.ExitMarket.SendWithExceptionAsync(new StringValue()
            {
                Value = "ELF"
            });
            nonzeroException.TransactionResult.Error.ShouldContain("Nonzero borrow balance");
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
            await UserLilyStub.EnterMarket.SendAsync(new EnterMarketInput()
            {
                Symbol = "TEST"
            });
            await UserTomStub.Borrow.SendAsync(new BorrowInput()
            {
                Symbol = "TEST",
                Amount = 500000
            });
            var balance = await UserTomStub.GetBorrowBalanceStored.CallAsync(new Account()
            {
                Address = UserTomAddress,
                Symbol = "TEST"
            });
            balance.Value.ShouldBe(500000);
            //shortfall<=0 Insufficient shortfall Exception
            var shortfallException = await UserLilyStub.LiquidateBorrow.SendWithExceptionAsync(
                new LiquidateBorrowInput()
                {
                    Borrower = UserTomAddress,
                    BorrowSymbol = "TEST",
                    CollateralSymbol = "ELF",
                });
            shortfallException.TransactionResult.Error.ShouldContain("Insufficient shortfall");
            //set test price arise to cause LiquidateBorrow
            await FinanceContractStub.SetUnderlyingPrice.SendAsync(new SetUnderlyingPriceInput()
            {
                Price = "3",
                Symbol = "TEST"
            });
            //Too much repay  Exception
            var  tooMuchRepayException= await UserLilyStub.LiquidateBorrow.SendWithExceptionAsync(new LiquidateBorrowInput()
            {
                Borrower = UserTomAddress,
                BorrowSymbol = "TEST",
                CollateralSymbol = "ELF",
                RepayAmount = 100000
            });
            tooMuchRepayException.TransactionResult.Error.ShouldContain("Too much repay");
            //Liquidator is borrower
            var  liquidatorException= await UserTomStub.LiquidateBorrow.SendWithExceptionAsync(new LiquidateBorrowInput()
            {
                Borrower = UserTomAddress,
                BorrowSymbol = "TEST",
                CollateralSymbol = "ELF",
                RepayAmount = 10000
            });
            liquidatorException.TransactionResult.Error.ShouldContain("Liquidator is borrower");
            //Invalid close amount request
            var  invalidRepayZeroException= await UserLilyStub.LiquidateBorrow.SendWithExceptionAsync(new LiquidateBorrowInput()
            {
                Borrower = UserTomAddress,
                BorrowSymbol = "TEST",
                CollateralSymbol = "ELF",
                RepayAmount = 0
            });
            invalidRepayZeroException.TransactionResult.Error.ShouldContain("Invalid close amount request");
            var  invalidRepayException= await UserLilyStub.LiquidateBorrow.SendWithExceptionAsync(new LiquidateBorrowInput()
            {
                Borrower = UserTomAddress,
                BorrowSymbol = "TEST",
                CollateralSymbol = "ELF",
                RepayAmount = -1
            });
            invalidRepayException.TransactionResult.Error.ShouldContain("Invalid close amount request");
            //Liquidate size too much
            await UserTomStub.Mint.SendAsync(new MintInput()
            {
                Amount = 100,
                Symbol = "DAI"
            });
            await UserTomStub.EnterMarket.SendAsync(new EnterMarketInput()
            {
                Symbol = "DAI"
            });
            var  seizeException= await UserLilyStub.LiquidateBorrow.SendWithExceptionAsync(new LiquidateBorrowInput()
            {
                Borrower = UserTomAddress,
                BorrowSymbol = "TEST",
                CollateralSymbol = "DAI",
                RepayAmount = 10000
            });
            seizeException.TransactionResult.Error.ShouldContain("Liquidate size too much");
            //SUCCESS
            var lilyBalanceBefore= UserLilyStub.GetBalance.CallAsync(new Account()
            {
                Address = UserLilyAddress,
                Symbol = "ELF"
            });
            lilyBalanceBefore.Result.Value.ShouldBe(0);
            const string actualRepayAmount = "10000";
            var seizeTokens = await UserLilyStub.LiquidateCalculateSeizeTokens.CallAsync(
                new LiquidateCalculateSeizeTokensInput()
                {
                    BorrowSymbol = "TEST",
                    CollateralSymbol = "ELF",
                    RepayAmount = actualRepayAmount
                });
            //  seizeAmount = actualRepayAmount * liquidationIncentive * priceBorrowed / priceCollateral
            //  seizeTokens = seizeAmount / exchangeRate
            var exchangeRate = await UserLilyStub.GetExchangeRateStored.CallAsync(new StringValue()
            {
                Value = "ELF"
            });
            var liquidationIncentive = await UserTomStub.GetLiquidationIncentive.CallAsync(new Empty());
            var priceBorrowed = await UserTomStub.GetUnderlyingPrice.CallAsync(new StringValue()
            {
                Value = "TEST"
            });
            var priceCollateral = await UserTomStub.GetUnderlyingPrice.CallAsync(new StringValue()
            {
                Value = "ELF"
            });
            var seizeAmount = decimal.Parse(actualRepayAmount) * decimal.Parse(liquidationIncentive.Value) *
                decimal.Parse(priceBorrowed.Value) / decimal.Parse(priceCollateral.Value);
            var seizeTokensExpect = decimal.ToInt64(seizeAmount / decimal.Parse(exchangeRate.Value));

            seizeTokens.Value.ShouldBe(seizeTokensExpect);

            await UserLilyStub.LiquidateBorrow.SendAsync(new LiquidateBorrowInput()
            {
                Borrower = UserTomAddress,
                BorrowSymbol = "TEST",
                CollateralSymbol = "ELF",
                RepayAmount = 10000
            });
            var lilyBalanceAfter = UserLilyStub.GetBalance.CallAsync(new Account()
            {
                Address = UserLilyAddress,
                Symbol = "ELF"
            });
            lilyBalanceAfter.Result.Value.ShouldBe(seizeTokens.Value);
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
            await UserTomStub.EnterMarket.SendAsync(new EnterMarketInput()
            {
                Symbol= "ELF"
            });
            await UserTomStub.EnterMarket.SendAsync(new EnterMarketInput()
            {
                Symbol = "TEST"
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
                Decimals = 10,
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