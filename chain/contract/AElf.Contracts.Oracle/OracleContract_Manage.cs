using AElf.Contracts.MultiToken;
using AElf.CSharp.Core;
using AElf.Types;
using Google.Protobuf.WellKnownTypes;

namespace AElf.Contracts.Oracle
{
    public partial class OracleContract
    {
        public override Empty ChangeController(Address input)
        {
            Assert(Context.Sender == State.Controller.Value, "Not authorized");
            State.Controller.Value = input;
            return new Empty();
        }

        public override Empty SetThreshold(SetThresholdInput input)
        {
            Assert(Context.Sender == State.Controller.Value, "Not authorized");
            Assert(input.MinimumOracleNodesCount >= input.DefaultRevealThreshold,
                "MinimumOracleNodesCount should be greater than or equal to DefaultRevealThreshold.");
            Assert(input.DefaultRevealThreshold >= input.DefaultAggregateThreshold,
                "DefaultRevealThreshold should be greater than or equal to DefaultAggregateThreshold.");
            Assert(input.DefaultAggregateThreshold > 0, "DefaultAggregateThreshold should be positive.");
            State.MinimumOracleNodesCount.Value = input.MinimumOracleNodesCount;
            State.RevealThreshold.Value = input.DefaultRevealThreshold;
            State.AggregateThreshold.Value = input.DefaultAggregateThreshold;
            return new Empty();
        }
    }
}