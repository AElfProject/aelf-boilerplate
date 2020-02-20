using Acs1;
using AElf.Contracts.Genesis;
using AElf.Contracts.MultiToken;
using AElf.Sdk.CSharp.State;
using AElf.Types;
//using AElf.Contracts.Consensus.AEDPoS;
using AElf.Contracts.Parliament;


namespace AElf.Contracts.CasinoConverter
{
    public class CasinoConverterContractState : ContractState
    {
        public StringState BaseTokenSymbol { get; set; }
        public StringState FeeRate { get; set; }
        public Int32State ConnectorCount { get; set; }
        public MappedState<int, string> ConnectorSymbols { get; set; }
        public MappedState<string, Connector> Connectors { get; set; }
        internal TokenContractContainer.TokenContractReferenceState TokenContract { get; set; }
        internal BasicContractZeroContainer.BasicContractZeroReferenceState BasicContractZero { get; set; }
        public SingletonState<Address> FeeReceiverAddress { get; set; }
        public SingletonState<Address> ManagerAddress { get; set; }
        //public MappedState<string, MethodFees> TransactionFees { get; set; }
        public MappedState<string, long> DepositBalance { get; set; }


        //用户的推广码
        public MappedState<string, Address> ReferralTokens { get; set; }
        public MappedState<Address, string> AddressReferralTokens { get; set; }
        public MappedState<Address, Address> ChildToFather { get; set; }

        public MappedState<long, ReferralBuyRequest> ReferralBuyRequests { get; set; }
        public MappedState<Address, ReferralBuyRequestList> OwnerToRequestsId { get; set; }

        

        


        internal ParliamentContractContainer.ParliamentContractReferenceState ParliamentContract { get; set; }

        public MappedState<string, MethodFees> TransactionFees { get; set; }
        public SingletonState<AuthorityInfo> MethodFeeController { get; set; }
    }
}