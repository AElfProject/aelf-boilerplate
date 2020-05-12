using System.Collections.Generic;
using AElf.Types;

namespace AElf.Boilerplate.ContractDeployer
{
    public interface ISystemContractProvider
    {
        /// <summary>
        /// Smart Contract Name -> Dll Location.
        /// </summary>
        /// <returns></returns>
        Dictionary<Hash, string> GetSystemContractInfo();
    }
}