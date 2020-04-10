using Google.Protobuf.WellKnownTypes;

namespace AElf.Contracts.DAOContract
{
    // ReSharper disable InconsistentNaming
    public partial class DAOContract
    {
        public override Empty AddInvestmentProject(ProjectInfo input)
        {
            AssertApprovedByDecentralizedAutonomousOrganization(input);
            var projectId = input.GetProjectId();
            input.VirtualAddress = Context.ConvertVirtualAddressToContractAddress(projectId);
            State.Projects[projectId] = input;
            return new Empty();
        }

        public override Empty UpdateInvestmentProject(ProjectInfo input)
        {
            AssertApprovedByDecentralizedAutonomousOrganization(input);
            var projectId = input.GetProjectId();
            var currentProject = State.Projects[projectId];
            currentProject.Status = input.Status;

            if (input.CurrentBudgetPlanIndex > 0)
            {
                currentProject.CurrentBudgetPlanIndex = input.CurrentBudgetPlanIndex;
            }

            if (input.Status == ProjectStatus.Approved)
            {
                foreach (var budgetPlan in input.BudgetPlans)
                {
                    State.BudgetPlans[projectId][budgetPlan.Index] = budgetPlan;
                }
                var profitSchemeId = CreateProfitScheme(input);
                currentProject.ProfitSchemeId = profitSchemeId;
            }

            if (input.Status == ProjectStatus.Delivered)
            {
                PayBudget(input);
                State.PreviewProposalIds.Remove(projectId);
            }

            State.Projects[projectId] = currentProject;
            return new Empty();
        }

        public override Empty AddRewardProject(ProjectInfo input)
        {
            AssertApprovedByDecentralizedAutonomousOrganization(input);
            // TODO: Some basic checks.
            var projectId = input.GetProjectId();
            State.Projects[projectId] = input;
            return new Empty();
        }

        public override Empty UpdateRewardProject(ProjectInfo input)
        {
            AssertApprovedByDecentralizedAutonomousOrganization(input);
            // TODO: Some basic checks.
            var projectId = input.GetProjectId();
            var currentProject = State.Projects[projectId];
            currentProject.Status = input.Status;
            State.Projects[projectId] = currentProject;
            return new Empty();
        }
    }
}