using System.IO;
using System.Linq;
using AElf.Boilerplate.ContractDeployer;
using AElf.Contracts.TestKit;
using AElf.ContractTestBase;
using AElf.Kernel.SmartContractInitialization;
using AElf.OS.Node.Application;
using AElf.Runtime.CSharp;
using Microsoft.Extensions.DependencyInjection;
using Volo.Abp;
using Volo.Abp.Modularity;

namespace AElf.Boilerplate.TestBase
{
    [DependsOn(
        typeof(SideChainContractTestModule)
    )]
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
            context.Services.AddSingleton<IContractDeploymentListProvider, SideChainDAppContractTestDeploymentListProvider>();
            context.Services.AddSingleton<ISystemContractProvider, SystemContractProvider>();
        }

        public override void OnPreApplicationInitialization(ApplicationInitializationContext context)
        {
            var contractCodeProvider = context.ServiceProvider.GetService<IContractCodeProvider>();
            var contractDeploymentListProvider = new SideChainContractDeploymentListProvider();
            var systemContractProvider = new SystemContractProvider();
            var systemContractInfo = systemContractProvider.GetSystemContractInfo();
            var contractCodes = systemContractInfo
                .Where(i => contractDeploymentListProvider.GetDeployContractNameList().Contains(i.Key))
                .ToDictionary(i => Path.GetFileNameWithoutExtension(i.Value), i => File.ReadAllBytes(i.Value));
            contractCodeProvider.Codes = contractCodes;
        }
    }

    [DependsOn(
        typeof(MainChainContractTestModule)
    )]
    public class MainChainDAppContractTestModule : MainChainContractTestModule
    {
        public override void ConfigureServices(ServiceConfigurationContext context)
        {
            base.ConfigureServices(context);
            Configure<RunnerOptions>(o =>
            {
                o.SdkDir = Path.GetDirectoryName(typeof(MainChainDAppContractTestModule).Assembly.Location);
            });
            context.Services.AddSingleton<IRefBlockInfoProvider, RefBlockInfoProvider>();
            context.Services.AddSingleton<IGenesisSmartContractDtoProvider, GenesisSmartContractDtoProvider>();
            context.Services.AddSingleton<IContractCodeProvider, ContractCodeProvider>();
            context.Services.AddSingleton<IContractDeploymentListProvider, MainChainDAppContractTestDeploymentListProvider>();
            context.Services.AddSingleton<ISystemContractProvider, SystemContractProvider>();
        }

        public override void OnPreApplicationInitialization(ApplicationInitializationContext context)
        {
            var contractCodeProvider = context.ServiceProvider.GetService<IContractCodeProvider>();
            var contractDeploymentListProvider = new MainChainContractDeploymentListProvider();
            var systemContractProvider = new SystemContractProvider();
            var systemContractInfo = systemContractProvider.GetSystemContractInfo();
            var contractCodes = systemContractInfo
                .Where(i => contractDeploymentListProvider.GetDeployContractNameList().Contains(i.Key))
                .ToDictionary(i => Path.GetFileNameWithoutExtension(i.Value), i => File.ReadAllBytes(i.Value));
            contractCodeProvider.Codes = contractCodes;
        }
    }
}