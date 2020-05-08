using System.IO;
using AElf.Contracts.Deployer;
using AElf.Contracts.TestKit;
using AElf.ContractTestBase;
using AElf.Kernel.SmartContractInitialization;
using AElf.OS.Node.Application;
using AElf.Runtime.CSharp;
using Microsoft.Extensions.DependencyInjection;
using Volo.Abp;
using Volo.Abp.Modularity;

namespace AElf.Contracts.DAppContractTestBase
{
    public class SideChainDAppContractTestModule : SideChainContractTestModule
    {
        public override void ConfigureServices(ServiceConfigurationContext context)
        {
            base.ConfigureServices(context);
            Configure<RunnerOptions>(o =>
            {
                o.SdkDir = Path.GetDirectoryName(typeof(SideChainContractTestModule).Assembly.Location);
            });
            context.Services.AddSingleton<IRefBlockInfoProvider, RefBlockInfoProvider>();
            context.Services.AddSingleton<IGenesisSmartContractDtoProvider, GenesisSmartContractDtoProvider>();
            context.Services.AddSingleton<IContractCodeProvider, ContractCodeProvider>();
            context.Services
                .AddSingleton<IContractDeploymentListProvider, SideChainContractDeploymentListProvider>();
        }

        public override void OnPreApplicationInitialization(ApplicationInitializationContext context)
        {
            var contractCodeProvider = context.ServiceProvider.GetService<IContractCodeProvider>();
            //contractCodeProvider.Codes = ContractsDeployer.GetContractCodes<SideChainContractTestModule>();
        }
    }
    
    public class MainChainDAppContractTestModule : MainChainContractTestModule
    {
        public override void ConfigureServices(ServiceConfigurationContext context)
        {
            base.ConfigureServices(context);
            Configure<RunnerOptions>(o =>
            {
                o.SdkDir = Path.GetDirectoryName(typeof(SideChainDAppContractTestModule).Assembly.Location);
            });
            context.Services.AddSingleton<IRefBlockInfoProvider, RefBlockInfoProvider>();
            context.Services.AddSingleton<IGenesisSmartContractDtoProvider, GenesisSmartContractDtoProvider>();
            context.Services.AddSingleton<IContractCodeProvider, ContractCodeProvider>();
            context.Services
                .AddSingleton<IContractDeploymentListProvider, MainChainContractDeploymentListProvider>();
        }

        public override void OnPreApplicationInitialization(ApplicationInitializationContext context)
        {
            var contractCodeProvider = context.ServiceProvider.GetService<IContractCodeProvider>();
            //contractCodeProvider.Codes = ContractsDeployer.GetContractCodes<ACS1DemoContractTestModule>();
        }
    }
}