using AElf.Sdk.CSharp.State;

namespace Tank.Contracts.Vote
{
    /// <summary>
    /// The state class of the contract, it inherits from the AElf.Sdk.CSharp.State.ContractState type. 
    /// </summary>
    public partial class VoteContractState : ContractState
    {
        public BoolState IsInitialized { get; set; }
    }
}