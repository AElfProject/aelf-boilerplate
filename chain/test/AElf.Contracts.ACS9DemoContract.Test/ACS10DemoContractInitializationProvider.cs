using System.Collections.Generic;
using System.Linq;
using AElf.Boilerplate.TestBase;
using AElf.Contracts.TestKit;
using AElf.Kernel.SmartContractInitialization;
using AElf.Types;
using Google.Protobuf;

namespace AElf.Contracts.ACS9DemoContract
{
    public class ACS10DemoContractInitializationProvider : IContractInitializationProvider
    {
        public List<InitializeMethod> GetInitializeMethodList(byte[] contractCode)
        {
            return new List<InitializeMethod>
            {
                new InitializeMethod
                {
                    MethodName = nameof(ACS9DemoContract.Initialize),
                    Params = new InitializeInput
                    {
                        ProfitReceiver = Address.FromPublicKey(SampleECKeyPairs.KeyPairs.Skip(3).First().PublicKey)
                    }.ToByteString()
                }
            };
        }

        public Hash SystemSmartContractName { get; } = ACS10DemoSmartContractNameProvider.Name;
        public string ContractCodeName { get; } = "AElf.Contracts.ACS10DemoContract";
    }
}