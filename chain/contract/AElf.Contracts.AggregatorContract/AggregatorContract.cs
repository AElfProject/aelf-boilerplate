using System;
using Google.Protobuf.WellKnownTypes;

namespace AElf.Contracts.AggregatorContract
{
    public partial class AggregatorContract : AggregatorContractContainer.AggregatorContractBase
    {
        public override Empty Initialize(Empty input)
        {
            return base.Initialize(input);
        }
    }
}