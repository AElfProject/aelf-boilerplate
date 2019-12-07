using System.IO;
using AElf.Contracts.TestKit;
using AElf.Runtime.CSharp;
using Microsoft.Extensions.DependencyInjection;
using Volo.Abp.Modularity;

namespace BingoGameContract.Test
{
    public class BingoGameContractTestModule : ContractTestModule
    {
        public override void ConfigureServices(ServiceConfigurationContext context)
        {
            base.ConfigureServices(context);
            Configure<RunnerOptions>(o =>
            {
                o.SdkDir = Path.GetDirectoryName(typeof(BingoGameContractTestModule).Assembly.Location);
            });
            context.Services.AddSingleton<IRefBlockInfoProvider, RefBlockInfoProvider>();
        }
    }
}