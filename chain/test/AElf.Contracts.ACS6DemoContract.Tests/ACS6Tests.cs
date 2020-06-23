using System.Linq;
using System.Threading.Tasks;
using AElf.ContractTestKit;
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

            var secret = HashHelper.ComputeFrom("Test");
            var commitment = HashHelper.ComputeFrom(secret);

            await acs6DemoContractStub.RequestRandomNumber.SendAsync(commitment);

            var wrongCommitment = HashHelper.ComputeFrom("Wrong");
            var errorMessage = await acs6DemoContractStub.GetRandomNumber.CallWithExceptionAsync(wrongCommitment);
            errorMessage.Value.ShouldContain("Incorrect commitment.");

            var randomHash = await acs6DemoContractStub.GetRandomNumber.CallAsync(secret);
            randomHash.ShouldNotBeNull();
        }
    }
}