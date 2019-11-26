using AElf.Boilerplate.Tester.TestTransactionGenerator;
using AElf.Kernel.Miner.Application;
using AElf.Modularity;
using Microsoft.Extensions.DependencyInjection;
using Volo.Abp.Modularity;

namespace AElf.Boilerplate.Tester
{
    public class TesterModule : AElfModule
    {
        public override void ConfigureServices(ServiceConfigurationContext context)
        {
            context.Services.AddSingleton<ISystemTransactionGenerator, RandomNumberTransactionGenerator>();
            context.Services.AddSingleton<ISystemTransactionGenerator, HelloWorldTransactionGenerator>();
        }
    }
}