using System.Collections.Generic;
using System.IO;
using AElf.Boilerplate.TestBase;
using AElf.ContractTestBase;
using AElf.Kernel.SmartContract;
using AElf.Kernel.SmartContract.Application;
using Microsoft.Extensions.DependencyInjection;
using Volo.Abp;
using Volo.Abp.Modularity;

namespace AElf.Contracts.FinanceContract
{
    [DependsOn(typeof(MainChainDAppContractTestModule))]
    public class FinanceContractTestModule : MainChainDAppContractTestModule
    {
        public override void ConfigureServices(ServiceConfigurationContext context)
        {
            Configure<ContractOptions>(o=>o.ContractDeploymentAuthorityRequired=false);
          //  context.Services.AddSingleton<IContractInitializationProvider, FinanceContractInitializationProvider>();
        }

        // public override void OnPreApplicationInitialization(ApplicationInitializationContext context)
        // {
        //     var contractCodeProvider = context.ServiceProvider.GetService<IContractCodeProvider>();
        //     var contractDllLocation = typeof(FinanceContract).Assembly.Location;
        //     var contractCodes = new Dictionary<string, byte[]>(contractCodeProvider.Codes)
        //     {
        //         {
        //             new FinanceContractInitializationProvider().ContractCodeName,
        //             File.ReadAllBytes(contractDllLocation)
        //         }
        //     };
        //     contractCodeProvider.Codes = contractCodes;
        // }
    }
}