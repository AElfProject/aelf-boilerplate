using AElf.Contracts.BasicTokenContract;
using AElf.Sdk.CSharp.State;

namespace AElf.Contracts.TransferWrapperContract
{
    /// <summary>
    /// The state class of the contract, it inherits from the AElf.Sdk.CSharp.State.ContractState type. 
    /// </summary>
    public class TransferWrapperContractState : ContractState
    {
        // Mention: Never initialized the address.
        internal BasicTokenContractContainer.BasicTokenContractReferenceState TokenContract { get; set; }
    }
}