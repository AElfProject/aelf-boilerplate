using System.Linq;
using System.Threading.Tasks;
using Acs1;
using AElf.Contracts.TestKit;
using AElf.Types;
using Google.Protobuf.WellKnownTypes;
using Shouldly;
using Xunit;

namespace AElf.Contracts.ACS5DemoContract
{
    public class ACS5Test : ACS5DemoContractTestBase
    {
        [Fact]
        public async Task Test()
        {
            var keyPair = SampleECKeyPairs.KeyPairs[0];
            var address = Address.FromPublicKey(keyPair.PublicKey);
            var acs5DemoContractStub = GetACS5DemoContractStub(keyPair);
            
            
        }
    }
}