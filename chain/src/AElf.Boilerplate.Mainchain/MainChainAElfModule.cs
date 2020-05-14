using AElf.Blockchains.BasicBaseChain;
using AElf.Boilerplate.DAppContract;
using AElf.Database;
using AElf.Kernel.Infrastructure;
using AElf.Kernel.SmartContractInitialization;
using AElf.Modularity;
using AElf.OS.Node.Application;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Logging.Abstractions;
using Volo.Abp.Modularity;

namespace AElf.Boilerplate.MainChain
{
    [DependsOn(
        typeof(BasicBaseChainAElfModule),
        typeof(DAppContractModule)
    )]
    public class MainChainAElfModule : AElfModule
    {
        public ILogger<MainChainAElfModule> Logger { get; set; }

        public MainChainAElfModule()
        {
            Logger = NullLogger<MainChainAElfModule>.Instance;
        }

        public override void ConfigureServices(ServiceConfigurationContext context)
        {
            var services = context.Services;
            services.AddTransient<IContractDeploymentListProvider, MainChainContractDeploymentListProvider>();
            services.AddTransient<IGenesisSmartContractDtoProvider, MainChainGenesisSmartContractDtoProvider>();

            services.AddSingleton(typeof(ContractDeployer.ContractDeployer));

            services.AddKeyValueDbContext<BlockchainKeyValueDbContext>(p => p.UseInMemoryDatabase());
            services.AddKeyValueDbContext<StateKeyValueDbContext>(p => p.UseInMemoryDatabase());
        }
    }
}