using System.Collections.Generic;
using System.Linq;
using Acs0;
using AElf.Kernel;
using AElf.OS.Node.Application;
using AElf.Types;
using HelloWorldContract;

namespace AElf.Blockchains.MainChain
{
    public partial class GenesisSmartContractDtoProvider
    {
        public IEnumerable<GenesisSmartContractDto> GetGenesisSmartContractDtosForHelloWorld(Address zeroContractAddress)
        {
            var l = new List<GenesisSmartContractDto>();

            l.AddGenesisSmartContract(
                _codes.Single(kv=>kv.Key.Contains("HelloWorld")).Value,
                Hash.FromString("HelloWorldContract"), GenerateHelloWorldInitializationCallList());

            return l;
        }

        private SystemContractDeploymentInput.Types.SystemTransactionMethodCallList GenerateHelloWorldInitializationCallList()
        {
            var profitContractMethodCallList = new SystemContractDeploymentInput.Types.SystemTransactionMethodCallList();
            return profitContractMethodCallList;
        }
    }
}