using System.Linq;
using Acs3;
using AElf.Contracts.Association;
using AElf.Contracts.Consensus.AEDPoS;
using AElf.CSharp.Core;
using AElf.Sdk.CSharp;
using AElf.Types;
using Google.Protobuf;
using Google.Protobuf.WellKnownTypes;

namespace AElf.Contracts.DAOContract
{
    // ReSharper disable InconsistentNaming
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
            State.ProfitContract.Value = 
                Context.GetContractAddressByName(SmartContractConstants.ProfitContractSystemName);

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
            State.ApprovalThreshold.Value = 1;
            return new Empty();
        }

        public override Empty ReleaseProposal(Hash input)
        {
            var proposalInfo = State.AssociationContract.GetProposal.Call(input);
            AssertApprovalCountMeetThreshold(proposalInfo.ApprovalCount);
            State.AssociationContract.Release.Send(input);
            return new Empty();
        }

        /// <summary>
        /// Help developers to create a proposal for initializing an investment project.
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        public override Hash ProposeProjectToDAO(ProposeProjectInput input)
        {
            var projectInfo = new ProjectInfo
            {
                PullRequestUrl = input.PullRequestUrl,
                CommitId = input.CommitId,
                // Initial status of an investment project.
                Status = ProjectStatus.Proposed
            };
            var projectId = projectInfo.GetProjectId();
            Assert(State.Projects[projectId] == null, "Project already proposed successfully before.");
            var proposalId = SelfProposalProcess(nameof(AddInvestmentProject), projectInfo.ToByteString());
            State.PreviewProposalIds[projectId] = proposalId;
            return proposalId;
        }

        public override Empty ProposeProjectToParliament(ProposeProjectWithBudgetsInput input)
        {
            var projectInfo = new ProjectInfo
            {
                PullRequestUrl = input.PullRequestUrl,
                CommitId = input.CommitId,
                Status = ProjectStatus.Approved,
                BudgetPlans = {input.BudgetPlans}
            };
            var projectId = projectInfo.GetProjectId();
            Assert(State.Projects[projectId] != null, "Project not found.");
            SelfProposalProcess(nameof(UpdateInvestmentProject), projectInfo.ToByteString());
            return new Empty();
        }

        public override Empty ProposeDeliver(ProposeAuditionInput input)
        {
            var projectInfo = new ProjectInfo
            {
                PullRequestUrl = input.PullRequestUrl,
                CommitId = input.CommitId,
                Status = ProjectStatus.Delivered,
                CurrentBudgetPlanIndex = input.BudgetPlanIndex
            };
            var projectInfoInState = State.Projects[projectInfo.GetProjectId()];
            Assert(projectInfoInState.CurrentBudgetPlanIndex.Add(1) == projectInfo.CurrentBudgetPlanIndex,
                "Incorrect budget plan index.");
            SelfProposalProcess(nameof(UpdateInvestmentProject), projectInfo.ToByteString());
            return new Empty();
        }

        public override Hash ProposeRewardProject(ProposeProjectInput input)
        {
            var projectInfo = new ProjectInfo
            {
                PullRequestUrl = input.PullRequestUrl,
                CommitId = input.CommitId,
                // Initial status of an reward project.
                Status = ProjectStatus.Proposed
            };
            var projectId = projectInfo.GetProjectId();
            Assert(State.Projects[projectId] == null, "Project already proposed successfully before.");
            var proposalId = SelfProposalProcess(nameof(AddInvestmentProject), projectInfo.ToByteString());
            State.PreviewProposalIds[projectId] = proposalId;
            return proposalId;
        }

        public override Empty ProposeIssueRewardProject(ProposeIssueRewardProjectInput input)
        {
            SelfProposalProcess(nameof(UpdateRewardProject), new ProjectInfo
            {
                PullRequestUrl = input.PullRequestUrl,
                CommitId = input.CommitId,
                Status = ProjectStatus.Approved
            }.ToByteString());
            return new Empty();
        }

        public override Empty ProposeTakeOverRewardProject(ProposeTakeOverRewardProjectInput input)
        {
            SelfProposalProcess(nameof(UpdateRewardProject), new ProjectInfo
            {
                PullRequestUrl = input.PullRequestUrl,
                CommitId = input.CommitId,
                Status = ProjectStatus.Taken
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