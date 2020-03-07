using AElf.Contracts.MultiToken;
using AElf.Sdk.CSharp.State;
using AElf.Types;

namespace AElf.Contracts.LotteryDemoContract
{
    public class LotteryDemoContractState : ContractState
    {
        internal Acs6.RandomNumberProviderContractContainer.RandomNumberProviderContractReferenceState
            RandomNumberGenerationContract { get; set; }

        internal TokenContractContainer.TokenContractReferenceState TokenContract { get; set; }

        /// <summary>
        /// TxId -> Lotteries detail
        /// </summary>
        public MappedState<Hash, Lotteries> Lotteries { get; set; }

        public MappedState<long, Hash> RandomNumberTokens { get; set; }

        public Int64State CurrentPeriod { get; set; }

        public StringState TokenSymbol { get; set; }
    }
}