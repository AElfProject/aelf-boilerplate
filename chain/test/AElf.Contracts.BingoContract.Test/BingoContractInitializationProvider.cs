using System.Collections.Generic;
using AElf.Boilerplate.TestBase;
using AElf.Kernel.SmartContractInitialization;
using AElf.Types;

namespace AElf.Contracts.BingoContract
{
    public class BingoContractInitializationProvider : IContractInitializationProvider
    {
        public List<InitializeMethod> GetInitializeMethodList(byte[] contractCode)
        {
            return new List<InitializeMethod>();
        }

        public Hash SystemSmartContractName { get; } = DAppSmartContractAddressNameProvider.Name;
        public string ContractCodeName { get; } = "AElf.Contracts.BingoContract";
    }
}