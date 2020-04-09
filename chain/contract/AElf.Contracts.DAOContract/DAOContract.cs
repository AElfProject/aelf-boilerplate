using System.Linq;
using Acs3;
using AElf.Contracts.Association;
using AElf.Contracts.Consensus.AEDPoS;
using AElf.Sdk.CSharp;
using AElf.Types;
using Google.Protobuf;
using Google.Protobuf.WellKnownTypes;

namespace AElf.Contracts.DAOContract
{
    // ReSharper disable once InconsistentNaming
    public partial class DAOContract : DAOContractContainer.DAOContractBase
    {
        public override Empty Initialize(InitializeInput input)
        {
            State.AssociationContract.Value =
                Context.GetContractAddressByName(SmartContractConstants.AssociationContractSystemName);
            State.ConsensusContract.Value =
                Context.GetContractAddressByName(SmartContractConstants.ConsensusContractSystemName);
            State.ParliamentContract.Value =
                Context.GetContractAddressByName(SmartContractConstants.ParliamentContractSystemName);
            State.TokenContract.Value =
                Context.GetContractAddressByName(SmartContractConstants.TokenContractSystemName);

            // Create Decentralized Autonomous Organization via Association Contract.
            var minerList = State.ConsensusContract.GetMinerList.Call(new GetMinerListInput {TermNumber = 1});
            var members = minerList.Pubkeys.Select(p =>
                Address.FromPublicKey(ByteArrayHelper.HexStringToByteArray(p.ToHex()))).ToList();
            members.Add(Context.Self);
            var createOrganizationInput = new CreateOrganizationInput
            {
                OrganizationMemberList = new OrganizationMemberList
                {
                    OrganizationMembers =
                    {
                        members
                    }
                },
                ProposalReleaseThreshold = new ProposalReleaseThreshold
                {
                    MinimalApprovalThreshold = 1, MinimalVoteThreshold = 1
                },
                ProposerWhiteList = new ProposerWhiteList
                {
                    Proposers = {Context.Self}
                }
            };
            State.AssociationContract.CreateOrganization.Send(createOrganizationInput);
            // Record DAO Address and initial member list.
            State.OrganizationAddress.Value =
                State.AssociationContract.CalculateOrganizationAddress.Call(createOrganizationInput);
            State.DAOMemberList.Value = new MemberList
            {
                Value = {members}
            };

            State.DepositSymbol.Value = Context.Variables.NativeSymbol;
            State.DepositAmount.Value = input.DepositAmount;

            return new Empty();
        }

        public override Empty ReleaseProposal(Hash input)
        {
            State.ParliamentContract.Release.Send(input);
            return new Empty();
        }

        public override Empty ProposeProjectToDAO(ProposeProjectInput input)
        {
            SelfProposalProcess(nameof(AddInvestmentProject), new InvestmentProject
            {
                PullRequestUrl = input.PullRequestUrl,
                CommitId = input.CommitId,
                PreAuditionHash = input.PreAuditionHash ?? Hash.Empty,
                Status = InvestmentProjectStatus.IssuedByDevelopers
            }.ToByteString());
            return new Empty();
        }

        public override Empty ProposeProjectToParliament(ProposeProjectWithBudgetsInput input)
        {
            SelfProposalProcess(nameof(UpdateInvestmentProject), new InvestmentProject
            {
                PullRequestUrl = input.PullRequestUrl,
                CommitId = input.CommitId,
                Status = InvestmentProjectStatus.IssuedByDevelopers
            }.ToByteString());
            return new Empty();
        }

        public override Empty ProposeDeliver(ProposeAuditionInput input)
        {
            SelfProposalProcess(nameof(UpdateInvestmentProject), new InvestmentProject
            {
                PullRequestUrl = input.PullRequestUrl,
                CommitId = input.CommitId,
                Status = InvestmentProjectStatus.Finished
            }.ToByteString());
            return new Empty();
        }

        public override Empty ProposeRewardProject(ProposeProjectInput input)
        {
            SelfProposalProcess(nameof(AddRewardProject), new RewardProject
            {
                PullRequestUrl = input.PullRequestUrl,
                CommitId = input.CommitId,
                Status = RewardProjectStatus.ProposedByDaoMember
            }.ToByteString());
            return new Empty();
        }

        public override Empty ProposeIssueRewardProject(ProposeIssueRewardProjectInput input)
        {
            SelfProposalProcess(nameof(UpdateRewardProject), new RewardProject
            {
                PullRequestUrl = input.PullRequestUrl,
                CommitId = input.CommitId,
                Status = RewardProjectStatus.ApprovedByParliamentWithBudgets
            }.ToByteString());
            return new Empty();
        }

        public override Empty ProposeTakeOverRewardProject(ProposeTakeOverRewardProjectInput input)
        {
            SelfProposalProcess(nameof(UpdateRewardProject), new RewardProject
            {
                PullRequestUrl = input.PullRequestUrl,
                CommitId = input.CommitId,
                Status = RewardProjectStatus.TakenOverByDevelopers
            }.ToByteString());
            return new Empty();
        }

        public override Empty ProposeDevelopersAudition(ProposeAuditionInput input)
        {
            // TODO: Use new states to record audition result.
            return new Empty();
        }
    }
}