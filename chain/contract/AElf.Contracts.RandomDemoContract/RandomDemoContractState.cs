using AElf.Sdk.CSharp.State;

namespace AElf.Contracts.RandomDemoContract
{
    public class RandomDemoContractState : ContractState
    {
        public SingletonState<RequestRandomParam> RequestP { get; set; }

        public Int64State Nonce {get;set;}

        internal Acs6.RandomNumberProviderContractContainer.RandomNumberProviderContractReferenceState ACS6Contract { get; set; }
    }
}