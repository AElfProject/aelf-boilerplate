using AElf.Standards.ACS9;
using AElf.Standards.ACS10;
using AElf.Contracts.MultiToken;
using AElf.Contracts.TokenHolder;
using AElf.Sdk.CSharp.State;
using AElf.Types;

namespace AElf.Contracts.ACS9DemoContract
{
    public class ACS9DemoContractState : ContractState
    {
        internal TokenHolderContractContainer.TokenHolderContractReferenceState TokenHolderContract { get; set; }
        internal TokenContractContainer.TokenContractReferenceState TokenContract { get; set; }
        internal DividendPoolContractContainer.DividendPoolContractReferenceState DividendPoolContract { get; set; }

        public SingletonState<string> Symbol { get; set; }
        public SingletonState<Address> ProfitReceiver { get; set; }
        public MappedState<Address, Profile> Profiles { get; set; }

        public SingletonState<ProfitConfig> ProfitConfig { get; set; }
    }
}