using AElf;
using AElf.Contracts.Genesis;
using AElf.Sdk.CSharp.State;
using AElf.Types;

namespace AElf.Contracts.BingoGameContract
{
    public partial class BingoGameContractState : ContractState 
    {
        public SingletonState<bool> Initialized { get; set; }

        public MappedState<Address, PlayerInformation> PlayerInformation { get; set; }
        
        
    }
}