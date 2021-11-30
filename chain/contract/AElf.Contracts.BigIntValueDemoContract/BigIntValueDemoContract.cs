using AElf.CSharp.Core;
using AElf.Types;

namespace AElf.Contracts.BigIntValueDemoContract
{
    public class BigIntValueDemoContract : BigIntValueDemoContractContainer.BigIntValueDemoContractBase
    {
        public override BigIntValue Add(Input input)
        {
            return input.BigIntValue1.Add(input.BigIntValue2);
        }

        public override BigIntValue Sub(Input input)
        {
            return input.BigIntValue1.Sub(input.BigIntValue2);
        }

        public override BigIntValue Mul(Input input)
        {
            return input.BigIntValue1.Mul(input.BigIntValue2);
        }

        public override BigIntValue Div(Input input)
        {
            return input.BigIntValue1.Div(input.BigIntValue2);
        }
    }
}