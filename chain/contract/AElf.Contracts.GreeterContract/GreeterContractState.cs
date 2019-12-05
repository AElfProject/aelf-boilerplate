using AElf.Sdk.CSharp.State;

 namespace AElf.Contracts.Greeter
 {
     public class GreeterContractState : ContractState
     {
         public SingletonState<GreetedList> GreetedList { get; set; }
     }
 } 