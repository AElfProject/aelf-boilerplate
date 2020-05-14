using Acs5;
using AElf.Sdk.CSharp;
using Google.Protobuf.WellKnownTypes;

namespace AElf.Contracts.ACS5DemoContract
{
    /// <summary>
    /// Protect your contract from meaningless calling by implementing ACS5.
    /// </summary>
    public class ACS5DemoContract : ACS5DemoContractContainer.ACS5DemoContractBase
    {
        public override Empty SetMethodCallingThreshold(SetMethodCallingThresholdInput input)
        {
            return base.SetMethodCallingThreshold(input);
        }

        public override MethodCallingThreshold GetMethodCallingThreshold(StringValue input)
        {
            return base.GetMethodCallingThreshold(input);
        }
    }
}