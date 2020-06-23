using AElf.Contracts.Consensus.AEDPoS;
using AElf.Sdk.CSharp.State;
using AElf.Types;

namespace AElf.Contracts.ACS6DemoContract
{
    public class ACS6DemoContractState : ContractState
    {
        internal AEDPoSContractContainer.AEDPoSContractReferenceState ConsensusContract { get; set; }

        public MappedState<Address, Hash> Commitments { get; set; }
        public MappedState<Address, long> RequestHeights { get; set; }
    }
}