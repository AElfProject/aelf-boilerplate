using System.Collections.Generic;
using AElf.Kernel;
using AElf.Kernel.Token;
using AElf.OS.Node.Application;
using HelloWorldContract;

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
            var helloContractMethodCallList = new SystemContractDeploymentInput.Types.SystemTransactionMethodCallList();
            
            // 作为系统合约自动部署。
            helloContractMethodCallList.Add("InitializeHelloContract", new InitializeHelloContractInput
            {
                TokenContractSystemName = TokenSmartContractAddressNameProvider.Name
            });
            
            return helloContractMethodCallList;
        }
    }
}