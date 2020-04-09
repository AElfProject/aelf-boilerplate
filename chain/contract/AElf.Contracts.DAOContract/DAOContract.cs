using System.Linq;
using Acs3;
using AElf.Contracts.Association;
using AElf.Contracts.Consensus.AEDPoS;
using AElf.Sdk.CSharp;
using AElf.Types;
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

            var minerList = State.ConsensusContract.GetMinerList.Call(new GetMinerListInput {TermNumber = 1});
            var createOrganizationInput = new CreateOrganizationInput();
            createOrganizationInput.OrganizationMemberList.OrganizationMembers.AddRange(
                minerList.Pubkeys.Select(p => Address.FromPublicKey(p.ToByteArray())));
            createOrganizationInput.ProposalReleaseThreshold = new ProposalReleaseThreshold
            {
                
            };
            
            State.AssociationContract.CreateOrganization.Send(createOrganizationInput);

            State.OrganizationAddress.Value =
                State.AssociationContract.CalculateOrganizationAddress.Call(createOrganizationInput);

            State.DepositSymbol.Value = Context.Variables.NativeSymbol;
            State.DepositAmount.Value = input.DepositAmount;

            State.DAOMemberList.Value = new MemberList
            {
                Value = {minerList.Pubkeys.Select(p => p.ToHex())}
            };
            return new Empty();
        }

        public override Empty ProposeJoin(StringValue input)
        {
            AssertReleasedByParliament();
            var memberList = State.DAOMemberList.Value;
            memberList.Value.Add(input.Value);
            State.AssociationContract.ChangeOrganizationMember.Send(new OrganizationMemberList
            {
                OrganizationMembers =
                    {memberList.Value.Select(p => Address.FromPublicKey(ByteArrayHelper.HexStringToByteArray(p)))}
            });
            return new Empty();
        }

        private void AssertReleasedByDecentralizedAutonomousOrganization()
        {
            
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
            return new Empty();
        }

        public override Empty ProposeExpel(StringValue input)
        {
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
            return new MemberList();
        }
    }
}