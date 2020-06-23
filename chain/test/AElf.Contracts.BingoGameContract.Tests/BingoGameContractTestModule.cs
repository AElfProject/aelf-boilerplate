using System.Collections.Generic;
using System.IO;
using AElf.Boilerplate.TestBase;
using AElf.ContractTestBase;
using AElf.Kernel.SmartContract.Application;
using AElf.Kernel.SmartContract.Application;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.DependencyInjection.Extensions;
using Volo.Abp;
using Volo.Abp.Modularity;

namespace AElf.Contracts.BingoGameContract
{
    [DependsOn(typeof(MainChainDAppContractTestModule))]
    public class BingoGameContractTestModule : MainChainDAppContractTestModule
    {
        public override void ConfigureServices(ServiceConfigurationContext context)
        {
            context.Services.AddSingleton<IContractInitializationProvider, BingoGameContractInitializationProvider>();

            context.Services.RemoveAll<IPreExecutionPlugin>();
            context.Services.RemoveAll<IPostExecutionPlugin>();
        }

        public override void OnPreApplicationInitialization(ApplicationInitializationContext context)
        {
            var contractCodeProvider = context.ServiceProvider.GetService<IContractCodeProvider>();
            var contractDllLocation = typeof(BingoGameContract).Assembly.Location;
            var contractCodes = new Dictionary<string, byte[]>(contractCodeProvider.Codes)
            {
                {
                    new BingoGameContractInitializationProvider().ContractCodeName,
                    File.ReadAllBytes(contractDllLocation)
                }
            };
            contractCodeProvider.Codes = contractCodes;
        }
    }
}