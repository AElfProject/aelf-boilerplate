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
            var results = new GetReservesOutput();
            for (var i = 0; i < length; i++)
            {
                var tokens = SortTokens(input.SymbolPair[i]);
                Assert(State.Pairs[tokens[0]][tokens[1]] != null, "Pair not existed");
                var pairAddress = State.Pairs[tokens[0]][tokens[1]].Address;
                var reserves = GetReserves(pairAddress, tokens[0], tokens[1]);
                results.Results.Add(new ReservePairResult()
                {
                    SymbolPair = input.SymbolPair[i],
                    SymbolA = tokens[0],
                    SymbolB = tokens[1],
                    ReserveA = reserves[0],
                    ReserveB = reserves[1],
                    BlockTimestampLast = State.BlockTimestampLast[pairAddress]
                });
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
            var results = new GetTotalSupplyOutput();
            for (var i = 0; i < length; i++)
            {
                var tokens = SortTokens(input.SymbolPair[i]);
                Assert(State.Pairs[tokens[0]][tokens[1]] != null, "Pair not existed");
                var pairAddress = State.Pairs[tokens[0]][tokens[1]].Address;
                results.Results.Add(new TotalSupplyResult()
                {
                    SymbolPair = input.SymbolPair[i],
                    TotalSupply = State.TotalSupply[pairAddress]
                });
            }

            return results;
        }

        public override GetLiquidityTokenBalanceOutput GetLiquidityTokenBalance(PairList input)
        {
            var length = input.SymbolPair.Count;
            var results = new GetLiquidityTokenBalanceOutput();
            for (var i = 0; i < length; i++)
            {
                var tokens = SortTokens(input.SymbolPair[i]);
                Assert(State.Pairs[tokens[0]][tokens[1]] != null, "Pair not existed");
                var pairAddress = State.Pairs[tokens[0]][tokens[1]].Address;
                results.Results.Add(new LiquidityTokenBalanceResult()
                {
                    SymbolPair = input.SymbolPair[i],
                    Balance = State.LiquidityTokens[pairAddress][Context.Sender]
                });
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