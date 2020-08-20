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
                var tokens = SortTokens(input.SymbolPair[i]);
                Assert(State.Pairs[tokens[0]][tokens[0]] != null, "Pair not existed");
                var pairAddress = State.Pairs[tokens[0]][tokens[1]].Address;
                var reserves = GetReserves(pairAddress, tokens[0], tokens[1]);
                result.SymbolPair = input.SymbolPair[i];
                result.IsSuccess = true;
                result.ReserveA = reserves[0];
                result.ReserveB = reserves[1];
                result.SymbolA = tokens[0];
                result.SymbolB = tokens[1];
                result.BlockTimestampLast = State.BlockTimestampLast[pairAddress];

                results.Results.Add(result);
            }

            return results;
        }

        public override PairList GetAccountAssets(Empty input)
        {
            var pairList = State.AccountAssets[Context.Sender];
            return pairList;
        }

        public override GetTotalSupplyOutput GetTotalSupply(PairList input)
        {
            var length = input.SymbolPair.Count;
            var result = new TotalSupplyResult();
            var results = new GetTotalSupplyOutput();
            for (var i = 0; i < length; i++)
            {
                var tokens = SortTokens(input.SymbolPair[i]);
                Assert(State.Pairs[tokens[0]][tokens[0]] != null, "Pair not existed");
                var pairAddress = State.Pairs[tokens[0]][tokens[1]].Address;
                result.TotalSupply = State.TotalSupply[pairAddress];
                result.SymbolPair = input.SymbolPair[i];
                results.Results.Add(result);
            }

            return results;
        }

        public override GetLiquidityTokenBalanceOutput GetLiquidityTokenBalance(PairList input)
        {
            var length = input.SymbolPair.Count;
            var result = new LiquidityTokenBalanceResult();
            var results = new GetLiquidityTokenBalanceOutput();
            for (var i = 0; i < length; i++)
            {
                var tokens = SortTokens(input.SymbolPair[i]);
                Assert(State.Pairs[tokens[0]][tokens[0]] != null, "Pair not existed");
                var pairAddress = State.Pairs[tokens[0]][tokens[1]].Address;
                result.Balance = State.LiquidityTokens[pairAddress][Context.Sender];
                result.SymbolPair = input.SymbolPair[i];
                results.Results.Add(result);
            }

            return results;
        }

        public override Int64Value Quote(QuoteInput input)
        {
            Assert(State.Pairs[input.SymbolA][input.SymbolB] != null, "Pair not existed");
            var pairAddress = State.Pairs[input.SymbolA][input.SymbolB];
            var reserves = GetReserves(pairAddress.Address, input.SymbolA, input.SymbolB);
            var amountB = Quote(input.AmountA, reserves[0], reserves[1]);
            return new Int64Value()
            {
                Value = amountB
            };
        }

        public override Int64Value GetAmountIn(GetAmountInInput input)
        {
            Assert(State.Pairs[input.SymbolIn][input.SymbolOut] != null, "Pair not existed");
            var pairAddress = State.Pairs[input.SymbolIn][input.SymbolOut];
            var reserves = GetReserves(pairAddress.Address, input.SymbolIn, input.SymbolOut);
            var amountIn = GetAmountIn(input.AmountOut, reserves[0], reserves[1]);
            return new Int64Value()
            {
                Value = amountIn
            };
        }

        public override Int64Value GetAmountOut(GetAmountOutInput input)
        {
            var pair = GetPair(input.SymbolIn, input.SymbolOut);
            Assert(State.Pairs[input.SymbolIn][input.SymbolOut] != null, "Pair not existed");
            var pairAddress = State.Pairs[input.SymbolIn][input.SymbolOut];
            var reserves = GetReserves(pairAddress.Address, input.SymbolIn, input.SymbolOut);
            var amountOut = GetAmountOut(input.AmountIn, reserves[0], reserves[1]);
            return new Int64Value()
            {
                Value = amountOut
            };
        }
    }
}