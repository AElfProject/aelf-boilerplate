using System.Collections.Generic;
using System.IO;
using AElf.ContractDeployer;
using AElf.ContractTestBase;
using AElf.ContractTestBase.ContractTestKit;
using AElf.Kernel.Consensus.AEDPoS;
using AElf.Kernel.Miner.Application;
using AElf.Kernel.SmartContract.Application;
using AElf.OS.Node.Application;
using AElf.Runtime.CSharp;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.DependencyInjection.Extensions;
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

            Configure<ConsensusOptions>(options =>
            {
                options.MiningInterval = 4000;
                options.InitialMinerList = new List<string> {SampleAccount.Accounts[0].KeyPair.PublicKey.ToHex()};
            });
            
            context.Services.RemoveAll<ISystemTransactionGenerator>();
        }

        public override void OnPreApplicationInitialization(ApplicationInitializationContext context)
        {
            var contractCodeProvider = context.ServiceProvider.GetService<IContractCodeProvider>();
            contractCodeProvider.Codes = ContractsDeployer.GetContractCodes<SideChainDAppContractTestModule>();
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
            
            Configure<ConsensusOptions>(options =>
            {
                options.MiningInterval = 4000;
                options.InitialMinerList = new List<string> {SampleAccount.Accounts[0].KeyPair.PublicKey.ToHex()};
            });

            context.Services.RemoveAll<ISystemTransactionGenerator>();
        }

        public override void OnPreApplicationInitialization(ApplicationInitializationContext context)
        {
            var contractCodeProvider = context.ServiceProvider.GetService<IContractCodeProvider>();
            contractCodeProvider.Codes = ContractsDeployer.GetContractCodes<SideChainDAppContractTestModule>();
        }
    }
}