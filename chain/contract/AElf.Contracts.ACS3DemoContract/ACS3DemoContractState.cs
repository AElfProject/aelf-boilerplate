using Acs3;
using AElf.Sdk.CSharp.State;

namespace AElf.Contracts.ACS3DemoContract
{
    public class ACS3DemoContractState : ContractState
    {
        public SingletonState<AuthorityInfo> MethodFeeController { get; set; }
        public MappedState<string, MethodFees> TransactionFees { get; set; }
    }
}