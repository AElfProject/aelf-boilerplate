using System.Collections.Generic;
using System.Linq;
using Acs0;
using AElf.OS.Node.Application;
using AElf.Types;

namespace AElf.Blockchains.MainChain
{
    public partial class GenesisSmartContractDtoProvider
    {
        public IEnumerable<GenesisSmartContractDto> GetGenesisSmartContractDtosForHelloWorld()
        {
            var dto = new List<GenesisSmartContractDto>();
            dto.AddGenesisSmartContract(
                _codes.Single(kv=>kv.Key.Contains("HelloWorld")).Value,
                Hash.FromString("AElf.ContractNames.HelloWorld"), new SystemContractDeploymentInput.Types.SystemTransactionMethodCallList());
            return dto;
        }
    }
}