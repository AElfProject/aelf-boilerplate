using System;
using System.Collections.Generic;
using AElf.Contracts.MultiToken;
using AElf.Contracts.TokenConverter;
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

        internal TokenConverterContractContainer.TokenConverterContractReferenceState TokenConverterContract { get; set; }
        /// <summary>
        /// TxId -> Lotteries detail
        /// </summary>
        public MappedState<Hash, Lotteries> Lotteries { get; set; }        

       

       


        /*=====================================
        =            CONFIGURABLES            =
        =====================================*/

        public SingletonState<Address> Admin { get; set; }
        public SingletonState<Address> ParentCasino { get; set; }
        public SingletonState<Timestamp> LastCreateTime { get; set; }
        public SingletonState<long> CurrentLotteryId { get; set; }
        public SingletonState<long> CurrentCheckedLotteryId { get; set; }

        public SingletonState<Hash> RandomHash { get; set; }
        public SingletonState<long> CurrentPeriod { get; set; }

        public StringState TokenSymbol { get; set; }



        /*================================
        =            DATASETS            =
        ================================*/


        public MappedState<long, PeriodBody> Periods { get; set; } 


        public MappedState<long, Hash> RandomNumbers { get; set; } 

        public MappedState<long, Hash> PeriodRandomTokens { get; set; }


        public MappedState<int, long> RuleOdds { get; set; }

        public MappedState<Address, long> SalersBonus { get; set; }


        public MappedState<long, LotteryBody> Lotteries2 { get; set; }  //ERC721


        public MappedState<Address, LotteriesList> UnDoneLotteries { get; set; }

        public MappedState<Address, LotteriesList> DoneLotteries { get; set; }





    }
}