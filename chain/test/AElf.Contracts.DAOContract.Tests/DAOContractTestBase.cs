using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Acs0;
using AElf.Blockchains.BasicBaseChain.ContractNames;
using AElf.Contracts.Association;
using AElf.Contracts.Consensus.AEDPoS;
using AElf.Contracts.MultiToken;
using AElf.Contracts.Parliament;
using AElf.Contracts.TestKit;
using AElf.Cryptography.ECDSA;
using AElf.Kernel;
using AElf.Kernel.Consensus;
using AElf.Kernel.Proposal;
using AElf.Kernel.Token;
using AElf.Types;
using Google.Protobuf;
using Google.Protobuf.WellKnownTypes;
using Shouldly;
using Volo.Abp.Threading;

namespace AElf.Contracts.DAOContract
{
    // ReSharper disable InconsistentNaming
    public class DAOContractTestBase : ContractTestBase<DAOContractTestModule>
    {
        internal DAOContractContainer.DAOContractStub DAOContractStub { get; set; }
        internal TokenContractContainer.TokenContractStub TokenContractStub { get; set; }
        internal ParliamentContractContainer.ParliamentContractStub ParliamentContractStub { get; set; }
        internal AssociationContractContainer.AssociationContractStub AssociationContractStub { get; set; }
        private ACS0Container.ACS0Stub ZeroContractStub { get; set; }

        internal ECKeyPair AliceKeyPair { get; set; } = SampleECKeyPairs.KeyPairs.Last();
        internal ECKeyPair DefaultKeyPair { get; set; } = SampleECKeyPairs.KeyPairs.First();
        internal static List<ECKeyPair> InitialMinerKeyPairs => SampleECKeyPairs.KeyPairs.Take(5).ToList();

        internal Address AliceAddress => Address.FromPublicKey(AliceKeyPair.PublicKey);
        internal Address DAOContractAddress { get; set; }
        internal Address TokenContractAddress { get; set; }
        internal Address ParliamentContractAddress { get; set; }
        internal Address AssociationContractAddress { get; set; }
        internal Address ConsensusContractAddress { get; set; }

        protected DAOContractTestBase()
        {
            InitializeContracts();
        }

        private void InitializeContracts()
        {
            ZeroContractStub = GetZeroContractStub(DefaultKeyPair);

            AssociationContractAddress = AsyncHelper.RunSync(() =>
                ZeroContractStub.DeploySystemSmartContract.SendAsync(
                    new SystemContractDeploymentInput
                    {
                        Category = KernelConstants.DefaultRunnerCategory,
                        Code = ByteString.CopyFrom(File.ReadAllBytes(typeof(AssociationContract).Assembly.Location)),
                        Name = AssociationSmartContractAddressNameProvider.Name,
                        TransactionMethodCallList =
                            new SystemContractDeploymentInput.Types.SystemTransactionMethodCallList()
                    })).Output;
            AssociationContractStub = GetAssociationContractStub(DefaultKeyPair);

            ParliamentContractAddress = AsyncHelper.RunSync(() =>
                ZeroContractStub.DeploySystemSmartContract.SendAsync(
                    new SystemContractDeploymentInput
                    {
                        Category = KernelConstants.DefaultRunnerCategory,
                        Code = ByteString.CopyFrom(File.ReadAllBytes(typeof(ParliamentContract).Assembly.Location)),
                        Name = ParliamentSmartContractAddressNameProvider.Name,
                        TransactionMethodCallList = GenerateParliamentContractMethodCallList()
                    })).Output;
            ParliamentContractStub = GetParliamentContractStub(DefaultKeyPair);

            TokenContractAddress = AsyncHelper.RunSync(() =>
                ZeroContractStub.DeploySystemSmartContract.SendAsync(
                    new SystemContractDeploymentInput
                    {
                        Category = KernelConstants.DefaultRunnerCategory,
                        Code = ByteString.CopyFrom(File.ReadAllBytes(typeof(TokenContract).Assembly.Location)),
                        Name = TokenSmartContractAddressNameProvider.Name,
                        TransactionMethodCallList =
                            new SystemContractDeploymentInput.Types.SystemTransactionMethodCallList()
                    })).Output;
            TokenContractStub = GetTokenContractStub(DefaultKeyPair);

            ConsensusContractAddress = AsyncHelper.RunSync(() =>
                ZeroContractStub.DeploySystemSmartContract.SendAsync(
                    new SystemContractDeploymentInput
                    {
                        Category = KernelConstants.DefaultRunnerCategory,
                        Code =
                            ByteString.CopyFrom(File.ReadAllBytes(typeof(AEDPoSContract).Assembly.Location)),
                        Name = ConsensusSmartContractAddressNameProvider.Name,
                        TransactionMethodCallList = GetConsensusContractMethodCallList()
                    })).Output;

            DAOContractAddress = AsyncHelper.RunSync(() =>
                ZeroContractStub.DeploySystemSmartContract.SendAsync(
                    new SystemContractDeploymentInput
                    {
                        Category = KernelConstants.DefaultRunnerCategory,
                        Code =
                            ByteString.CopyFrom(File.ReadAllBytes(typeof(DAOContract).Assembly.Location)),
                        Name = ProfitSmartContractAddressNameProvider.Name,
                        TransactionMethodCallList =
                            new SystemContractDeploymentInput.Types.SystemTransactionMethodCallList()
                    })).Output;
            DAOContractStub = GetDAOContractStub(DefaultKeyPair);
        }

