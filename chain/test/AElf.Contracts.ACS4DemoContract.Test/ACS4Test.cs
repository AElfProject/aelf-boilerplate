using System.Linq;
using System.Threading.Tasks;
using AElf.Contracts.TestKit;
using AElf.Types;
using Google.Protobuf.WellKnownTypes;
using Shouldly;
using Xunit;

namespace AElf.Contracts.ACS4DemoContract
{
    public class ACS4Test : ACS4DemoContractTestBase
    {
        [Fact]
        public async Task Test()
        {
            var keyPair = SampleECKeyPairs.KeyPairs[0];
            var address = Address.FromPublicKey(keyPair.PublicKey);
            var acs4DemoContractStub = GetACS4DemoContractStub(keyPair);
            
            
        }
    }
}