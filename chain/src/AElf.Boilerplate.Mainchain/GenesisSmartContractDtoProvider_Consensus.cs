using System.Collections.Generic;
using System.Linq;
using AElf.Contracts.Consensus.AEDPoS;
using AElf.Kernel;
using AElf.Kernel.Consensus.AEDPoS;
using AElf.Kernel.Token;
using AElf.OS.Node.Application;
using Google.Protobuf;

namespace AElf.Blockchains.MainChain
{
    public partial class GenesisSmartContractDtoProvider
    {
        public IEnumerable<GenesisSmartContractDto> GetGenesisSmartContractDtosForConsensus(Address zeroContractAddress)
        {
            var l = new List<GenesisSmartContractDto>();
            l.AddGenesisSmartContract<AEDPoSContract>(ConsensusSmartContractAddressNameProvider.Name,
                GenerateConsensusInitializationCallList());
            return l;
        }

        private SystemContractDeploymentInput.Types.SystemTransactionMethodCallList
            GenerateConsensusInitializationCallList()
        {
            var consensusMethodCallList = new SystemContractDeploymentInput.Types.SystemTransactionMethodCallList();
            consensusMethodCallList.Add(nameof(AEDPoSContract.InitialAElfConsensusContract),
                new InitialAElfConsensusContractInput
                {
                    ElectionContractSystemName = ElectionSmartContractAddressNameProvider.Name,
                    VoteContractSystemName = VoteSmartContractAddressNameProvider.Name,
                    TokenContractSystemName = TokenSmartContractAddressNameProvider.Name,
                    TimeEachTerm = int.MaxValue
                });
            consensusMethodCallList.Add(nameof(AEDPoSContract.FirstRound),
                new Miners
                {
                    PublicKeys =
                    {
                        _consensusOptions.InitialMiners.Select(p =>
                            ByteString.CopyFrom(ByteArrayHelpers.FromHexString(p)))
                    }
                }.GenerateFirstRoundOfNewTerm(_consensusOptions.MiningInterval,
                    _consensusOptions.StartTimestamp.ToUniversalTime()));
            return consensusMethodCallList;
        }
    }
}