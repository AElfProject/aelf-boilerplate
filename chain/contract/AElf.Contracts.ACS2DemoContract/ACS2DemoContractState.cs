using AElf.Sdk.CSharp.State;
using AElf.Types;

namespace AElf.Contracts.ACS2DemoContract
{
    public class ACS2DemoContractState : ContractState
    {
        public MappedState<Address, long> Credits { get; set; }
    }
}