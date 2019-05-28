using System.Collections.Generic;
using AElf.Kernel;
using AElf.OS.Node.Application;

namespace AElf.Blockchains.MainChain
{
    public partial class GenesisSmartContractDtoProvider
    {
        public IEnumerable<GenesisSmartContractDto> GetGenesisSmartContractDtosForHelloWorld(Address zeroContractAddress)
        {
            var l = new List<GenesisSmartContractDto>();

            l.AddGenesisSmartContract<HelloWorldContract.HelloWorldContract>(
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