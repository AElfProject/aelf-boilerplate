using AElf.Sdk.CSharp;
using AElf.Types;

namespace AElf.Contracts.AESwapContract
{
    public partial class AESwapContract : AESwapContractContainer.AESwapContractBase
    {
        public override AddLiquidityOutput AddLiquidity(AddLiquidityInput input)
        {
            Assert(input.Deadline.Seconds > Context.CurrentBlockTime.Seconds, "Expired");
            Assert(TokenVerify(input.TokenA) && TokenVerify(input.TokenB), "Invalid Tokens");
            var amount = AddLiquidity(input.TokenA, input.TokenB, input.AmountADesired, input.AmountBDesired,
                input.AmountAMin,
                input.AmountBMin);
            var to = State.Pairs[input.TokenA][input.TokenB].Address;
            TransferIn(Context.Sender, to, input.TokenA, amount[0]);
            TransferIn(Context.Sender, to, input.TokenB, amount[1]);
            var liquidityToken = Mint(input.TokenA, input.TokenB, Context.Sender);
            return new AddLiquidityOutput()
            {
                AmountA = amount[0],
                AmountB = amount[1],
                LiquidityToken = liquidityToken,
                SymbolA = input.TokenA,
                SymbolB = input.TokenB
            };
        }

        public override RemoveLiquidityOutput RemoveLiquidity(RemoveLiquidityInput input)
        {
            Assert(input.Deadline.Seconds > Context.CurrentBlockTime.Seconds, "Expired");
            Assert(TokenVerify(input.SymbolA) && TokenVerify(input.SymbolB), "Invalid Tokens");
            var amount = RemoveLiquidity(input.SymbolA, input.SymbolB, input.LiquidityToken, input.AmountAMin,
                input.AmountBMin);
            return new RemoveLiquidityOutput()
            {
                AmountA = amount[0],
                AmountB = amount[1]
            };
        }

        public override CreatePairOutput CreatePair(CreatePairInput input)
        {
            var tokenPair = SortTokens(input.SymbolPair);
            Assert(tokenPair[0] != tokenPair[1], "Identical Tokens");
            Assert(State.Pairs[tokenPair[0]][tokenPair[1]] != null, "Pair Exists");
            var hash = HashHelper.ComputeFrom(GetPair(input.SymbolPair));
            State.Pairs[tokenPair[0]][tokenPair[1]].Hash = hash;
            State.Pairs[tokenPair[1]][tokenPair[0]].Hash = hash;
            var address = Context.ConvertVirtualAddressToContractAddress(hash);
            State.Pairs[tokenPair[1]][tokenPair[0]].Address = address;
            State.Pairs[tokenPair[1]][tokenPair[0]].Address = address;
            //add to PairList
            var pairList = State.AllPairs.Value ?? new PairList();
            pairList.SymbolPair.Add(input.SymbolPair);
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
    }
}