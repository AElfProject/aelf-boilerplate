using AElf.Contracts.MultiToken;
using AElf.Sdk.CSharp.State;
using AElf.Types;
using AElf.Contracts.Consensus.AEDPoS;
using Acs1;
using AElf.Contracts.Parliament;

namespace AElf.Contracts.LotteryDemoContract
{
    public class LotteryDemoContractState : ContractState
    {
        internal AEDPoSContractContainer.AEDPoSContractReferenceState AEDPoSContract { get; set; }
        internal ParliamentContractContainer.ParliamentContractReferenceState ParliamentContract { get; set; }
        internal TokenContractContainer.TokenContractReferenceState TokenContract { get; set; }

        /// <summary>
        /// TxId -> Lotteries detail
        /// </summary>

        public SingletonState<ulong> CurrentPeriod { get; set; }
        public SingletonState<ulong> CurrentLotteryId { get; set; }
        public StringState TokenSymbol { get; set; }
        public SingletonState<Address> Admin { get; set; }

        public MappedState<ulong, PeriodBody> Periods { get; set; }
        public MappedState<ulong, Lottery> Lotteries { get; set; }
        public MappedState<Hash, Address> LotteryToOwner { get; set; }
        public MappedState<Hash, ulong> LotteryToId { get; set; }
        public MappedState<Address, LotteryList> OwnerToLotteries { get; set; }
        public MappedState<ulong, RewardResultsList> PeriodToResultsList { get; set; }
        public MappedState<Hash, StringState> LotteryToData { get; set; }
        public MappedState<string, MethodFees> TransactionFees { get; set; }
        public SingletonState<AuthorityInfo> MethodFeeController { get; set; }
    }
}