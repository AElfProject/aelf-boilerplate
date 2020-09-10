using AElf.Standards.ACS3;
using AElf.Contracts.MultiToken;
using AElf.Sdk.CSharp.State;
using AElf.Types;

namespace AElf.Contracts.ACS3DemoContract
{
    public class ACS3DemoContractState : ContractState
    {
        internal TokenContractContainer.TokenContractReferenceState TokenContract { get; set; }

        public MappedState<Hash, ProposalInfo> Proposals { get; set; }

        public SingletonState<ProposalReleaseThreshold> ProposalReleaseThreshold { get; set; }

        public StringState Slogan { get; set; }
    }
}