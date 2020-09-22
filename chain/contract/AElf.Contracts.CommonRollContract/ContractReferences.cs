using AElf.Sdk.CSharp.State;
using AElf.Types;
using AElf.Contracts.Consensus.AEDPoS;

namespace AElf.Contracts.CommonRollContract
{
    public partial class CommonRollContractState
    {
        internal AEDPoSContractContainer.AEDPoSContractReferenceState ConsensusContract { get; set; }
    }
}