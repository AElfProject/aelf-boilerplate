using AElf.Standards.ACS10;
using AElf.Contracts.MultiToken;
using AElf.Contracts.TokenHolder;
using AElf.Sdk.CSharp.State;
using AElf.Types;

namespace AElf.Contracts.ACS10DemoContract
{
    public class ACS10DemoContractState : ContractState
    {
        internal TokenHolderContractContainer.TokenHolderContractReferenceState TokenHolderContract { get; set; }
        internal TokenContractContainer.TokenContractReferenceState TokenContract { get; set; }
        
        public SingletonState<Hash> DividendPoolSchemeId { get; set; }
        public MappedState<long, Dividends> ReceivedDividends { get; set; }
    }
}