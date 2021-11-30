using System.Linq;
using System.Threading.Tasks;
using AElf.ContractTestBase.ContractTestKit;
using AElf.Types;
using Google.Protobuf;
using Google.Protobuf.WellKnownTypes;
using Shouldly;
using Xunit;

namespace AElf.Contracts.BigIntValueDemoContract
{
    public class BigIntValueDemoContractTests : BigIntValueDemoContractTestBase
    {
        [Fact]
        public async Task Test()
        {
            var keyPair = SampleAccount.Accounts.First().KeyPair;
            var stub = GetBigIntValueDemoContractStub(keyPair);

            // Calculate (1 + 100000000000000000000000000000) * 100 / 2
            var buf = await stub.Add.CallAsync(new Input
            {
                BigIntValue1 = 1,
                BigIntValue2 = "100000000000000000000000000000"
            });
            buf = await stub.Mul.CallAsync(new Input
            {
                BigIntValue1 = buf,
                BigIntValue2 = 100
            });
            buf = await stub.Div.CallAsync(new Input
            {
                BigIntValue1 = buf,
                BigIntValue2 = 2
            });
            buf.Value.ShouldBe("5000000000000000000000000000050");
            
            var result = await stub.Div.CallWithExceptionAsync(new Input
            {
                BigIntValue1 = buf,
                BigIntValue2 = "2.1"
            });
            result.Value.ShouldContain("Incorrect arguments.");
        }
    }
}