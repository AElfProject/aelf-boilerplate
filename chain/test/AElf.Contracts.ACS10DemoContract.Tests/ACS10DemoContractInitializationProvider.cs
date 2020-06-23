using System.Collections.Generic;
using AElf.Boilerplate.TestBase;
using AElf.Kernel.SmartContract.Application;
using AElf.Types;
using Google.Protobuf;

namespace AElf.Contracts.ACS10DemoContract
{
    public class ACS10DemoContractInitializationProvider : IContractInitializationProvider
    {
        public List<ContractInitializationMethodCall> GetInitializeMethodList(byte[] contractCode)
        {
            return new List<ContractInitializationMethodCall>
            {
                new ContractInitializationMethodCall
                {
                    MethodName = nameof(ACS10DemoContract.Initialize),
                    Params = new InitializeInput
                    {
                        MinimumLockMinutes = 10
                    }.ToByteString()
                }
            };
        }

        public Hash SystemSmartContractName { get; } = DAppSmartContractAddressNameProvider.Name;
        public string ContractCodeName { get; } = "AElf.Contracts.ACS10DemoContract";
    }
}