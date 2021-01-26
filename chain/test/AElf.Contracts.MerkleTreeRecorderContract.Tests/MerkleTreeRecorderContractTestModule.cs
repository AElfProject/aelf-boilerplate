using System.Collections.Generic;
using System.IO;
using AElf.Boilerplate.TestBase;
using AElf.ContractTestBase;
using AElf.Kernel.SmartContract.Application;
using Microsoft.Extensions.DependencyInjection;
using Volo.Abp;
using Volo.Abp.Modularity;

namespace AElf.Contracts.MerkleTreeRecorderContract
{
    [DependsOn((typeof(SideChainDAppContractTestModule)))]
    public class MerkleTreeRecorderContractTestModule : SideChainDAppContractTestModule
    {
        public override void ConfigureServices(ServiceConfigurationContext context)
        {
            context.Services.AddSingleton<IContractInitializationProvider, MerkleTreeRecorderContractInitializationProvider>();
            context.Services.AddSingleton<IContractDeploymentListProvider, MerkleTreeRecorderContractDeploymentList>();
        }
        
        public override void OnPreApplicationInitialization(ApplicationInitializationContext context)
        {
            var contractCodeProvider = context.ServiceProvider.GetService<IContractCodeProvider>();
            var merkleTreeRecorderContractLocation = typeof(MerkleTreeRecorderContract).Assembly.Location;
            var contractCodes = new Dictionary<string, byte[]>(contractCodeProvider.Codes)
            {
                {
                    MerkleTreeRecorderContractNameProvider.StringName,
                    File.ReadAllBytes(merkleTreeRecorderContractLocation)
                }
            };
            contractCodeProvider.Codes = contractCodes;
        }
    }
}