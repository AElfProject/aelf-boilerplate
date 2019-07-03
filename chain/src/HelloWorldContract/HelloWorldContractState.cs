using AElf.Sdk.CSharp.State;

namespace HelloWorldContract
{
    public partial class HelloWorldContractState : ContractState
    {
        public SingletonState<bool> Initialized { get; set; }
    }
}