using System.Collections.Generic;
using System.IO;
using AElf.Boilerplate.TestBase;
using AElf.ContractTestBase.ContractTestKit;
using AElf.ContractTestBase;
using AElf.Kernel.Consensus.AEDPoS;
using AElf.Kernel.SmartContract.Application;
using Microsoft.Extensions.DependencyInjection;
using Volo.Abp;
using Volo.Abp.Modularity;

namespace AElf.Contracts.ACS10DemoContract
{
    [DependsOn(
        typeof(MainChainDAppContractTestModule)
    )]
    public class ACS10DemoContractTestModule : MainChainDAppContractTestModule
    {
        public override void ConfigureServices(ServiceConfigurationContext context)
        {
            context.Services.AddSingleton<IContractInitializationProvider, ACS10DemoContractInitializationProvider>();
        }

        public override void OnPreApplicationInitialization(ApplicationInitializationContext context)
        {
            var contractCodeProvider = context.ServiceProvider.GetService<IContractCodeProvider>();
            var contractDllLocation = typeof(ACS10DemoContract).Assembly.Location;
            var contractCodes = new Dictionary<string, byte[]>(contractCodeProvider.Codes)
            {
                {
                    new ACS10DemoContractInitializationProvider().ContractCodeName,
                    File.ReadAllBytes(contractDllLocation)
                }
            };
            contractCodeProvider.Codes = contractCodes;
        }
    }
}