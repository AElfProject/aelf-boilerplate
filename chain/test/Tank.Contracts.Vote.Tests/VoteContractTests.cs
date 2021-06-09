using System.Linq;
using System.Threading.Tasks;
using AElf.ContractTestBase.ContractTestKit;
using AElf.CSharp.Core.Extension;
using AElf.Kernel;
using AElf.Types;
using Google.Protobuf;
using Google.Protobuf.WellKnownTypes;
using Shouldly;
using Xunit;

namespace Tank.Contracts.Vote
{
    public class VoteContractTests : VoteContractTestBase
    {
        private readonly Account _sponsorAccount = SampleAccount.Accounts.First();
        private VoteContractContainer.VoteContractStub VoteContractStub { get; set; }

        public VoteContractTests()
        {
            VoteContractStub = GetVoteContractStub(_sponsorAccount.KeyPair);
        }
        [Fact]
        public async Task InitializeTest()
        {
            var deadline = TimestampHelper.GetUtcNow().AddDays(10);
            await VoteContractStub.Initialize.SendAsync(new InitializeInput
            {
                Deadline = deadline,
                Sponsor = _sponsorAccount.Address,
                MaxReviewCount = 3
            });

            var deadlineFromState = await VoteContractStub.GetDeadline.CallAsync(new Empty());
            deadline.ShouldBe(deadlineFromState);

            var sponsor = await VoteContractStub.GetSponsor.CallAsync(new Empty());
            sponsor.ShouldBe(_sponsorAccount.Address);
        }
    }
}