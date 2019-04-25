using System.Threading.Tasks;
using Google.Protobuf.WellKnownTypes;
using Shouldly;
using Xunit;

namespace HelloWorldContract.Test
{
    public class HelloWorldContractTest : HelloWorldContractTestBase
    {
        [Fact]
        public async Task HelloCall_ReturnsHelloWorldMessage()
        {
            var result = await HelloWorldContractStub.Hello.CallAsync(new Empty());
            result.Value.ShouldBe("Hello world!");
        }
    }
}