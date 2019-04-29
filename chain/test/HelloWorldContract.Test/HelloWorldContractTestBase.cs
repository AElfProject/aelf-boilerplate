using System.IO;
using AElf;
using AElf.Contracts.Genesis;
using AElf.Contracts.TestKit;
using AElf.Kernel;
using AElf.OS.Node.Application;
using Google.Protobuf;
using Google.Protobuf.WellKnownTypes;
using Volo.Abp.Threading;

namespace HelloWorldContract.Test
{
    public class HelloWorldContractTestBase : ContractTestBase<HelloWorldContractTestModule>
    {
        internal HelloWorldContractContainer.HelloWorldContractStub HelloWorldContractStub { get; set; }
        internal BasicContractZeroContainer.BasicContractZeroStub BasicContractZeroStub { get; set; }

        protected Address HelloWorldContractAddress { get; set; }

        public HelloWorldContractTestBase()
        {
            var bb = ByteString.CopyFrom(File.ReadAllBytes(typeof(HelloWorldContract).Assembly.Location));

            BasicContractZeroStub =
                GetTester<BasicContractZeroContainer.BasicContractZeroStub>(ContractZeroAddress,
                    SampleECKeyPairs.KeyPairs[0]);

            HelloWorldContractAddress = AsyncHelper.RunSync(() =>
                BasicContractZeroStub.DeploySystemSmartContract.SendAsync(
                    new SystemContractDeploymentInput
                    {
                        Category = KernelConstants.CodeCoverageRunnerCategory,
                        Code = ByteString.CopyFrom(File.ReadAllBytes(typeof(HelloWorldContract).Assembly.Location)),
                        Name = Hash.FromString("HelloWorldContract"),
                        TransactionMethodCallList = GenerateTransactionMethodCallList()
                    })).Output;
            HelloWorldContractStub =
                GetTester<HelloWorldContractContainer.HelloWorldContractStub>(HelloWorldContractAddress,
                    SampleECKeyPairs.KeyPairs[0]);
        }

        private SystemContractDeploymentInput.Types.SystemTransactionMethodCallList GenerateTransactionMethodCallList()
        {
            var callList = new SystemContractDeploymentInput.Types.SystemTransactionMethodCallList();
            callList.Add(nameof(HelloWorldContract.Hello), new Empty());
            return callList;
        }
    }
}