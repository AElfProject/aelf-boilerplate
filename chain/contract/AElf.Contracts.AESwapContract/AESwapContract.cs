using System.Runtime.InteropServices;
using AElf.CSharp.Core;
using AElf.Sdk.CSharp;
using AElf.Types;
using Google.Protobuf.WellKnownTypes;

namespace AElf.Contracts.AESwapContract
{
    public partial class AESwapContract : AESwapContractContainer.AESwapContractBase
    {
        public override Empty Initialize(Empty input)
        {
            Assert(State.TokenContract.Value == null, "Already initialized.");
            State.TokenContract.Value =
                Context.GetContractAddressByName(SmartContractConstants.TokenContractSystemName);
            State.InitialTimestamp.Value = Context.CurrentBlockTime;
            return new Empty();
        }

        public override AddLiquidityOutput AddLiquidity(AddLiquidityInput input)
        {
            Assert(input.Deadline.Seconds >= Context.CurrentBlockTime.Seconds, "Expired");
            Assert(input.AmountAMin > 0 && input.AmountBMin > 0 && input.AmountADesired > 0 && input.AmountBDesired > 0,
                "Invalid Input");
            var amount = AddLiquidity(input.SymbolA, input.SymbolB, input.AmountADesired, input.AmountBDesired,
                input.AmountAMin,
                input.AmountBMin);
            var to = State.Pairs[input.SymbolA][input.SymbolB].Address;
            TransferIn(Context.Sender, to, input.SymbolA, amount[0]);
            TransferIn(Context.Sender, to, input.SymbolB, amount[1]);
            var liquidityToken = Mint(input.SymbolA, input.SymbolB, amount[0], amount[1], Context.Sender);
            return new AddLiquidityOutput()
            {
                AmountA = amount[0],
                AmountB = amount[1],
                LiquidityToken = liquidityToken,
                SymbolA = input.SymbolA,
                SymbolB = input.SymbolB
            };
        }

        public override RemoveLiquidityOutput RemoveLiquidity(RemoveLiquidityInput input)
        {
            Assert(input.Deadline.Seconds >= Context.CurrentBlockTime.Seconds, "Expired");
            Assert(input.AmountAMin > 0 && input.AmountBMin > 0 && input.LiquidityRemove > 0, "Invalid Input");
            var amount = RemoveLiquidity(input.SymbolA, input.SymbolB, input.LiquidityRemove, input.AmountAMin,
                input.AmountBMin);
            return new RemoveLiquidityOutput()
            {
                AmountA = amount[0],
                AmountB = amount[1],
                SymbolA = input.SymbolA,
                SymbolB = input.SymbolB
            };
        }


        public override CreatePairOutput CreatePair(CreatePairInput input)
        {
            var tokenPair = SortTokens(input.SymbolPair);
            Assert(tokenPair[0] != tokenPair[1], "Identical Tokens");
            Assert(State.Pairs[tokenPair[0]][tokenPair[1]] == null, "Pair Exists");
            var pair = new Pair();
            var realPairString = GetPair(input.SymbolPair);
            var hash = HashHelper.ComputeFrom(realPairString);
            pair.Hash = hash;
            var address = Context.ConvertVirtualAddressToContractAddress(hash);
            pair.Address = address;
            State.Pairs[tokenPair[0]][tokenPair[1]] = pair;
            State.Pairs[tokenPair[1]][tokenPair[0]] = pair;
            //add to PairList
            var pairList = State.AllPairs.Value ?? new PairList();
            pairList.SymbolPair.Add(realPairString);
            State.AllPairs.Value = pairList;

            PairInitial(address, tokenPair[0], tokenPair[1]);
            Context.Fire(new PairCreated()
            {
                SymbolA = tokenPair[0],
                SymbolB = tokenPair[1],
                Pair = address
            });
            return new CreatePairOutput()
            {
                PairAddress = address
            };
        }

        public override SwapOutput SwapExactTokenForToken(SwapExactTokenForTokenInput input)
        {
            Assert(input.Deadline.Seconds >= Context.CurrentBlockTime.Seconds, "Expired");
            Assert(State.Pairs[input.SymbolIn][input.SymbolOut] != null, "Pair not Exists");
            Assert(input.AmountIn > 0 && input.AmountOutMin > 0, "Invalid Input");
            var pairAddress = State.Pairs[input.SymbolIn][input.SymbolOut].Address;
            var reserves = GetReserves(pairAddress, input.SymbolIn, input.SymbolOut);
            var amountOut = GetAmountOut(input.AmountIn, reserves[0], reserves[1]);
            Assert(amountOut >= input.AmountOutMin, "Insufficient Output amount");
            TransferIn(Context.Sender, pairAddress, input.SymbolIn, input.AmountIn);
            Swap(input.SymbolIn, input.SymbolOut, input.AmountIn, amountOut, Context.Sender);
            return new SwapOutput()
            {
                AmountOut = amountOut,
                SymbolOut = input.SymbolOut
            };
        }


        public override SwapOutput SwapTokenForExactToken(SwapTokenForExactTokenInput input)
        {
            Assert(input.Deadline.Seconds >= Context.CurrentBlockTime.Seconds, "Expired");
            Assert(State.Pairs[input.SymbolIn][input.SymbolOut] != null, "Pair not Exists");
            Assert(input.AmountOut > 0 && input.AmountInMax > 0, "Invalid Input");
            var pairAddress = State.Pairs[input.SymbolIn][input.SymbolOut].Address;
            var reserves = GetReserves(pairAddress, input.SymbolIn, input.SymbolOut);
            var amountIn = GetAmountIn(input.AmountOut, reserves[0], reserves[1]);
            Assert(amountIn <= input.AmountInMax, "Insufficient Input amount");
            TransferIn(Context.Sender, pairAddress, input.SymbolIn, amountIn);
            Swap(input.SymbolIn, input.SymbolOut, amountIn, input.AmountOut, Context.Sender);
            return new SwapOutput()
            {
                AmountOut = input.AmountOut,
                SymbolOut = input.SymbolOut
            };
        }

        public override Empty TransferLiquidityTokens(TransferLiquidityTokensInput input)
        {
            Assert(State.Pairs[input.SymbolA][input.SymbolB] != null, "Pair not existed");
            Assert(input.Amount > 0, "Invalid Input");
            var liquidity = State.LiquidityTokens[State.Pairs[input.SymbolA][input.SymbolB].Address][Context.Sender];
            Assert(liquidity > 0 && input.Amount <= liquidity, "Insufficient LiquidityToken");
            var liquidityNew = liquidity.Sub(input.Amount);
            State.LiquidityTokens[State.Pairs[input.SymbolA][input.SymbolB].Address][Context.Sender] = liquidityNew;
            var liquidityToBefore = State.LiquidityTokens[State.Pairs[input.SymbolA][input.SymbolB].Address][input.To];
            State.AccountAssets[input.To] = State.AccountAssets[input.To] ?? new PairList();
            var pairString = GetPair(input.SymbolA, input.SymbolB);
            if (!State.AccountAssets[input.To].SymbolPair.Contains(pairString))
            {
                State.AccountAssets[input.To].SymbolPair.Add(pairString);
            }

            if (liquidityNew == 0)
            {
                State.AccountAssets[Context.Sender].SymbolPair.Remove(pairString);
            }

            State.LiquidityTokens[State.Pairs[input.SymbolA][input.SymbolB].Address][input.To] =
                liquidityToBefore.Add(input.Amount);

            return new Empty();
        }
    }
}