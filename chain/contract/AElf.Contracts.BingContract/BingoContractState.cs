using AElf.Contracts.Consensus.AEDPoS;
using AElf.Contracts.MultiToken;
using AElf.Sdk.CSharp.State;
using AElf.Types;

namespace AElf.Contracts.BingoContract
{
    public partial class BingoContractState : ContractState
    {
        public MappedState<Address, PlayerInformation> PlayerInformation { get; set; }

        public SingletonState<long> LagHeight { get; set; }

        internal TokenContractContainer.TokenContractReferenceState TokenContract { get; set; }
        internal AEDPoSContractContainer.AEDPoSContractReferenceState ConsensusContract { get; set; }
    }
}