using Google.Protobuf.WellKnownTypes;

namespace AElf.Contracts.DAOContract
{
    // ReSharper disable InconsistentNaming
    public partial class DAOContract
    {
        public override Empty AddInvestmentProject(InvestmentProject input)
        {
            AssertApprovedByDecentralizedAutonomousOrganization();
            // TODO: Some basic checks.
            var projectHash = CalculateProjectHash(input.PullRequestUrl, input.CommitId);
            State.InvestmentProjects[projectHash] = input;
            return new Empty();
        }

        public override Empty UpdateInvestmentProject(InvestmentProject input)
        {
            AssertApprovedByDecentralizedAutonomousOrganization();
            // TODO: Some basic checks.
            var projectHash = CalculateProjectHash(input.PullRequestUrl, input.CommitId);
            var currentProject = State.InvestmentProjects[projectHash];
            currentProject.Status = input.Status;
            State.InvestmentProjects[projectHash] = currentProject;
            return new Empty();
        }

        public override Empty AddRewardProject(RewardProject input)
        {
            AssertApprovedByDecentralizedAutonomousOrganization();
            // TODO: Some basic checks.
            var projectHash = CalculateProjectHash(input.PullRequestUrl, input.CommitId);
            State.RewardProjects[projectHash] = input;
            return new Empty();
        }

        public override Empty UpdateRewardProject(RewardProject input)
        {
            AssertApprovedByDecentralizedAutonomousOrganization();
            // TODO: Some basic checks.
            var projectHash = CalculateProjectHash(input.PullRequestUrl, input.CommitId);
            var currentProject = State.RewardProjects[projectHash];
            currentProject.Status = input.Status;
            State.RewardProjects[projectHash] = currentProject;
            return new Empty();
        }
    }
}