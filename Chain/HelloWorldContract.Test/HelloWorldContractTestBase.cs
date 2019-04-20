using System.IO;
using AElf;
using AElf.Contracts.Genesis;
using AElf.Contracts.TestKit;
using AElf.CSharp.Core;
using AElf.Kernel;
using Google.Protobuf;
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
            HelloWorldContractAddress = AsyncHelper.RunSync(() =>
                BasicContractZeroStub.DeploySystemSmartContract.SendAsync(
                    new SystemContractDeploymentInput
                    {
                        Category = KernelConstants.CodeCoverageRunnerCategory,
                        Code = ByteString.CopyFrom(File.ReadAllBytes(typeof(HelloWorldContract).Assembly.Location)),
                        Name = Hash.FromString("HelloWorldContract"),
                    })).Output;
            HelloWorldContractStub =
                GetTester<HelloWorldContractContainer.HelloWorldContractStub>(HelloWorldContractAddress,
                    SampleECKeyPairs.KeyPairs[0]);
        }
    }
}