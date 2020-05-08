using AElf.Contracts.DAppContractTestBase;
using AElf.Kernel.SmartContractInitialization;
using Microsoft.Extensions.DependencyInjection;
using Volo.Abp;
using Volo.Abp.Modularity;

namespace AElf.Contracts.ACS1DemoContract
{
    public class ACS1DemoContractTestModule : SideChainDAppContractTestModule
    {
        public override void ConfigureServices(ServiceConfigurationContext context)
        {
            context.Services
                .AddSingleton<IContractDeploymentListProvider, ASC1DemoContractTestDeploymentListProvider>();
        }
    }
}