using AElf.Sdk.CSharp;
using AElf.Types;
namespace AElf.Contracts.AESwapContract
{
    public  partial class AESwapContract:AESwapContractContainer.AESwapContractBase
    {
        public override AddLiquidityOutput AddLiquidity(AddLiquidityInput input)
        {
            return base.AddLiquidity(input);
        }

        public override CreatePairOutput CreatePair(CreatePairInput input)
        {
            var tokenPair = SortTokens(input.SymbolPair);
            Assert(tokenPair[0] != tokenPair[1], "Identical Tokens");
            Assert(State.Pairs[tokenPair[0]][tokenPair[1]]!=null,"Pair Exists");
            var address = Address.FromBytes(GetPair(input.SymbolPair).GetHashCode().ToBytes());
            State.Pairs[tokenPair[0]][tokenPair[1]] = address;
            State.Pairs[tokenPair[1]][tokenPair[0]] = address;
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