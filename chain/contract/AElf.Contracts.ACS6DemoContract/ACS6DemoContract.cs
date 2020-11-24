using AElf.Standards.ACS6;
using AElf.CSharp.Core;
using AElf.Sdk.CSharp;
using AElf.Types;
using Google.Protobuf.WellKnownTypes;

namespace AElf.Contracts.ACS6DemoContract
{
    /// <summary>
    /// ACS6 can help developers implement a commit-reveal scheme random number generator.
    /// </summary>
    public class ACS6DemoContract : ACS6DemoContractContainer.ACS6DemoContractBase
    {
        public override Empty Initialize(Empty input)
        {
            State.ConsensusContract.Value =
                Context.GetContractAddressByName(SmartContractConstants.ConsensusContractSystemName);
            return new Empty();
        }
    }
}