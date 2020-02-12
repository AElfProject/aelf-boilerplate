using System.Collections.Generic;
using System.Linq;
using Acs0;
using AElf.Contracts.LotteryDemoContract;
using AElf.OS.Node.Application;
using AElf.Types;

namespace AElf.Blockchains.MainChain
{
    public partial class GenesisSmartContractDtoProvider
    {
        public IEnumerable<GenesisSmartContractDto> GetGenesisSmartContractDtosForLotteryDemo()
        {
            var l = new List<GenesisSmartContractDto>();

            l.AddGenesisSmartContract(
                _codes.Single(kv => kv.Key.Contains("LotteryDemo")).Value,
                Hash.FromString("AElf.ContractNames.LotteryDemo"), new SystemContractDeploymentInput.Types.SystemTransactionMethodCallList());

            return l;
        }

    }
}