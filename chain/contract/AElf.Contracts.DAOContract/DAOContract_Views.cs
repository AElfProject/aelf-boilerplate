using AElf.Types;
using Google.Protobuf.WellKnownTypes;

namespace AElf.Contracts.DAOContract
{
    // ReSharper disable once InconsistentNaming
    public partial class DAOContract
    {
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

        public override Hash GetPreviewProposalId(ProposeProjectInput input)
        {
            var projectInfo = new ProjectInfo
            {
                PullRequestUrl = input.PullRequestUrl,
                CommitId = input.CommitId
            };
            return State.PreviewProposalIds[projectInfo.GetProjectId()];
        }
    }
}