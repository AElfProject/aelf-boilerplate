using System.Collections.Generic;
using System.IO;
using AElf.Boilerplate.TestBase;
using AElf.ContractTestBase;
using AElf.Kernel.SmartContract.Application;
using Microsoft.Extensions.DependencyInjection;
using Volo.Abp;
using Volo.Abp.Modularity;

namespace AElf.Contracts.ACS9DemoContract
{
    [DependsOn(
        typeof(MainChainDAppContractTestModule)
    )]
    public class ACS9DemoContractTestModule : MainChainDAppContractTestModule
    {
        public override void ConfigureServices(ServiceConfigurationContext context)
        {
            context.Services.AddSingleton<IContractInitializationProvider, ACS9DemoContractInitializationProvider>();
            context.Services.AddSingleton<IContractInitializationProvider, ACS10DemoContractInitializationProvider>();
            context.Services.AddSingleton<IContractDeploymentListProvider, ACS9DemoContractDeploymentList>();
        }

        public override void OnPreApplicationInitialization(ApplicationInitializationContext context)
        {
            var contractCodeProvider = context.ServiceProvider.GetService<IContractCodeProvider>();
            var contractDllLocationOfACS9DemoContract = typeof(ACS9DemoContract).Assembly.Location;
            var contractDllLocationOfACS10DemoContract = typeof(ACS10DemoContract.ACS10DemoContract).Assembly.Location;
            var contractCodes = new Dictionary<string, byte[]>(contractCodeProvider.Codes)
            {
                {
                    new ACS9DemoContractInitializationProvider().ContractCodeName,
                    File.ReadAllBytes(contractDllLocationOfACS9DemoContract)
                },
                {
                    new ACS10DemoContractInitializationProvider().ContractCodeName,
                    File.ReadAllBytes(contractDllLocationOfACS10DemoContract)
                }
            };
            contractCodeProvider.Codes = contractCodes;
        }
    }
}