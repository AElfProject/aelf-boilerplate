using System.IO;
using System.Linq;
using Acs0;
using AElf.Contracts.TestKit;
using AElf.Cryptography.ECDSA;
using AElf.Kernel;
using AElf.OS.Node.Application;
using AElf.Types;
using Google.Protobuf;
using Volo.Abp.Threading;

namespace AElf.Contracts.HelloWorld
{
    public class HelloWorldContractTestBase : TestKit.ContractTestBase<HelloWorldContractTestModule>
    {
        protected Address TesterAddress => Address.FromPublicKey(SampleECKeyPairs.KeyPairs.First().PublicKey);
        protected Address HelloWorldContractAddress { get; set; }

        internal ACS0Container.ACS0Stub ZeroContractStub { get; set; }

        internal HelloWorldContractContainer.HelloWorldContractStub HelloWorldContractStub { get; set; }

        public HelloWorldContractTestBase()
        {
            InitializeContracts();
        }

        protected void InitializeContracts()
        {
            ZeroContractStub = GetZeroContractStub(SampleECKeyPairs.KeyPairs.First());

            HelloWorldContractAddress = AsyncHelper.RunSync(() =>
                ZeroContractStub.DeploySystemSmartContract.SendAsync(
                    new SystemContractDeploymentInput
                    {
                        Category = KernelConstants.CodeCoverageRunnerCategory,
                        Code = ByteString.CopyFrom(File.ReadAllBytes(typeof(HelloWorldContract).Assembly.Location)),
                        Name = ProfitSmartContractAddressNameProvider.Name,
                        TransactionMethodCallList = GenerateProfitInitializationCallList()
                    })).Output;
            HelloWorldContractStub = GetHelloWorldContractStub(SampleECKeyPairs.KeyPairs.First());
        }

        internal ACS0Container.ACS0Stub GetZeroContractStub(ECKeyPair keyPair)
        {
            return GetTester<ACS0Container.ACS0Stub>(ContractZeroAddress, keyPair);
        }

        internal HelloWorldContractContainer.HelloWorldContractStub GetHelloWorldContractStub(ECKeyPair keyPair)
        {
            return GetTester<HelloWorldContractContainer.HelloWorldContractStub>(HelloWorldContractAddress, keyPair);
        }

        private SystemContractDeploymentInput.Types.SystemTransactionMethodCallList
            GenerateProfitInitializationCallList()
        {
            return new SystemContractDeploymentInput.Types.SystemTransactionMethodCallList();
        }
    }
}