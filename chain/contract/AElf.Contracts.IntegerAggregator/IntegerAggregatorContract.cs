using System.Globalization;
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
            var results = input.Results.Select(r => decimal.Parse(StringValue.Parser.ParseFrom(r).Value)).ToList();
            // Just ignore frequencies, for testing.
            var result = (results.Sum() / results.Count).ToString(CultureInfo.InvariantCulture);
            return new StringValue
            {
                Value = result
            }.ToBytesValue();
        }
    }
}