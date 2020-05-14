using System.Collections.Generic;
using AElf.Kernel.SmartContractInitialization;
using AElf.Types;

namespace AElf.Boilerplate.DAppContract
{
    public class LotteryContractInitializationProvider : IContractInitializationProvider
    {
        public List<InitializeMethod> GetInitializeMethodList(byte[] contractCode)
        {
            return new List<InitializeMethod>();
        }

        public Hash SystemSmartContractName => LotterySmartContractAddressNameProvider.Name;
        public string ContractCodeName => "AElf.Contracts.LotteryContract";
    }
}