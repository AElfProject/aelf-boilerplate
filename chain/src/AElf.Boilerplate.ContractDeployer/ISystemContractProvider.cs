using System.Collections.Generic;

namespace AElf.Boilerplate.ContractDeployer
{
    public interface ISystemContractProvider
    {
        IEnumerable<string> GetSystemContractDllPaths();
    }
}