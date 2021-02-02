using AElf.Sdk.CSharp.State;
using AElf.Types;

namespace AElf.Contracts.BingoGameContract
{
    public partial class BingoGameContractState : ContractState 
    {
        public MappedState<Address, PlayerInformation> PlayerInformation { get; set; }

        public SingletonState<long> LagHeight { get; set; }

        public BoolState Initialized { get; set; }
    }
}