using System.Collections.Generic;
using AElf.Kernel.SmartContractInitialization;
using AElf.Types;

namespace AElf.Boilerplate.DAppContract
{
    public class BingoGameContractInitializationProvider : IContractInitializationProvider
    {
        public List<InitializeMethod> GetInitializeMethodList(byte[] contractCode)
        {
            return new List<InitializeMethod>();
        }

        public Hash SystemSmartContractName => BingoGameSmartContractAddressNameProvider.Name;
        public string ContractCodeName => "AElf.Contracts.BingoGameContract";
    }
}