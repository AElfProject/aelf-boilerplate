using AElf;
using AElf.Contracts.Consensus.DPoS;
using AElf.Contracts.Genesis;
using AElf.Contracts.MultiToken.Messages;
using AElf.Sdk.CSharp.State;

namespace BingoGameContract
{
    public partial class BingoGameContractState
    {
        internal BasicContractZeroContainer.BasicContractZeroReferenceState BasicContractZero { get; set; }
        internal TokenContractContainer.TokenContractReferenceState TokenContract { get; set; }
        internal ConsensusContractContainer.ConsensusContractReferenceState ConsensusContract { get; set; }

        public SingletonState<Hash> TokenContractSystemName { get; set; }
        public SingletonState<Hash> ContractContractSystemName { get; set; }
    }
}