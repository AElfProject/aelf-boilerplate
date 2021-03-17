using System.Linq;
using AElf.CSharp.Core;
using AElf.Standards.ACS13;
using Google.Protobuf.WellKnownTypes;

namespace AElf.Contracts.IntegerAggregator
{
    public class IntegerAggregatorContract : IntegerAggregatorContractContainer.IntegerAggregatorContractBase
    {
        public override BytesValue Aggregate(AggregateInput input)
        {
            var results = input.Results.Select(r => Int32Value.Parser.ParseFrom(r).Value).ToList();

            return new Int32Value
            {
                // Just ignore frequencies, for testing.
                Value = results.Sum().Div(results.Count())
            }.ToBytesValue();
        }
    }
}