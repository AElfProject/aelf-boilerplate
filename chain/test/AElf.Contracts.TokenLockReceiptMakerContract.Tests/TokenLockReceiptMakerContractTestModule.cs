using System.Collections.Generic;
using System.IO;
using AElf.Boilerplate.TestBase;
using AElf.Contracts.TokenLockReceiptMakerContract.Tests;
using AElf.ContractTestBase;
using AElf.ContractTestBase.ContractTestKit;
using AElf.Kernel.SmartContract.Application;
using Microsoft.Extensions.DependencyInjection;
using Volo.Abp;
using Volo.Abp.Modularity;

namespace AElf.Contracts.TokenLockReceiptMakerContract
{
    [DependsOn(typeof(MainChainDAppContractTestModule))]
    // ReSharper disable once InconsistentNaming
    public class TokenLockReceiptMakerContractTestModule : MainChainDAppContractTestModule
    {
        public override void ConfigureServices(ServiceConfigurationContext context)
        {
            context.Services.AddSingleton<IContractDeploymentListProvider, ContractDeploymentList>();
            context.Services.AddSingleton<IContractInitializationProvider, TokenLockReceiptMakerContractInitializationProvider>();
            context.Services.AddSingleton<IBlockTimeProvider, BlockTimeProvider>();
        }

        public override void OnPreApplicationInitialization(ApplicationInitializationContext context)
        {
            var contractCodeProvider = context.ServiceProvider.GetService<IContractCodeProvider>();
            var contractDllLocation = typeof(TokenLockReceiptMakerContract).Assembly.Location;
            var contractCodes = new Dictionary<string, byte[]>(contractCodeProvider.Codes)
            {
                {
                    TokenLockReceiptMakerContractNameProvider.StringName,
                    File.ReadAllBytes(contractDllLocation)
                }
            };
            contractCodeProvider.Codes = contractCodes;
        }
    }
}