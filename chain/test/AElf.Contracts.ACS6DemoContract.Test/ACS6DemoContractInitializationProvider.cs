using System.Collections.Generic;
using AElf.Boilerplate.TestBase;
using AElf.Kernel.SmartContractInitialization;
using AElf.Types;
using Google.Protobuf;

namespace AElf.Contracts.ACS6DemoContract
{
    public class ACS6DemoContractInitializationProvider : IContractInitializationProvider
    {
        public List<InitializeMethod> GetInitializeMethodList(byte[] contractCode)
        {
            return new List<InitializeMethod>
            {
                new InitializeMethod
                {
                    MethodName = nameof(ACS6DemoContract.Initialize),
                    Params = ByteString.Empty
                }
            };
        }

        public Hash SystemSmartContractName { get; } = DAppSmartContractAddressNameProvider.Name;
        public string ContractCodeName { get; } = "AElf.Contracts.ACS6DemoContract";
    }
}