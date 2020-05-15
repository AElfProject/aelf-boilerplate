using System.Linq;
using System.Threading.Tasks;
using Acs1;
using AElf.Contracts.TestKit;
using AElf.Types;
using Google.Protobuf.WellKnownTypes;
using Shouldly;
using Xunit;

namespace AElf.Contracts.ACS2DemoContract
{
    public class ACS2Test : ACS2DemoContractTestBase
    {
        [Fact]
        public async Task Test()
        {
            var keyPair = SampleECKeyPairs.KeyPairs[0];
            var address = Address.FromPublicKey(keyPair.PublicKey);
            var acs2DemoContractStub = GetACS2DemoContractStub(keyPair);
            
            
        }
    }
}