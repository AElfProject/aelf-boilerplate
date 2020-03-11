using System.Collections.Generic;
using System.Linq;
using Acs0;
using AElf.Kernel.Consensus;
using AElf.OS.Node.Application;

namespace AElf.Blockchains.MainChain
{
    public partial class GenesisSmartContractDtoProvider
    {
        public IEnumerable<GenesisSmartContractDto> GetGenesisSmartContractDtosForSingleConsensus()
        {
            var l = new List<GenesisSmartContractDto>();

            l.AddGenesisSmartContract(
                _codes.Single(kv => kv.Key.Split(",").First().Trim().Contains("SingleConsensus")).Value,
                ConsensusSmartContractAddressNameProvider.Name,
                new SystemContractDeploymentInput.Types.SystemTransactionMethodCallList());
            return l;
        }
    }
}