using System.Collections.Generic;
using AElf.Boilerplate.TestBase;
using AElf.Contracts.TestKit;
using AElf.Kernel.SmartContractInitialization;
using AElf.Types;
using Google.Protobuf;

namespace AElf.Contracts.ACS5DemoContract
{
    public class ACS5DemoContractInitializationProvider : IContractInitializationProvider
    {
        public List<InitializeMethod> GetInitializeMethodList(byte[] contractCode)
        {
            return new List<InitializeMethod>
            {
                new InitializeMethod
                {
                    MethodName = nameof(ACS5DemoContract.Initialize),
                    Params = new InitializeInput
                    {
                        Admin = Address.FromPublicKey(SampleECKeyPairs.KeyPairs[0].PublicKey)
                    }.ToByteString()
                }
            };
        }

        public Hash SystemSmartContractName { get; } = DAppSmartContractAddressNameProvider.Name;
        public string ContractCodeName { get; } = "AElf.Contracts.ACS5DemoContract";
    }
}