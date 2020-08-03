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
            snapshotOutput.Output.CTokenBalance.ShouldBeGreaterThan(0);
            await UserTomStub.EnterMarkets.SendAsync(new EnterMarketsInput()
            {
                Symbols = {"ELF"}
            });
            var BorrowBalance = await UserTomStub.GetBorrowBalanceStored.SendAsync(new Account()
            {
                Address = UserTomAddress,
                Symbol = "ELF"
            });
            BorrowBalance.Output.Value.ShouldNotBeNull();
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
            var CloseFactor = await FinanceContractStub.GetCloseFactor.SendAsync(new Empty());
            CloseFactor.Output.Value.ShouldBe("0.1");
            var LiquidationIncentive = await FinanceContractStub.GetLiquidationIncentive.SendAsync(new Empty());
            LiquidationIncentive.Output.Value.ShouldBe("1.1");
            var MaxAssets = await FinanceContractStub.GetMaxAssets.SendAsync(new Empty());
            MaxAssets.Output.Value.ShouldBe(5);
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
            exception.TransactionResult.Error.Contains("MARKET_EXISTS").ShouldBe(true);
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
            snapshotOutputTom.Output.CTokenBalance.ShouldBeGreaterThan(0);
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
            var PriceException = await UserTomStub.Borrow.SendWithExceptionAsync(new BorrowInput()
            {
                Symbol = "ELF",
                Amount = 10
            });
            PriceException.TransactionResult.Error.Contains("PRICE_ERROR").ShouldBe(true);
            await SetUnderlyingPrice("ELF", "1");
            //INSUFFICIENT_LIQUIDITY
            var InsufficientException = await UserTomStub.Borrow.SendWithExceptionAsync(new BorrowInput()
            {
                Symbol = "ELF",
                Amount = 500
            });
            InsufficientException.TransactionResult.Error.Contains("INSUFFICIENT_LIQUIDITY").ShouldBe(true);
            //borrow is paused
            await FinanceContractStub.SetBorrowPaused.SendAsync(new SetPausedInput()
            {
                State = true,
                Symbol = "ELF"
            });
            var Exception = await UserTomStub.Borrow.SendWithExceptionAsync(new BorrowInput()
            {
                Symbol = "ELF",
                Amount = 10
            });
            Exception.TransactionResult.Error.Contains("borrow is paused").ShouldBe(true);
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
            balanceBefore.Output.Value.ShouldBeGreaterThan(0);
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
            var UnauthorizedException=  await  UserTomStub.SetPendingAdmin.SendWithExceptionAsync(UserTomAddress);
            UnauthorizedException.TransactionResult.Error.Contains("UNAUTHORIZED").ShouldBe(true);
            //SUCCESS
            await FinanceContractStub.SetPendingAdmin.SendAsync(UserTomAddress);
           var pendingAdmin= await FinanceContractStub.GetPendingAdmin.SendAsync(new Empty());
           pendingAdmin.Output.ShouldBe(UserTomAddress);
        }

        [Fact]
        public async Task AcceptAdminTest()
        {
            await Initialize();
            var  UnauthorizedException= await UserTomStub.AcceptAdmin.SendWithExceptionAsync(new Empty());
            UnauthorizedException.TransactionResult.Error.Contains("UNAUTHORIZED");
            await FinanceContractStub.SetPendingAdmin.SendAsync(UserTomAddress);
            await UserTomStub.AcceptAdmin.SendAsync(new Empty());
            var admin = await UserTomStub.GetAdmin.CallAsync(new Empty());
            admin.Value.ShouldBe(UserTomAddress.Value);
        }
        private async Task Initialize()
        {
            await FinanceContractStub.Initialize.SendAsync(new InitializeInput()
            {
                CloseFactor = "0.1",
                LiquidationIncentive = "1.1",
                MaxAssets = 5
            });
        }

       
        private async Task SupportMarket()
        {
            //support ELF and WRITE
            await FinanceContractStub.SupportMarket.SendAsync(new SupportMarketInput()
            {
                BaseRatePerBlock = "0.0000000001",
                InitialExchangeRate = "1.1",
                MultiplierPerBlock = "0.000000001",
                ReserveFactor = "0.001",
                Symbol = "ELF"
            });
            await FinanceContractStub.SupportMarket.SendAsync(new SupportMarketInput()
            {
                BaseRatePerBlock = "0.0000000001",
                InitialExchangeRate = "1.1",
                MultiplierPerBlock = "0.000000001",
                ReserveFactor = "0.001",
                Symbol = "WRITE"
            });
            await TokenContractStub.Transfer.SendAsync(new TransferInput()
            {
                Amount = 100000,
                Symbol = "ELF",
                Memo = "Recharge",
                To = UserTomAddress
            });
            await TokenContractStub.Transfer.SendAsync(new TransferInput()
            {
                Amount = 100000,
                Symbol = "ELF",
                Memo = "Recharge",
                To = UserLilyAddress
            });
            //authorize  Tom and Lily to transfer ELF and DAi to FinanceContract
            await UserTomTokenContractStub.Approve.SendAsync(new ApproveInput()
            {
                Amount = 100000,
                Spender = FinanceContractAddress,
                Symbol = "ELF"
            });
            await TokenContractStub.Approve.SendAsync(new ApproveInput()
            {
                Amount = 100000,
                Spender = FinanceContractAddress,
                Symbol = "ELF"
            });
            await UserLilyTokenContractStub.Approve.SendAsync(new ApproveInput()
            {
                Amount = 100000,
                Spender = FinanceContractAddress,
                Symbol = "ELF"
            });
            // await UserLilyTokenContractStub.Approve.SendAsync(new ApproveInput()
            // {
            //     Amount = 100000,
            //     Spender = FinanceContractAddress,
            //     Symbol = "READ"
            // });
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

        private async Task SetUnderlyingPrice(string symbol, string price)
        {
            await FinanceContractStub.SetUnderlyingPrice.SendAsync(new SetUnderlyingPriceInput()
            {
                Price = price,
                Symbol = symbol
            });
        }
    }
}