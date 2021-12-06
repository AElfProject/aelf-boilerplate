using System.Linq;
using System.Threading.Tasks;
using AElf.ContractTestBase.ContractTestKit;
using AElf.Types;
using Shouldly;
using Xunit;

namespace AElf.Contracts.BigIntValueDemoContract
{
    public class BigIntValueDemoContractTests : BigIntValueDemoContractTestBase
    {
        [Fact]
        public async Task Test()
        {
            var foo = Address.FromPublicKey(ByteArrayHelper.HexStringToByteArray(
                "042911841a4dbc579baa1b33796bd2543942bff845c516c0fa644ebdaeb15c367c94ee838b47d52bc51070dbbddad80a8026ac0a84c22f942733612f1845c14b23"));
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

            var compare = await stub.IsGreaterThan.CallAsync(new Input
            {
                BigIntValue1 = "100",
                BigIntValue2 = "99"
            });
            compare.Value.ShouldBeTrue();
        }
    }
}