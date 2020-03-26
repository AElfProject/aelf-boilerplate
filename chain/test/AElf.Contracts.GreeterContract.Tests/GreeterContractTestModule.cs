using AElf.Contracts.TestKit;
using AElf.Kernel.SmartContract;
using AElf.Kernel.SmartContract.Application;
using AElf.Kernel.SmartContract.Infrastructure;
using AElf.Runtime.CSharp;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.DependencyInjection.Extensions;
using Microsoft.Extensions.Options;
using Volo.Abp.Modularity;

namespace AElf.Contracts.GreeterContract
{
    [DependsOn(typeof(ContractTestModule))]
    public class GreeterContractTestModule : ContractTestModule
    {
        public override void ConfigureServices(ServiceConfigurationContext context)
        {
            Configure<ContractOptions>(o => o.ContractDeploymentAuthorityRequired = false);
            context.Services.RemoveAll<IPreExecutionPlugin>();
            context.Services.AddSingleton<ISmartContractRunner, UnitTestCSharpSmartContractRunner>(provider =>
            {
                var option = provider.GetService<IOptions<RunnerOptions>>();
                return new UnitTestCSharpSmartContractRunner(
                    option.Value.SdkDir);
            });
        }
    }
}