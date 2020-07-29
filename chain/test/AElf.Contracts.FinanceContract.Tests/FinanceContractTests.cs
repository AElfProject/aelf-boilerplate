using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using AElf.ContractTestKit;
using AElf.Types;
using Google.Protobuf;
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
            // Get a stub for testing.
            var keyPair = SampleAccount.Accounts.First().KeyPair;
            var stub = GetFinanceContractStub(keyPair);
           await stub.Initialize.SendAsync(new InitializeInput()
            {
                CloseFactor = "0.1",
                LiquidationIncentive = "0.1",
                MaxAssets = 5
            });
           var result= await stub.GetCloseFactor.SendAsync(new Empty());
           result.Output.Value.ShouldBe("0.1");

           await  stub.SupportMarket.SendAsync(new SupportMarketInput()
           {
               BaseRatePerBlock = "0.0001",
               InitialExchangeRate = "1.1",
               MultiplierPerBlock = "0.0001",
               ReserveFactor = "0.0001",
               Symbol = "Elf"
           });
          await stub.Mint.SendAsync(new MintInput()
           {
               Amount = 500, Symbol = "Elf"
           });
        var snapshotOutput=  await stub.GetAccountSnapshot.CallAsync(new Account()
           {
               Address = financeContractAddress,
               Symbol = "Elf"
           });
        snapshotOutput.CTokenBalance.ShouldBeNull();
        }
    }
}