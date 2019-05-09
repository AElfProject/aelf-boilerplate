using System.IO;
using AElf;
using AElf.Contracts.Genesis;
using AElf.Contracts.TestKit;
using AElf.Kernel;
using AElf.OS.Node.Application;
using Google.Protobuf;
using Google.Protobuf.WellKnownTypes;
using Volo.Abp.Threading;

namespace BingoGameContract.Test 
{
    public class BingoGameContractTestBase : ContractTestBase<BingoGameContractTestModule>
    {
        internal BingoGameContractContainer.BingoGameContractStub BingoGameContractStub { get; set; }
        internal BasicContractZeroContainer.BasicContractZeroStub BasicContractZeroStub { get; set; }

      
        protected Address BingoGameContractAddress { get; set; }

        public BingoGameContractTestBase()
        {
            var bb = ByteString.CopyFrom(File.ReadAllBytes(typeof(BingoGameContract).Assembly.Location));

            BasicContractZeroStub =
                GetTester<BasicContractZeroContainer.BasicContractZeroStub>(ContractZeroAddress,
                    SampleECKeyPairs.KeyPairs[0]);

            BingoGameContractAddress = AsyncHelper.RunSync(() =>
                BasicContractZeroStub.DeploySystemSmartContract.SendAsync(
                    new SystemContractDeploymentInput
                    {
                        Category = KernelConstants.CodeCoverageRunnerCategory,
                        Code = ByteString.CopyFrom(File.ReadAllBytes(typeof(BingoGameContract).Assembly.Location)),
                        Name = Hash.FromString(nameof(BingoGameContract)),
                        TransactionMethodCallList = GenerateTransactionMethodCallList()
                    })).Output;
           BingoGameContractStub =
                GetTester<BingoGameContractContainer.BingoGameContractStub>(BingoGameContractAddress,
                    SampleECKeyPairs.KeyPairs[0]);
            BingoGameContractStub.Locking
        }

        private SystemContractDeploymentInput.Types.SystemTransactionMethodCallList GenerateTransactionMethodCallList()
        {
            var callList = new SystemContractDeploymentInput.Types.SystemTransactionMethodCallList();
            callList.Add(nameof(BingoGameContract.SendBingoCard), new BingoCard());
            return callList;
        }
    }
}