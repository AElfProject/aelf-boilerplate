using System;
using System.Linq;
using System.Reflection;
using System.Runtime.Loader;
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
            var r = AppDomain.CurrentDomain.GetAssemblies().Select(a => a.FullName).ToList();
            var execAssembly = Assembly.GetExecutingAssembly();
            var result = await HelloWorldContractStub.Hello.CallAsync(new Empty());
            result.Value.ShouldBe("Hello world!");
        }
    }
}