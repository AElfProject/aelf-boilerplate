using System.Collections.Generic;

namespace AElf.Contracts.Deployer
{
    public interface ISystemContractProvider
    {
        List<string> GetSystemContractDllPaths();
    }
}