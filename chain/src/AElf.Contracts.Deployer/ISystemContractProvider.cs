using System.Collections.Generic;

namespace AElf.Contracts.Deployer
{
    public interface ISystemContractProvider
    {
        IEnumerable<string> GetSystemContractDllPaths();
    }
}