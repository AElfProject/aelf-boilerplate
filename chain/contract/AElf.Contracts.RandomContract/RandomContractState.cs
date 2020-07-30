using AElf.Contracts.Consensus.AEDPoS;
using AElf.Sdk.CSharp.State;
using AElf.Types;

namespace AElf.Contracts.RandomContract
{
    /// <summary>
    /// The state class of the contract, it inherits from the AElf.Sdk.CSharp.State.ContractState type. 
    /// </summary>
    public class RandomContractState : ContractState
    {
        // state definitions go here.
        internal AEDPoSContractContainer.AEDPoSContractReferenceState AEDPoSContract { get; set; }
        
        public MappedState<Address, RequestRandomInformationList> RequestRandomInformationList { get; set; }
        public MappedState<Address, RequestRandomInformationList> RequestRandomInformationListCompleted { get; set; }
    }
}