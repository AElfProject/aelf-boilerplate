using System;
using AElf.CSharp.Core;

namespace AElf.Contracts.Oracle
{
    public partial class OracleContract
    {
        private int GetRevealThreshold(int nodeCount)
        {
            return Math.Max(nodeCount.Mul(2).Div(3).Add(1), State.RevealThreshold.Value);
        }

        private int GetAggregateThreshold(int nodeCount)
        {
            return Math.Max(nodeCount.Div(3).Add(1), State.AggregateThreshold.Value);
        }
    }
}