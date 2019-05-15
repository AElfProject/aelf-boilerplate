using System;
using System.Collections.Generic;
using System.Linq;
using AElf.OS.Node.Application;
using Microsoft.Extensions.Options;

namespace AElf.Blockchains.MainChain
{
    public partial class GenesisSmartContractDtoProvider : IGenesisSmartContractDtoProvider
    {
        private readonly ConsensusOptions _consensusOptions;
        private readonly TokenInitialOptions _tokenInitialOptions;

        public GenesisSmartContractDtoProvider(IOptionsSnapshot<ConsensusOptions> dposOptions,
            IOptionsSnapshot<TokenInitialOptions> tokenInitialOptions)
        {
            _consensusOptions = dposOptions.Value;
            _tokenInitialOptions = tokenInitialOptions.Value;
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
            }.SelectMany(x => x);
        }
    }
}