using System.Collections.Generic;
using System.Linq;
using AElf.OS.Node.Application;
using Microsoft.Extensions.Options;

namespace AElf.Blockchains.MainChain
{
    public partial class GenesisSmartContractDtoProvider : IGenesisSmartContractDtoProvider
    {
        private readonly AElf.Kernel.Consensus.AEDPoS.ConsensusOptions _consensusOptions;

        public GenesisSmartContractDtoProvider(IOptionsSnapshot<AElf.Kernel.Consensus.AEDPoS.ConsensusOptions> consensusOptions)
        {
            _consensusOptions = consensusOptions.Value;
        }

        public string Symbol { get; } = "ELF";

        public IEnumerable<GenesisSmartContractDto> GetGenesisSmartContractDtos(Address zeroContractAddress)
        {
            // The order matters !!!
            return new[]
            {
                GetGenesisSmartContractDtosForVote(zeroContractAddress),
                GetGenesisSmartContractDtosForProfit(zeroContractAddress),
                GetGenesisSmartContractDtosForElection(zeroContractAddress),
                GetGenesisSmartContractDtosForToken(zeroContractAddress),
                GetGenesisSmartContractDtosForConsensus(zeroContractAddress),
                GetGenesisSmartContractDtosForHelloWorld(zeroContractAddress),
                GetGenesisSmartContractDtosForBingoGame(zeroContractAddress)
            }.SelectMany(x => x);
        }
    }
}