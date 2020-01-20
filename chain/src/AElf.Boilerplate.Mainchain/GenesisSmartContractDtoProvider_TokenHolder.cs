using System.Collections.Generic;
using System.Linq;
using Acs0;
using AElf.OS.Node.Application;
using AElf.Contracts.TokenHolder;
using AElf.Types;

namespace AElf.Blockchains.MainChain
{
    public partial class GenesisSmartContractDtoProvider
    {
        /*private IEnumerable<GenesisSmartContractDto> GetGenesisSmartContractDtosForTokenHolder()
        {
            var l = new List<GenesisSmartContractDto>();
            l.AddGenesisSmartContract(
                _codes.Single(kv => kv.Key.Contains("TokenHolder")).Value,
                TokenHolderSmartContractAddressNameProvider.Name,
                //Hash.FromString("TokenConverter"),
                new SystemContractDeploymentInput.Types.SystemTransactionMethodCallList());
            return l;
        }*/
    }
}