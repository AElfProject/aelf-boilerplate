using AElf.Sdk.CSharp.State;
using AElf.Contracts.TokenConverter;
using AElf.Contracts.MultiToken;
using AElf.Contracts.Profit;
using AElf.Contracts.TokenHolder;
using AElf.Contracts.CasinoConverter;
using AElf.Types;
using Google.Protobuf.WellKnownTypes;

namespace AElf.Contracts.CasinoContract
{
    public class CasinoContractState : ContractState
    {

        /*=====================================
        =            CONFIGURABLES            =
        =====================================*/
        
        //Tokenconverter可能用不到
        internal TokenConverterContractContainer.TokenConverterContractReferenceState TokenConverterContract { get; set; }
        internal TokenContractContainer.TokenContractReferenceState TokenContract { get; set; }

        internal ProfitContractContainer.ProfitContractReferenceState ProfitContract { get; set; }

        internal TokenHolderContractContainer.TokenHolderContractReferenceState TokenHolderContract { get; set; }

        internal CasinoConverterContractContainer.CasinoConverterContractReferenceState CasinoConverterContract { get; set; }
        


        public StringState TokenSymbol { get; set; }
        public StringState Connector { get; set; }

        public SingletonState<long> Decimals { get; set; }

        public SingletonState<long> TokenSupply { get; set; }

        public SingletonState<Address> LotteryContract { get; set; }

        public SingletonState<Timestamp> LastCollectTime { get; set; }

       


        /*================================
        =            DATASETS            =
        ================================*/

        public MappedState<long, long> Periods { get; set; }

        internal MappedState<Address, long> TokenBalance { get; set; }
        internal MappedState<Address, long> DividendBalance { get; set; }

        internal MappedState<int, Address> ChildCasinos { get; set; }






    }
}