using AElf.CSharp.CodeOps;
using AElf.Modularity;
using Volo.Abp.Modularity;

namespace AElf.Boilerplate.ContractPatcher
{
    [DependsOn(typeof(CSharpCodeOpsAElfModule))]
    public class ContractPatcherModule : AElfModule
    {
        
    }
}