using System.Collections.Generic;
using AElf.Kernel.SmartContract.Application;
using AElf.Types;

namespace AElf.Contracts.TokenSwapContract
{
    public class TokenSwapContractInitializationProvider : IContractInitializationProvider
    {
        public List<ContractInitializationMethodCall> GetInitializeMethodList(byte[] contractCode)
        {
            return new List<ContractInitializationMethodCall>();
        }

        public Hash SystemSmartContractName { get; } = TokenSwapContractNameProvider.Name;
        public string ContractCodeName { get; } = TokenSwapContractNameProvider.StringName;
    }
}