using AElf.Sdk.CSharp.State;
 
 namespace AElf.Contracts.HelloWorld
 {
     public class HelloWorldContractState : ContractState
     {
         public SingletonState<GreetedList> GreetedList { get; set; }
     }
 }