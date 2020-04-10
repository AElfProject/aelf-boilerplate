using System.Linq;
using Acs3;
using AElf.Contracts.Profit;
using AElf.CSharp.Core;
using AElf.CSharp.Core.Extension;
using AElf.Sdk.CSharp;
using AElf.Types;
using Google.Protobuf;
using Google.Protobuf.WellKnownTypes;

namespace AElf.Contracts.DAOContract
{
    // ReSharper disable InconsistentNaming
    public partial class DAOContract
    {
        private Hash SelfProposalProcess(string methodName, ByteString parameter)
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

            return proposalId;
        }

        private void AssertApprovedByDecentralizedAutonomousOrganization(ProjectInfo projectInfo)
        {
            var projectId = projectInfo.GetProjectId();
            var proposalId = State.PreviewProposalIds[projectId];
            var approvalCount = State.AssociationContract.GetProposal.Call(proposalId).ApprovalCount;
            AssertApprovalCountMeetThreshold(approvalCount);
        }

        private void AssertReleasedByParliament()
        {
            if (State.ParliamentContract.Value == null)
                State.ParliamentContract.Value =
                    Context.GetContractAddressByName(SmartContractConstants.ParliamentContractSystemName);
            var defaultAddress = State.ParliamentContract.GetDefaultOrganizationAddress.Call(new Empty());
            Assert(Context.Sender == defaultAddress, "No permission.");
        }

        private void AdjustApprovalThreshold()
        {
            State.ApprovalThreshold.Value = State.DAOMemberList.Value.Value.Count.Mul(2).Div(3).Add(1);
        }

        private void AssertApprovalCountMeetThreshold(long approvalCount)
        {
            Assert(approvalCount >= State.ApprovalThreshold.Value, "Not approved by DAO members yet.");
        }

        private Hash CreateProfitScheme(ProjectInfo projectInfo)
        {
            State.ProfitContract.CreateScheme.Send(new CreateSchemeInput
            {
                Manager = projectInfo.VirtualAddress,
                IsReleaseAllBalanceEveryTimeByDefault = true
            });
            var managingSchemeIds = State.ProfitContract.GetManagingSchemeIds.Call(new GetManagingSchemeIdsInput
            {
                Manager = projectInfo.VirtualAddress
            });
            return managingSchemeIds.SchemeIds.Last();
        }

        private void PayBudget(ProjectInfo projectInfo)
        {
            var projectId = projectInfo.GetProjectId();
            var budgetPlan = State.BudgetPlans[projectId][projectInfo.CurrentBudgetPlanIndex];
            Context.SendVirtualInline(projectId, State.ProfitContract.Value,
                nameof(State.ProfitContract.ContributeProfits), new ContributeProfitsInput
                {
                    SchemeId = projectInfo.ProfitSchemeId,
                    Symbol = budgetPlan.Symbol,
                    Amount = budgetPlan.Amount
                });
            Context.SendVirtualInline(projectId, State.ProfitContract.Value,
                nameof(State.ProfitContract.DistributeProfits), new DistributeProfitsInput
                {
                    SchemeId = projectInfo.ProfitSchemeId,
                    Period = projectInfo.CurrentBudgetPlanIndex.Add(1),
                    AmountsMap = {{budgetPlan.Symbol, budgetPlan.Amount}}
                });
        }
    }
}