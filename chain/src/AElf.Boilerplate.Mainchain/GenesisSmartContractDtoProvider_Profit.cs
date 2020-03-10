using System.Collections.Generic;
using System.Linq;
using Acs0;
using AElf.Blockchains.BasicBaseChain.ContractNames;
using AElf.Contracts.Profit;
using AElf.Kernel;
using AElf.Kernel.Token;
using AElf.OS.Node.Application;
using AElf.Types;
using Google.Protobuf.WellKnownTypes;

namespace AElf.Blockchains.MainChain
{
    public partial class GenesisSmartContractDtoProvider
    {
        public IEnumerable<GenesisSmartContractDto> GetGenesisSmartContractDtosForProfit()
        {
            var l = new List<GenesisSmartContractDto>();

            l.AddGenesisSmartContract(
                _codes.Single(kv=>kv.Key.Contains("Profit")).Value,
                ProfitSmartContractAddressNameProvider.Name, GenerateProfitInitializationCallList());

            return l;
        }

        private SystemContractDeploymentInput.Types.SystemTransactionMethodCallList GenerateProfitInitializationCallList()
        {
            var profitContractMethodCallList = new SystemContractDeploymentInput.Types.SystemTransactionMethodCallList();

            return profitContractMethodCallList;
        }
    }
}