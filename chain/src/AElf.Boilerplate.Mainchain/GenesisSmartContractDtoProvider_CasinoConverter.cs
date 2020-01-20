using System.Collections.Generic;
using System.Linq;
using Acs0;
using AElf.OS.Node.Application;
using AElf.Types;

namespace AElf.Blockchains.MainChain
{
    public partial class GenesisSmartContractDtoProvider
    {
        public IEnumerable<GenesisSmartContractDto> GetGenesisSmartContractDtosForCasinoConverter()
        {
            var dto = new List<GenesisSmartContractDto>();
            dto.AddGenesisSmartContract(
                _codes.Single(kv => kv.Key.Contains("CasinoConverter")).Value,
                Hash.FromString("AElf.ContractNames.CasinoConverter"), new SystemContractDeploymentInput.Types.SystemTransactionMethodCallList());
            return dto;
        }
    }
}