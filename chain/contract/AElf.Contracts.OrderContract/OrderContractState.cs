using AElf.Sdk.CSharp.State;

namespace AElf.Contracts.OrderContract
{
    public class OrderContractState : ContractState
    {
        public MappedState<long, long, Order> Orders { get; set; }
    }
}