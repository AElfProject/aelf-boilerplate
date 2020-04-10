using AElf.Contracts.Association;
using AElf.Contracts.Consensus.AEDPoS;
using AElf.Contracts.MultiToken;
using AElf.Contracts.Parliament;
using AElf.Contracts.Profit;
using AElf.Sdk.CSharp.State;
using AElf.Types;

namespace AElf.Contracts.DAOContract
{
    // ReSharper disable InconsistentNaming
    public class DAOContractState : ContractState
    {
        internal AssociationContractContainer.AssociationContractReferenceState AssociationContract { get; set; }
        internal AEDPoSContractContainer.AEDPoSContractReferenceState ConsensusContract { get; set; }
        internal ParliamentContractContainer.ParliamentContractReferenceState ParliamentContract { get; set; }
        internal TokenContractContainer.TokenContractReferenceState TokenContract { get; set; }
        internal ProfitContractContainer.ProfitContractReferenceState ProfitContract { get; set; }

        public SingletonState<string> DepositSymbol { get; set; }
        public SingletonState<long> DepositAmount { get; set; }
        public SingletonState<MemberList> DAOMemberList { get; set; }

        public MappedState<Hash, ProjectInfo> Projects { get; set; }

        /// <summary>
        /// Project Id -> Budget Index -> BudgetPlan
        /// </summary>
        public MappedState<Hash, int, BudgetPlan> BudgetPlans { get; set; }

        public SingletonState<Address> OrganizationAddress { get; set; }

        public MappedState<Hash, Hash> PreviewProposalIds { get; set; }

        public SingletonState<long> ApprovalThreshold { get; set; }
    }
}