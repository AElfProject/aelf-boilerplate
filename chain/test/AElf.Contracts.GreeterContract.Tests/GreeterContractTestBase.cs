using System.IO;
using System.Linq;
using Acs0;
using AElf.Blockchains.BasicBaseChain.ContractNames;
using AElf.Contracts.LotteryDemoContract;
using AElf.Contracts.MultiToken;
using AElf.Contracts.TestKit;
using AElf.Cryptography.ECDSA;
using AElf.Kernel;
using AElf.Kernel.Token;
using AElf.Types;
using Google.Protobuf;
using Volo.Abp.Threading;

namespace AElf.Contracts.GreeterContract
{
    public class GreeterContractTestBase : ContractTestBase<GreeterContractTestModule>
    {
        private Address GreeterContractAddress { get; set; }
        private Address LotteryContractAddress { get; set; }

        private ACS0Container.ACS0Stub ZeroContractStub { get; set; }

        internal GreeterContractContainer.GreeterContractStub GreeterContractStub { get; set; }
        internal LotteryDemoContractContainer.LotteryDemoContractStub LotteryDemoContractStub { get; set; }

        protected GreeterContractTestBase()
        {
            InitializeContracts();
        }

        private void InitializeContracts()
        {
            ZeroContractStub = GetZeroContractStub(SampleECKeyPairs.KeyPairs.First());

            GreeterContractAddress = AsyncHelper.RunSync(() =>
                ZeroContractStub.DeploySystemSmartContract.SendAsync(
                    new SystemContractDeploymentInput
                    {
                        Category = KernelConstants.CodeCoverageRunnerCategory,
                        Code = ByteString.CopyFrom(File.ReadAllBytes(typeof(GreeterContract).Assembly.Location)),
                        Name = ProfitSmartContractAddressNameProvider.Name,
                        TransactionMethodCallList =
                            new SystemContractDeploymentInput.Types.SystemTransactionMethodCallList()
                    })).Output;
            GreeterContractStub = GetGreeterContractStub(SampleECKeyPairs.KeyPairs.First());
            
            AsyncHelper.RunSync(() =>
                ZeroContractStub.DeploySystemSmartContract.SendAsync(
                    new SystemContractDeploymentInput
                    {
                        Category = KernelConstants.CodeCoverageRunnerCategory,
                        Code = ByteString.CopyFrom(File.ReadAllBytes(typeof(TokenContract).Assembly.Location)),
                        Name = TokenSmartContractAddressNameProvider.Name,
                        TransactionMethodCallList =
                            new SystemContractDeploymentInput.Types.SystemTransactionMethodCallList
                            {
                                Value =
                                {
                                    new SystemContractDeploymentInput.Types.SystemTransactionMethodCall
                                    {
                                        MethodName = nameof(TokenContractContainer.TokenContractStub.Initialize),
                                        Params = new MultiToken.InitializeInput().ToByteString()
                                    }
                                }
                            }
                    }));

            LotteryContractAddress = AsyncHelper.RunSync(() =>
                ZeroContractStub.DeploySystemSmartContract.SendAsync(
                    new SystemContractDeploymentInput
                    {
                        Category = KernelConstants.CodeCoverageRunnerCategory,
                        Code = ByteString.CopyFrom(
                            File.ReadAllBytes(typeof(LotteryDemoContract.LotteryDemoContract).Assembly.Location)),
                        Name = Hash.FromString("AElf.ContractNames.Lottery"),
                        TransactionMethodCallList =
                            new SystemContractDeploymentInput.Types.SystemTransactionMethodCallList()
                    })).Output;
            LotteryDemoContractStub = GetLotteryDemoContractStub(SampleECKeyPairs.KeyPairs.First());
        }

        private ACS0Container.ACS0Stub GetZeroContractStub(ECKeyPair keyPair)
        {
            return GetTester<ACS0Container.ACS0Stub>(ContractZeroAddress, keyPair);
        }

        private GreeterContractContainer.GreeterContractStub GetGreeterContractStub(ECKeyPair keyPair)
        {
            return GetTester<GreeterContractContainer.GreeterContractStub>(GreeterContractAddress, keyPair);
        }

        private LotteryDemoContractContainer.LotteryDemoContractStub GetLotteryDemoContractStub(ECKeyPair keyPair)
        {
            return GetTester<LotteryDemoContractContainer.LotteryDemoContractStub>(LotteryContractAddress, keyPair);
        }
    }
}