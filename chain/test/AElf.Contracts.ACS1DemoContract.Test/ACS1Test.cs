using System.Threading.Tasks;
using AElf.Contracts.TestKit;
using Google.Protobuf.WellKnownTypes;
using Shouldly;
using Xunit;

namespace AElf.Contracts.ACS1DemoContract
{
    public class ACS1Test : ACS1DemoContractTestBase
    {
        [Fact]
        public async Task Test()
        {
            var stub = GetACS1DemoContractStub(SampleECKeyPairs.KeyPairs[0]);
            var result = stub.GetMethodFee.CallAsync(new StringValue {Value = nameof(stub.GetMethodFee)});
        }
    }
}