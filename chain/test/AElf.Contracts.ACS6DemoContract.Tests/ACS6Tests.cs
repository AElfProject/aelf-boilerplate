using System.Linq;
using System.Threading.Tasks;
using AElf.ContractTestBase.ContractTestKit;
using AElf.Types;
using Shouldly;
using Xunit;

namespace AElf.Contracts.ACS6DemoContract
{
    public class ACS6Tests : ACS6DemoContractTestBase
    {
        [Fact]
        public async Task Test()
        {
            var keyPair = SampleAccount.Accounts.First().KeyPair;
            var acs6DemoContractStub = GetACS6DemoContractStub(keyPair);
        }
    }
}