using System.Collections.Generic;
using System.IO;
using AElf.Boilerplate.TestBase;
using AElf.Contracts.MultiToken;
using AElf.Contracts.TestKit;
using AElf.ContractTestBase;
using AElf.Kernel.SmartContractInitialization;
using Microsoft.Extensions.DependencyInjection;
using Volo.Abp;
using Volo.Abp.Modularity;

namespace AElf.Contracts.TokenSwapContract
{
    [DependsOn(
        typeof(MainChainDAppContractTestModule)
    )]
    public class TokenSwapContractTestModule : MainChainDAppContractTestModule
    {
        public override void ConfigureServices(ServiceConfigurationContext context)
        {
            context.Services.AddSingleton<IContractInitializationProvider, TokenSwapContractInitializationProvider>();
            context.Services.AddSingleton<IContractDeploymentListProvider, TokenSwapContractDeploymentList>();
        }
        
        public override void OnPreApplicationInitialization(ApplicationInitializationContext context)
        {
            var contractCodeProvider = context.ServiceProvider.GetService<IContractCodeProvider>();
            var tokenSwapContractLocation = typeof(TokenSwapContract).Assembly.Location;
            var contractCodes = new Dictionary<string, byte[]>(contractCodeProvider.Codes)
            {
                {
                    TokenSwapContractNameProvider.StringName,
                    File.ReadAllBytes(tokenSwapContractLocation)
                }
            };
            contractCodeProvider.Codes = contractCodes;
        }
    }
}