using AElf.Standards.ACS5;
using AElf.Sdk.CSharp.State;
using AElf.Types;

namespace AElf.Contracts.ACS5DemoContract
{
    public class ACS5DemoContractState : ContractState
    {
        public SingletonState<Address> Admin { get; set; }
        public MappedState<string, MethodCallingThreshold> MethodCallingThresholds { get; set; }
    }
}