using AElf.Contracts.Genesis;
using AElf.Sdk.CSharp.State;

namespace BingoGameContract
{
    public class BingoGameContractState : ContractState 
    {
        internal BasicContractZeroContainer.BasicContractZeroReferenceState BasicContractZero { get; set; }
        
    }
}