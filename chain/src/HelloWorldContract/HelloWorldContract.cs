using AElf;
using Google.Protobuf.WellKnownTypes;

namespace HelloWorldContract
{
    public partial class HelloWorldContract : HelloWorldContractContainer.HelloWorldContractBase
    {

        public override Empty InitializeHelloContract(InitializeHelloContractInput input)
        {
            Assert(!State.Initialized.Value, "Already initialized.");
            State.BasicContractZero.Value = Context.GetZeroSmartContractAddress();
            State.TokenContract.Value = 
                State.BasicContractZero.GetContractAddressByName.Call(input.TokenContractSystemName);
            State.Initialized.Value = true;
            return new Empty();
        }
        public override HelloReturn Hello(Empty input)
        {
            State.TokenContract.GetBalance.Call(new AElf.Contracts.MultiToken.Messages.GetBalanceInput{
                Owner = Context.Self,
                Symbol = Context.Variables.NativeSymbol
            });
            State.TokenContract.Transfer.Send(new AElf.Contracts.MultiToken.Messages.TransferInput{
                To = Address.FromString("e0b40ddc3520d0b5363bd9775014d77e4b8fe832946d0e3825731d89127b813a"), // 不能给自己转
                Symbol = "BTC",
                Amount = 1, // 必须大于0
                Memo = "Test"
            });

            return new HelloReturn {Value = "Hello world!"};
        }
        public override HelloReturn HelloLei(Empty input)
        {
            return new HelloReturn { Value = "Hello Lei!" };
        }

        public override TestOutput HelloSun(TestInput input)
        {
            return new TestOutput { A = input.A };
        }

        public override TestOutput Test(TestInput input)
        {
            
            return new TestOutput { A = input.A };
        }

        public override Fib Fibonacci(Fib index)
        {
            if (index.Value == 1 || index.Value == 2)
            {
                return new Fib { Value = 1 };
            }
            else
                return new Fib { Value = Fibonacci(new Fib { Value = index.Value - 1 }).Value + Fibonacci(new Fib { Value = index.Value - 2 }).Value };

        }
    }
}