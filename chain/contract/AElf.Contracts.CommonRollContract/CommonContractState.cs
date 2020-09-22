using AElf.Sdk.CSharp.State;
using AElf.Types;

namespace AElf.Contracts.CommonRollContract
{
    public partial class CommonRollContractState : ContractState
    {
        public MappedState<Address, ProjectList> UserProjectList { get; set; }

        public MappedState<Hash, ProjectOverview> UserProjectOverview { get; set; }

        public MappedState<Hash, ProjectDetail> UserProjectDetail { get; set; }
    }
}