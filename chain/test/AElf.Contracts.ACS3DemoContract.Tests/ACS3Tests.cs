using System.Linq;
using System.Threading.Tasks;
using AElf.Standards.ACS3;
using AElf.Contracts.MultiToken;
using AElf.ContractTestBase.ContractTestKit;
using AElf.CSharp.Core.Extension;
using AElf.Kernel.Token;
using Google.Protobuf;
using Google.Protobuf.WellKnownTypes;
using Shouldly;
using Xunit;
using TimestampHelper = AElf.Kernel.TimestampHelper;

namespace AElf.Contracts.ACS3DemoContract
{
    public class ACS3Tests : ACS3DemoContractTestBase
    {
        [Fact]
        public async Task Test()
        {
            var keyPair = SampleAccount.Accounts.First().KeyPair;
            var acs3DemoContractStub =
                GetTester<ACS3DemoContractContainer.ACS3DemoContractStub>(DAppContractAddress, keyPair);

            var tokenContractStub =
                GetTester<TokenContractContainer.TokenContractStub>(
                    GetAddress(TokenSmartContractAddressNameProvider.StringName), keyPair);
            await tokenContractStub.Approve.SendAsync(new ApproveInput
            {
                Spender = DAppContractAddress,
                Symbol = "ELF",
                Amount = long.MaxValue
            });

            var proposalId = (await acs3DemoContractStub.CreateProposal.SendAsync(new CreateProposalInput
            {
                ContractMethodName = nameof(acs3DemoContractStub.SetSlogan),
                ToAddress = DAppContractAddress,
                ExpiredTime = TimestampHelper.GetUtcNow().AddHours(1),
                Params = new StringValue {Value = "AElf"}.ToByteString(),
                Token = HashHelper.ComputeFrom("AElf")
            })).Output;

            // Check slogan
            {
                var slogan = await acs3DemoContractStub.GetSlogan.CallAsync(new Empty());
                slogan.Value.ShouldBeEmpty();
            }

            await acs3DemoContractStub.Approve.SendAsync(proposalId);
            
            await acs3DemoContractStub.Release.SendAsync(proposalId);
            
            // Check slogan
            {
                var slogan = await acs3DemoContractStub.GetSlogan.CallAsync(new Empty());
                slogan.Value.ShouldBe("AElf");
            }
        }
    }
}