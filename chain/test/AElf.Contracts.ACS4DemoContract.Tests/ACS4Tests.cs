using System.Linq;
using System.Threading.Tasks;
using AElf.ContractTestBase.ContractTestKit;
using AElf.Types;
using Xunit;

namespace AElf.Contracts.ACS4DemoContract
{
    public class ACS4Tests : ACS4DemoContractTestBase
    {
        [Fact]
        public async Task Test()
        {
            var keyPair = SampleAccount.Accounts.First().KeyPair;
            var address = Address.FromPublicKey(keyPair.PublicKey);
            var acs4DemoContractStub =
                GetTester<ACS4DemoContractContainer.ACS4DemoContractStub>(DAppContractAddress, keyPair);


        }
    }
}