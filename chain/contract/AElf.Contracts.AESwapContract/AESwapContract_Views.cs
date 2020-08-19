using System;
using AElf.Contracts.MultiToken;
using AElf.Sdk.CSharp;
using Google.Protobuf.WellKnownTypes;

namespace AElf.Contracts.AESwapContract
{
    public partial class AESwapContract
    {
        public override PairList GetPairs(Empty input)
        {
            return State.AllPairs.Value;
        }

        public override GetReservesOutput GetReserves(GetReservesInput input)
        {
            var length = input.SymbolPair.Count;
            var result = new ReservePairResult();
            var results = new GetReservesOutput();
            for (var i = 0; i < length; i++)
            {
                try
                {
                    var tokens = SortTokens(input.SymbolPair[0]);
                    var pairAddress = State.Pairs[tokens[0]][tokens[1]].Address;
                    var reserves = GetReserves(pairAddress, tokens[0], tokens[1]);
                    result.SymbolPair = input.SymbolPair[0];
                    result.IsSuccess = true;
                    result.ReserveA = reserves[0];
                    result.ReserveB = reserves[1];
                    result.SymbolA = tokens[0];
                    result.SymbolB = tokens[1];
                    result.BlockTimestampLast = State.BlockTimestampLast[pairAddress];
                }
                catch (AssertionException e)
                {
                    result.SymbolPair = input.SymbolPair[0];
                    result.IsSuccess = false;
                }
                finally
                {
                    results.Results.Add(result);
                }
            }

            return results;
        }
    }
}