using System.IO;
using System.Linq;
using Acs0;
using AElf.Blockchains.BasicBaseChain.ContractNames;
using AElf.Contracts.TestKit;
using AElf.Cryptography.ECDSA;
using AElf.Kernel;
using AElf.Types;
using Google.Protobuf;
using Volo.Abp.Threading;

namespace AElf.Contracts.HelloWorldContract
{
    public class HelloWorldContractTestBase : ContractTestBase<HelloWorldContractTestModule>
    {
        internal HelloWorldContractContainer.HelloWorldContractStub HelloWorldContractStub { get; set; }
        private ACS0Container.ACS0Stub ZeroContractStub { get; set; }

        private Address HelloWorldContractAddress { get; set; }

        protected HelloWorldContractTestBase()
        {
            InitializeContracts();
        }

        private void InitializeContracts()
        {
            ZeroContractStub = GetZeroContractStub(SampleECKeyPairs.KeyPairs.First());

            HelloWorldContractAddress = AsyncHelper.RunSync(() =>
                ZeroContractStub.DeploySystemSmartContract.SendAsync(
                    new SystemContractDeploymentInput
                    {
                        Category = KernelConstants.DefaultRunnerCategory,
                        Code = ByteString.CopyFrom(File.ReadAllBytes(typeof(HelloWorldContract).Assembly.Location)),
                        Name = ProfitSmartContractAddressNameProvider.Name,
                        TransactionMethodCallList =
                            new SystemContractDeploymentInput.Types.SystemTransactionMethodCallList()
                    })).Output;
            HelloWorldContractStub = GetHelloWorldContractStub(SampleECKeyPairs.KeyPairs.First());
        }

        private ACS0Container.ACS0Stub GetZeroContractStub(ECKeyPair keyPair)
        {
            return GetTester<ACS0Container.ACS0Stub>(ContractZeroAddress, keyPair);
        }

        private HelloWorldContractContainer.HelloWorldContractStub GetHelloWorldContractStub(ECKeyPair keyPair)
        {
            return GetTester<HelloWorldContractContainer.HelloWorldContractStub>(HelloWorldContractAddress, keyPair);
        }
    }
}