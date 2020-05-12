using Acs2;
using AElf.Sdk.CSharp;
using AElf.Types;
using Google.Protobuf.WellKnownTypes;

namespace AElf.Contracts.ACS2DemoContract
{
    /// <summary>
    /// ACS1 can only used by system contracts.
    /// </summary>
    public class ACS2DemoContract : ACS2DemoContractContainer.ACS2DemoContractBase
    {
        public override ResourceInfo GetResourceInfo(Transaction input)
        {
            return base.GetResourceInfo(input);
        }
    }
}