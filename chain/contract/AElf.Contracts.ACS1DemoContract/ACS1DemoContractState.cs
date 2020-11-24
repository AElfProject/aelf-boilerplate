using AElf.Sdk.CSharp.State;
using AElf.Standards.ACS1;

namespace AElf.Contracts.ACS1DemoContract
{
    public class ACS1DemoContractState : ContractState
    {
        public SingletonState<AuthorityInfo> MethodFeeController { get; set; }
        public MappedState<string, MethodFees> TransactionFees { get; set; }
    }
}