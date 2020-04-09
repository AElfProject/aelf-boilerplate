using System.Linq;
using Acs3;
using AElf.Contracts.Association;
using AElf.Contracts.Consensus.AEDPoS;
using AElf.Contracts.MultiToken;
using AElf.CSharp.Core.Extension;
using AElf.Sdk.CSharp;
using AElf.Types;
using Google.Protobuf;
using Google.Protobuf.WellKnownTypes;

namespace AElf.Contracts.DAOContract
{
    // ReSharper disable once InconsistentNaming
    public class DAOContract : DAOContractContainer.DAOContractBase
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

        public override Empty ProposeJoin(StringValue input)
        {
            AssertReleasedByParliament();
            State.TokenContract.TransferFrom.Send(new TransferFromInput
            {
                From = Context.Sender,
                To = Context.Self,
                Symbol = State.DepositSymbol.Value,
                Amount = State.DepositAmount.Value
            });
            var memberList = State.DAOMemberList.Value;
            var joinAddress = Address.FromPublicKey(ByteArrayHelper.HexStringToByteArray(input.Value));
            memberList.Value.Add(joinAddress);
            SelfProposalProcess(nameof(State.AssociationContract.ChangeOrganizationMember), new OrganizationMemberList
            {
                OrganizationMembers = {memberList.Value}
            }.ToByteString());
            State.DAOMemberList.Value = memberList;
            return new Empty();
        }

        private void SelfProposalProcess(string methodName, ByteString parameter)
        {
            var createProposalInput = new CreateProposalInput
            {
                ContractMethodName = methodName,
                Params = parameter,
                OrganizationAddress = State.OrganizationAddress.Value,
                ExpiredTime = Context.CurrentBlockTime.AddHours(1),
                ToAddress = State.AssociationContract.Value
            };
            State.AssociationContract.CreateProposal.Send(createProposalInput);
            // TODO: Association Contract need to help calculating proposal id.
            var proposalId = State.AssociationContract.CreateProposal.Call(createProposalInput);
            State.AssociationContract.Approve.Send(proposalId);
            State.AssociationContract.Release.Send(proposalId);
        }

        private void AssertReleasedByDecentralizedAutonomousOrganization()
        {
            // TODO: Need a way to gather approves in this contract, not in Association Contract.
        }

        private void AssertReleasedByParliament()
        {
            if (State.ParliamentContract.Value == null)
                State.ParliamentContract.Value =
                    Context.GetContractAddressByName(SmartContractConstants.ParliamentContractSystemName);
            var defaultAddress = State.ParliamentContract.GetDefaultOrganizationAddress.Call(new Empty());
            Assert(Context.Sender == defaultAddress, "No permission.");
        }

        public override Empty Quit(StringValue input)
        {
            State.TokenContract.Transfer.Send(new TransferInput
            {
                To = Context.Sender,
                Symbol = State.DepositSymbol.Value,
                Amount = State.DepositAmount.Value
            });
            var memberList = State.DAOMemberList.Value;
            var quitAddress = Address.FromPublicKey(ByteArrayHelper.HexStringToByteArray(input.Value));
            Assert(memberList.Value.Contains(quitAddress), $"DAO Member {input.Value} not found.");
            memberList.Value.Remove(quitAddress);
            SelfProposalProcess(nameof(State.AssociationContract.ChangeOrganizationMember), new OrganizationMemberList
            {
                OrganizationMembers = {memberList.Value}
            }.ToByteString());
            return new Empty();
        }

        public override Empty ProposeExpel(StringValue input)
        {
            AssertReleasedByParliament();
            AssertReleasedByDecentralizedAutonomousOrganization();
            var memberList = State.DAOMemberList.Value;
            var quitAddress = Address.FromPublicKey(ByteArrayHelper.HexStringToByteArray(input.Value));
            Assert(memberList.Value.Contains(quitAddress), $"DAO Member {input.Value} not found.");
            memberList.Value.Remove(quitAddress);
            SelfProposalProcess(nameof(State.AssociationContract.ChangeOrganizationMember), new OrganizationMemberList
            {
                OrganizationMembers = {memberList.Value}
            }.ToByteString());
            return new Empty();
        }

        public override Empty ProposeProjectToDAO(ProposeProjectInput input)
        {
            return new Empty();
        }

        public override Empty ProposeProjectToParliament(ProposeProjectWithBudgetsInput input)
        {
            return new Empty();
        }

        public override Empty ProposeDeliver(ProposeAuditionInput input)
        {
            return new Empty();
        }

        public override Empty ProposeRewardProject(ProposeProjectInput input)
        {
            return new Empty();
        }

        public override Empty ProposeIssueRewardProject(ProposeIssueRewardProjectInput input)
        {
            return new Empty();
        }

        public override Empty ProposeTakeOverRewardProject(ProposeTakeOverRewardProjectInput input)
        {
            return new Empty();
        }

        public override Empty ProposeDevelopersAudition(ProposeAuditionInput input)
        {
            return new Empty();
        }

        public override BudgetPlan GetBudgetPlan(GetBudgetPlanInput input)
        {
            return new BudgetPlan();
        }

        public override MemberList GetDAOMemberList(Empty input)
        {
            var organization = State.AssociationContract.GetOrganization.Call(State.OrganizationAddress.Value);

            return new MemberList
            {
                Value = {organization.OrganizationMemberList.OrganizationMembers}
            };
        }
    }
}