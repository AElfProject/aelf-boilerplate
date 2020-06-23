using System.Linq;
using System.Threading.Tasks;
using Acs1;
using AElf.ContractTestKit;
using AElf.Types;
using Google.Protobuf.WellKnownTypes;
using Shouldly;
using Xunit;

namespace AElf.Contracts.ACS8DemoContract
{
    public class ACS8Tests : ACS8DemoContractTestBase
    {
        [Fact]
        public async Task Test()
        {
            var keyPair = SampleAccount.Accounts.First().KeyPair;
            var address = Address.FromPublicKey(keyPair.PublicKey);
            var acs8DemoContractStub = GetACS8DemoContractStub(keyPair);
            
            
        }
    }
}