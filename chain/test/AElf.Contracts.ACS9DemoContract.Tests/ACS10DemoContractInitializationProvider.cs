using System.Collections.Generic;
using System.Linq;
using AElf.Boilerplate.TestBase;
using AElf.ContractTestBase.ContractTestKit;
using AElf.Kernel.SmartContract.Application;
using AElf.Types;
using Google.Protobuf;

namespace AElf.Contracts.ACS9DemoContract
{
    public class ACS10DemoContractInitializationProvider : IContractInitializationProvider
    {
        public List<ContractInitializationMethodCall> GetInitializeMethodList(byte[] contractCode)
        {
            return new List<ContractInitializationMethodCall>
            {
                new ContractInitializationMethodCall
                {
                    MethodName = nameof(ACS9DemoContract.Initialize),
                    Params = new InitializeInput
                    {
                        ProfitReceiver = Address.FromPublicKey(SampleAccount.Accounts.Skip(3).First().KeyPair.PublicKey)
                    }.ToByteString()
                }
            };
        }

        public Hash SystemSmartContractName { get; } = ACS10DemoSmartContractNameProvider.Name;
        public string ContractCodeName { get; } = "AElf.Contracts.ACS10DemoContract";
    }
}