using System;
using AElf.Contracts.MultiToken;
using AElf.Sdk.CSharp.State;
using AElf.Types;
using Google.Protobuf.WellKnownTypes;

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

//        public MappedState<long, Hash> PeriodRandomNumberTokens { get; set; }
        public MappedState<long, PeriodRandomNumberToken> PeriodRandomNumberTokens { get; set; }
        
//        public MappedState<long, long> LotteryRecord { get; set; }
        public MappedState<Hash, int> RandomNumberTokens { get; set; } // 会有更好的设计的

        public SingletonState<long> CurrentPeriod { get; set; }
        public SingletonState<Timestamp> CurrentTimeStamp { get; set; }
        public BoolState ReadyToNextPeriod { get; set; }

        public StringState TokenSymbol { get; set; }

        public SingletonState<Address> Sponsor { get; set; }
    }
}