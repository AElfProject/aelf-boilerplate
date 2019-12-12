using AElf.Modularity;
using AElf.WebApp.Application;
using Volo.Abp.Modularity;

namespace AElf.Boilerplate.WebApp.Testing
{
    [DependsOn(typeof(CoreApplicationWebAppAElfModule))]
    public class TestingWebAppAElfModule : AElfModule
    {
    }
}