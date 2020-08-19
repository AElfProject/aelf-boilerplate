using AElf.Contracts.MultiToken;
using AElf.Sdk.CSharp.State;
using AElf.Types;

namespace AElf.Contracts.AESwapContract
{
    public class AESwapContractState : ContractState
    {
        internal TokenContractContainer.TokenContractReferenceState TokenContract { get; set; }

        public MappedState<Address, string, long> TotalReserves { get; set; }

        public MappedState<Address, long> TotalSupply { get; set; }

        public MappedState<Address, string, long> PriceCumulativeLast { get; set; }

        public MappedState<string, string, Pair> Pairs { get; set; }

        public SingletonState<PairList> AllPairs { get; set; }

        public MappedState<Address, long> BlockTimestampLast { get; set; }

        public MappedState<Address, long> KLast { get; set; }

        /// <summary>
        /// LiquidityToken balances for each account in different  Pair
        /// </summary>
        public MappedState<Address, Address, long> LiquidityTokens { get; set; }
    }
}