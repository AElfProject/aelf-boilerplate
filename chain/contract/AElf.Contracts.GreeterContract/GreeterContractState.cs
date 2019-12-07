using AElf.Sdk.CSharp.State;

 namespace AElf.Contracts.GreeterContract
 {
     public class GreeterContractState : ContractState
     {
         public SingletonState<GreetedList> GreetedList { get; set; }
     }
 } 