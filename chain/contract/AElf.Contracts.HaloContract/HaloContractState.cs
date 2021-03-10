using AElf.Sdk.CSharp.State;

namespace AElf.Contracts.HaloContract
{
    /// <summary>
    /// The state class of the contract, it inherits from the AElf.Sdk.CSharp.State.ContractState type. 
    /// </summary>
    public class HaloContractState : ContractState
    {
        // state definitions go here.
        public StringState NativeGreetings { get; set; }
        public MappedState<string, string> GreetingInfos { get; set; }
        public SingletonState<GreetedList> GreetedList { get; set; }
        
    }
}