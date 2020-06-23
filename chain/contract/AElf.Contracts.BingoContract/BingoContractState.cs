using AElf.Contracts.Consensus.AEDPoS;
using AElf.Contracts.MultiToken;
using AElf.Sdk.CSharp.State;
using AElf.Types;

namespace AElf.Contracts.BingoContract
{
    /// <summary>
    /// The state class of the contract, it inherits from the AElf.Sdk.CSharp.State.ContractState type. 
    /// </summary>
    public class BingoContractState : ContractState
    {
        // state definitions go here.
        internal TokenContractContainer.TokenContractReferenceState TokenContract { get; set; }
        internal AEDPoSContractContainer.AEDPoSContractReferenceState ConsensusContract { get; set; }

        public MappedState<Address, PlayerInformation> PlayerInformation { get; set; }
        public MappedState<Address, PlayerInformation> PlayerInformationCompleted { get; set; }

        public SingletonState<long> LagHeight { get; set; }
    }
}