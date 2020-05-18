using System.Collections.Generic;
using AElf.Boilerplate.TestBase;
using AElf.Kernel.SmartContractInitialization;
using AElf.Types;
using Google.Protobuf;

namespace AElf.Contracts.ACS10DemoContract
{
    public class ACS10DemoContractInitializationProvider : IContractInitializationProvider
    {
        public List<InitializeMethod> GetInitializeMethodList(byte[] contractCode)
        {
            return new List<InitializeMethod>
            {
                new InitializeMethod
                {
                    MethodName = nameof(ACS10DemoContract.Initialize),
                    Params = new InitializeInput
                    {
                        MinimumLockMinutes = 10
                    }.ToByteString()
                }
            };
        }

        public Hash SystemSmartContractName { get; } = DAppContractAddressNameProvider.Name;
        public string ContractCodeName { get; } = "AElf.Contracts.ACS10DemoContract";
    }
}