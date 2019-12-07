using System.Threading.Tasks;
using AElf.Types;
using Google.Protobuf;
using Google.Protobuf.WellKnownTypes;
using Shouldly;
using Xunit;

namespace AElf.Contracts.HelloWorldContract
{
    public class HelloWorldContractTest : HelloWorldContractTestBase
    {
        [Fact]
        public async Task HelloCall_ReturnsHelloWorldMessage()
        {
            var txResult = await HelloWorldContractStub.Hello.SendAsync(new Empty());
            txResult.TransactionResult.Status.ShouldBe(TransactionResultStatus.Mined);
            var text = new HelloReturn();
            text.MergeFrom(txResult.TransactionResult.ReturnValue);
            text.Value.ShouldBe("Hello World!");
        }
    }
}