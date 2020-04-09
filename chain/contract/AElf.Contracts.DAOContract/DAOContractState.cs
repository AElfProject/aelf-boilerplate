using AElf.Contracts.Association;
using AElf.Contracts.Consensus.AEDPoS;
using AElf.Contracts.MultiToken;
using AElf.Contracts.Parliament;
using AElf.Sdk.CSharp.State;
using AElf.Types;

namespace AElf.Contracts.DAOContract
{
    public class DAOContractState : ContractState
    {
        internal AssociationContractContainer.AssociationContractReferenceState AssociationContract { get; set; }
        internal AEDPoSContractContainer.AEDPoSContractReferenceState ConsensusContract { get; set; }
        internal ParliamentContractContainer.ParliamentContractReferenceState ParliamentContract { get; set; }
        internal TokenContractContainer.TokenContractReferenceState TokenContract { get; set; }

        public SingletonState<string> DepositSymbol { get; set; }
        public SingletonState<long> DepositAmount { get; set; }
        // ReSharper disable once InconsistentNaming
        public SingletonState<MemberList> DAOMemberList { get; set; }

        public MappedState<Hash, int, BudgetPlan> BudgetPlans { get; set; }

        public SingletonState<Address> OrganizationAddress { get; set; }
    }
}