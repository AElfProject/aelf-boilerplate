using System.Collections.Generic;
using AElf.Blockchains.BasicBaseChain;
using AElf.Kernel.SmartContract;
using AElf.Kernel.SmartContractInitialization;
using Microsoft.Extensions.Options;

namespace AElf.Boilerplate.MainChain
{
    public class MainChainGenesisSmartContractDtoProvider : GenesisSmartContractDtoProviderBase
    {
        private readonly ContractDeployer.ContractDeployer _contractDeployer;
        private readonly ContractOptions _contractOptions;

        public MainChainGenesisSmartContractDtoProvider(IContractDeploymentListProvider contractDeploymentListProvider,
            IServiceContainer<IContractInitializationProvider> contractInitializationProviders,
            IOptionsSnapshot<ContractOptions> contractOptions, ContractDeployer.ContractDeployer contractDeployer)
            : base(contractDeploymentListProvider, contractInitializationProviders)
        {
            _contractDeployer = contractDeployer;
            _contractOptions = contractOptions.Value;
        }

        protected override IReadOnlyDictionary<string, byte[]> GetContractCodes()
        {
            return _contractDeployer.GetContractCodes<MainChainGenesisSmartContractDtoProvider>(_contractOptions
                .GenesisContractDir);
        }
    }
}