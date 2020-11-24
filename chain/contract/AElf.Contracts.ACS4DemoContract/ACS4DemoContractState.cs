using AElf.Standards.ACS4;
using AElf.Sdk.CSharp.State;
using AElf.Types;

namespace AElf.Contracts.ACS4DemoContract
{
    public class ACS4DemoContractState : ContractState
    {
        public MappedState<long, Address> Miners { get; set; }
    }
}