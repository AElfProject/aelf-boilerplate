using System.Collections.Generic;
using System.Linq;
using AElf.Boilerplate.TestBase;
using AElf.ContractTestBase.ContractTestKit;
using AElf.Kernel.SmartContract.Application;
using AElf.Types;
using Google.Protobuf;

namespace AElf.Contracts.ACS5DemoContract
{
    public class ACS5DemoContractInitializationProvider : IContractInitializationProvider
    {
        public List<ContractInitializationMethodCall> GetInitializeMethodList(byte[] contractCode)
        {
            return new List<ContractInitializationMethodCall>
            {
                new ContractInitializationMethodCall
                {
                    MethodName = nameof(ACS5DemoContract.Initialize),
                    Params = new InitializeInput
                    {
                        Admin = Address.FromPublicKey(SampleAccount.Accounts.First().KeyPair.PublicKey)
                    }.ToByteString()
                }
            };
        }

        public Hash SystemSmartContractName { get; } = DAppSmartContractAddressNameProvider.Name;
        public string ContractCodeName { get; } = "AElf.Contracts.ACS5DemoContract";
    }
}