        private ACS0Container.ACS0Stub GetZeroContractStub(ECKeyPair keyPair)
        {
            return GetTester<ACS0Container.ACS0Stub>(ContractZeroAddress, keyPair);
        }

        internal DAOContractContainer.DAOContractStub GetDAOContractStub(ECKeyPair keyPair)
        {
            return GetTester<DAOContractContainer.DAOContractStub>(DAOContractAddress, keyPair);
        }

        internal AssociationContractContainer.AssociationContractStub GetAssociationContractStub(ECKeyPair keyPair)
        {
            return GetTester<AssociationContractContainer.AssociationContractStub>(AssociationContractAddress, keyPair);
        }

        internal ParliamentContractContainer.ParliamentContractStub GetParliamentContractStub(ECKeyPair keyPair)
        {
            return GetTester<ParliamentContractContainer.ParliamentContractStub>(ParliamentContractAddress, keyPair);
        }

        internal TokenContractContainer.TokenContractStub GetTokenContractStub(ECKeyPair keyPair)
        {
            return GetTester<TokenContractContainer.TokenContractStub>(TokenContractAddress, keyPair);
        }

        internal AEDPoSContractContainer.AEDPoSContractStub GetConsensusContractStub(ECKeyPair keyPair)
        {
            return GetTester<AEDPoSContractContainer.AEDPoSContractStub>(TokenContractAddress, keyPair);
        }

        private SystemContractDeploymentInput.Types.SystemTransactionMethodCallList GetConsensusContractMethodCallList()
        {
            return new SystemContractDeploymentInput.Types.SystemTransactionMethodCallList
            {
                Value =
                {
                    new SystemContractDeploymentInput.Types.SystemTransactionMethodCall
                    {
                        MethodName = nameof(AEDPoSContract.InitialAElfConsensusContract),
                        Params = new InitialAElfConsensusContractInput
                        {
                            PeriodSeconds = 604800L,
                            MinerIncreaseInterval = 31536000
                        }.ToByteString()
                    },
                    new SystemContractDeploymentInput.Types.SystemTransactionMethodCall
                    {
                        MethodName = nameof(AEDPoSContract.FirstRound),
                        Params = new MinerList
                        {
                            Pubkeys = {InitialMinerKeyPairs.Select(p => ByteString.CopyFrom(p.PublicKey))}
                        }.GenerateFirstRoundOfNewTerm(4000, TimestampHelper.GetUtcNow()).ToByteString()
                    }
                }
            };
        }

        private SystemContractDeploymentInput.Types.SystemTransactionMethodCallList
            GenerateParliamentContractMethodCallList()
        {
            return new SystemContractDeploymentInput.Types.SystemTransactionMethodCallList
            {
                Value =
                {
                    new SystemContractDeploymentInput.Types.SystemTransactionMethodCall
                    {
                        MethodName = nameof(ParliamentContract.Initialize),
                        Params = new Parliament.InitializeInput().ToByteString()
                    }
                }
            };
        }

        internal async Task ParliamentApproveAsync(Hash proposalId)
        {
            foreach (var keyPair in InitialMinerKeyPairs)
            {
                var parliamentContractStub = GetParliamentContractStub(keyPair);
                var approveResult = await parliamentContractStub.Approve.SendAsync(proposalId);
                approveResult.TransactionResult.Status.ShouldBe(TransactionResultStatus.Mined);
            }
        }

        internal Address ParliamentDefaultOrganizationAddress
        {
            get
            {
                return AsyncHelper.RunSync(() =>
                    ParliamentContractStub.GetDefaultOrganizationAddress.CallAsync(new Empty()));
            }
        }
    }
}