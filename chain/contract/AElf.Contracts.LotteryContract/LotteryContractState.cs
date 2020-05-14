using System;
using AElf.Contracts.MultiToken;
using AElf.Sdk.CSharp.State;
using AElf.Types;
using Acs1;
using AElf.Contracts.Consensus.AEDPoS;

namespace AElf.Contracts.LotteryContract
{
    public class LotteryContractState : ContractState
    {
        // ReSharper disable once InconsistentNaming
        internal AEDPoSContractContainer.AEDPoSContractReferenceState AEDPoSContract { get; set; }
        internal TokenContractImplContainer.TokenContractImplReferenceState TokenContract { get; set; }

        public StringState TokenSymbol { get; set; }

        public SingletonState<long> Price { get; set; }

        public SingletonState<long> MaximumAmount { get; set; }

        public SingletonState<long> DrawingLag { get; set; }

        public SingletonState<Address> Admin { get; set; }

        public SingletonState<long> CurrentPeriod { get; set; }

        public SingletonState<long> SelfIncreasingIdForLottery { get; set; }

        public MappedState<long, PeriodBody> Periods { get; set; }

        public MappedState<long, Lottery> Lotteries { get; set; }

        public MappedState<Address, long, LotteryList> OwnerToLotteries { get; set; }

        public SingletonState<long> RewardCount { get; set; }
    }
}