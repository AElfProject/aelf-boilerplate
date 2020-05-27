using AElf.Modularity;
using Microsoft.Extensions.DependencyInjection;
using Volo.Abp.Modularity;

namespace AElf.Boilerplate.SystemTransactionGenerator
{
    public class SystemTransactionGeneratorModule : AElfModule
    {
        public override void ConfigureServices(ServiceConfigurationContext context)
        {
            context.Services.AddSingleton<ITransactionGeneratingService, TransactionGeneratingService>();
        }
    }
}