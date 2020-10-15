using AElf.Sdk.CSharp;
using AElf.Standards.ACS1;
using Google.Protobuf.WellKnownTypes;

namespace AElf.Contracts.ACS1DemoContract
{
    /// <summary>
    /// ACS1 defines interfaces of setting and getting method fee and who has the right to do so.
    /// ACS1 can only used by system contracts.
    /// </summary>
    public class ACS1DemoContract : ACS1DemoContractContainer.ACS1DemoContractBase
    {
        public override Empty ChangeMethodFeeController(AuthorityInfo input)
        {
            if (State.MethodFeeController.Value == null)
            {
                State.MethodFeeController.Value = input;
            }
            else
            {
                Assert(Context.Sender == State.MethodFeeController.Value.OwnerAddress,
                    "Only Owner can change method fee controller.");
            }

            return new Empty();
        }

        public override Empty SetMethodFee(MethodFees input)
        {
            if (State.MethodFeeController.Value == null)
            {
                throw new AssertionException("Need to set method fee controller before setting method fee.");
            }

            Assert(Context.Sender == State.MethodFeeController.Value.OwnerAddress,
                "Only Owner can change method fee controller.");

            State.TransactionFees[input.MethodName] = input;

            return new Empty();
        }

        public override MethodFees GetMethodFee(StringValue input)
        {
            return State.TransactionFees[input.Value];
        }

        public override AuthorityInfo GetMethodFeeController(Empty input)
        {
            return State.MethodFeeController.Value;
        }

        /// <summary>
        /// Toy.
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        public override Empty Foo(Empty input)
        {
            return new Empty();
        }
    }
}