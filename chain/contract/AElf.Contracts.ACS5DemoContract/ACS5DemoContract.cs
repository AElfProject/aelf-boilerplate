using AElf.Standards.ACS5;
using Google.Protobuf.WellKnownTypes;

namespace AElf.Contracts.ACS5DemoContract
{
    /// <summary>
    /// Protect your contract from meaningless calling by implementing ACS5.
    /// </summary>
    public class ACS5DemoContract : ACS5DemoContractContainer.ACS5DemoContractBase
    {
        public override Empty Initialize(InitializeInput input)
        {
            State.Admin.Value = input.Admin;
            return new Empty();
        }

        public override Empty SetMethodCallingThreshold(SetMethodCallingThresholdInput input)
        {
            Assert(State.Admin.Value == Context.Sender, "No permission.");
            State.MethodCallingThresholds[input.Method] = new MethodCallingThreshold
            {
                SymbolToAmount = {input.SymbolToAmount}
            };
            return new Empty();
        }

        public override MethodCallingThreshold GetMethodCallingThreshold(StringValue input)
        {
            return State.MethodCallingThresholds[input.Value];
        }

        public override Empty Foo(Empty input)
        {
            return new Empty();
        }
    }
}