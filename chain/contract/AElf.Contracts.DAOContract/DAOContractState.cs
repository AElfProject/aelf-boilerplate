using AElf.Contracts.Association;
using AElf.Sdk.CSharp.State;
using AElf.Types;

namespace AElf.Contracts.DAOContract
{
    public class DAOContractState : ContractState
    {
        internal AssociationContractContainer.AssociationContractReferenceState AssociationContract { get; set; }

        // ReSharper disable once InconsistentNaming
        public SingletonState<MemberList> DAOMemberList { get; set; }

        public MappedState<Hash, int, BudgetPlan> BudgetPlans { get; set; }
    }
}