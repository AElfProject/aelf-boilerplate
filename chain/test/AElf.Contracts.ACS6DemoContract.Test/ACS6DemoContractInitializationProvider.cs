using System.Collections.Generic;
using AElf.Boilerplate.TestBase;
using AElf.Kernel.SmartContractInitialization;
using AElf.Types;

namespace AElf.Contracts.ACS6DemoContract
{
    public class ACS6DemoContractInitializationProvider : IContractInitializationProvider
    {
        public List<InitializeMethod> GetInitializeMethodList(byte[] contractCode)
        {
            return new List<InitializeMethod>();
        }

        public Hash SystemSmartContractName { get; } = DAppContractAddressNameProvider.Name;
        public string ContractCodeName { get; } = "AElf.Contracts.ACS6DemoContract";
    }
}