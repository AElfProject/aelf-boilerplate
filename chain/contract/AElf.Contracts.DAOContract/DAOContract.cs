using Acs3;
using AElf.Contracts.Association;
using AElf.Types;
using Google.Protobuf.WellKnownTypes;

namespace AElf.Contracts.DAOContract
{
    public class DAOContract : DAOContractContainer.DAOContractBase
    {
        public override Empty Initialize(Empty input)
        {
            State.AssociationContract.CreateOrganization.Send(new CreateOrganizationInput
            {
                OrganizationMemberList = new OrganizationMemberList
                {
                    OrganizationMembers =
                    {
                        
                    }
                },
                ProposalReleaseThreshold = new ProposalReleaseThreshold
                {
                    
                },
                ProposerWhiteList = new ProposerWhiteList()
            });
            return new Empty();
        }

        public override Empty ProposeJoin(Empty input)
        {
            if (State.DAOMemberList.Value == null)
            {
                State.DAOMemberList.Value = new MemberList
                {
                    Value =
                    {
                        Context.Sender
                    }
                };
            }
            return new Empty();
        }

        public override Empty Quit(Empty input)
        {
            return new Empty();
        }

        public override Empty ProposeExpel(Address input)
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