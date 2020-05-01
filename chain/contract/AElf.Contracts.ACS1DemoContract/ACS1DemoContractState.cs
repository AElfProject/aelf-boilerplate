using Acs1;
using AElf.Sdk.CSharp.State;

namespace AElf.Contracts.ACS1DemoContract
{
    public class ACS1DemoContractState : ContractState
    {
        public SingletonState<AuthorityInfo> MethodFeeController { get; set; }
        public MappedState<string, MethodFees> TransactionFees { get; set; }
    }
}