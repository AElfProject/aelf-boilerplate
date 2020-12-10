using AElf.Contracts.Consensus.AEDPoS;
using AElf.Contracts.MultiToken;

namespace GameStoreContract
{
    public partial class GameStoreContractState
    {
        internal AEDPoSContractContainer.AEDPoSContractReferenceState AEDPoSContract { get; set; }
        internal TokenContractContainer.TokenContractReferenceState TokenContract { get; set; }
    }
}