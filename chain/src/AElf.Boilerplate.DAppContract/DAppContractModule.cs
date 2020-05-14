using AElf.Kernel.SmartContract;
using AElf.Kernel.SmartContractInitialization;
using AElf.Modularity;
using Microsoft.Extensions.DependencyInjection;
using Volo.Abp.Modularity;

namespace AElf.Boilerplate.DAppContract
{
    public class DAppContractModule : AElfModule
    {
        public override void ConfigureServices(ServiceConfigurationContext context)
        {
            context.Services
                .AddSingleton<ISmartContractAddressNameProvider, BingoGameSmartContractAddressNameProvider>();
            context.Services
                .AddTransient<IContractInitializationProvider, BingoGameContractInitializationProvider>();
            
            context.Services
                .AddSingleton<ISmartContractAddressNameProvider, LotterySmartContractAddressNameProvider>();
            context.Services
                .AddTransient<IContractInitializationProvider, LotteryContractInitializationProvider>();
        }
    }
}