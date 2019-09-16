using AElf.Sdk.CSharp.State;

namespace AElf.Contracts.HelloWorldContract
{
    public class HelloWorldContractState : ContractState
    {
        public SingletonState<VisitorList> Visitors { get; set; }
        public SingletonState<RequestRandomParam> RequestP { get; set; }

        public Int64State Nonce {get;set;}

        internal Acs6.RandomNumberProviderContractContainer.RandomNumberProviderContractReferenceState ACS6Contract { get; set; }
    }
}