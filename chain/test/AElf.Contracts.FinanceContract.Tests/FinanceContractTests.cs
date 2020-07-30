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
           var result= await FinanceContractStub.GetCloseFactor.SendAsync(new Empty());
           result.Output.Value.ShouldBe("0.1");
           
           await  FinanceContractStub.SupportMarket.SendAsync(new SupportMarketInput()
           {
               BaseRatePerBlock = "0.0001",
               InitialExchangeRate = "1.1",
               MultiplierPerBlock = "0.0001",
               ReserveFactor = "0.001",
               Symbol = "ELF"
           });
     
          await TokenContractStub.Transfer.SendAsync(new TransferInput()
           {
               Amount = 100000,
               Symbol = "ELF",
               Memo = "Recharge",
               To = UserAddress
           });
         var banlance= await TokenContractStub.GetBalance.SendAsync(new GetBalanceInput()
          {
              Owner = UserAddress,
              Symbol = "ELF"
          });
         banlance.Output.Balance.ShouldBe(100000);
         await UserTokenContractStub.Approve.SendAsync(new ApproveInput()
         {
             Amount = 100000,
             Spender = FinanceContractAddress,
             Symbol = "ELF"
         });
         await UserStub.Mint.SendAsync(new MintInput()
           {
               Amount = 500, Symbol = "ELF"
           });
         var snapshotOutput= await UserStub.GetAccountSnapshot.SendAsync(new Account()
           {
               Address = UserAddress,
               Symbol = "ELF"
           });
         snapshotOutput.Output.CTokenBalance.ShouldBeGreaterThan(0);
         await UserStub.EnterMarkets.SendAsync(new EnterMarketsInput()
         {
             Symbols = { "ELF"}
         });
           var BorrowBalance= await  UserStub.GetBorrowBalanceStored.SendAsync(new Account()
         {
             Address = UserAddress,
             Symbol = "ELF"
         });
        BorrowBalance.Output.Value.ShouldNotBeNull();
        }

        [Fact]
        public  async Task InitializeTest()
        {
            await FinanceContractStub.Initialize.SendAsync(new InitializeInput()
            {
                CloseFactor = "0.1",
                LiquidationIncentive = "1.1",
                MaxAssets = 5
            });
            var CloseFactor= await FinanceContractStub.GetCloseFactor.SendAsync(new Empty());
            CloseFactor.Output.Value.ShouldBe("0.1");
            var LiquidationIncentive= await FinanceContractStub.GetLiquidationIncentive.SendAsync(new Empty());
            LiquidationIncentive.Output.Value.ShouldBe("1.1");
            var MaxAssets= await FinanceContractStub.GetMaxAssets.SendAsync(new Empty());
            MaxAssets.Output.Value.ShouldBe(5);
        }
       [Fact]
        public async Task SupportMarketTest()
        {
            Initialize();
            //UNAUTHORIZED
            var result=  await  UserStub.SupportMarket.SendWithExceptionAsync(new SupportMarketInput()
            {
                BaseRatePerBlock = "0.0001",
                InitialExchangeRate = "1.1",
                MultiplierPerBlock = "0.0001",
                ReserveFactor = "0.001",
                Symbol = "ELF"
            });
            result.TransactionResult.Error.ShouldContain("UNAUTHORIZED");
            //success
           await  FinanceContractStub.SupportMarket.SendAsync(new SupportMarketInput()
            {
                BaseRatePerBlock = "0.0001",
                InitialExchangeRate = "1.1",
                MultiplierPerBlock = "0.0001",
                ReserveFactor = "0.001",
                Symbol = "ELF"
            });
           var interestRate= await FinanceContractStub.GetInterestRate.CallAsync(new StringValue()
           {
               Value = "ELF"
           });
           interestRate.BaseRatePerBlock.ShouldBe("0.0001");
           interestRate.MultiplierPerBlock.ShouldBe("0.0001");
          var reserve=await FinanceContractStub.GetReserveFactor.CallAsync(new StringValue()
           {
               Value = "ELF"
           });
          reserve.Value.ShouldBe("0.001");
           //MARKET_EXISTS
         var  exception=   await  FinanceContractStub.SupportMarket.SendWithExceptionAsync(new SupportMarketInput()
           {
               BaseRatePerBlock = "0.0001",
               InitialExchangeRate = "1.1",
               MultiplierPerBlock = "0.0001",
               ReserveFactor = "0.001",
               Symbol = "ELF"
           });
         exception.TransactionResult.Error.Contains("MARKET_EXISTS").ShouldBe(true);
        }
        private async void Initialize()
        {
            await FinanceContractStub.Initialize.SendAsync(new InitializeInput()
            {
                CloseFactor = "0.1",
                LiquidationIncentive = "1.1",
                MaxAssets = 5
            });
        }
    }
}