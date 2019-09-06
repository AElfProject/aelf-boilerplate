using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Acs0;
using AElf.Contracts.BingoGameContract;
using AElf.Contracts.Consensus.AEDPoS;
using AElf.Contracts.Genesis;
using AElf.Contracts.TestKit;
using AElf.Cryptography.ECDSA;
using AElf.Kernel;
using AElf.Kernel.Consensus;
using AElf.OS.Node.Application;
using AElf.Types;
using Google.Protobuf;
using Google.Protobuf.WellKnownTypes;
using Volo.Abp.Threading;

namespace BingoGameContract.Test
{
    public class BingoGameContractTestBase : ContractTestBase<BingoGameContractTestModule>
    {
        protected ECKeyPair BootMinerKeyPair => SampleECKeyPairs.KeyPairs[0];

        protected Address BingoGameContractAddress { get; set; }

        protected Timestamp StartTimestamp => TimestampHelper.GetUtcNow();

        protected static List<ECKeyPair> InitialCoreDataCenterKeyPairs =>
            SampleECKeyPairs.KeyPairs.Take(BingoGameContractTestConstants.InitialCoreDataCenterCount).ToList();

        protected static List<ECKeyPair> CoreDataCenterKeyPairs =>
            SampleECKeyPairs.KeyPairs.Skip(BingoGameContractTestConstants.InitialCoreDataCenterCount)
                .Take(BingoGameContractTestConstants.CoreDataCenterCount).ToList();

        protected static List<ECKeyPair> ValidationDataCenterKeyPairs =>
            SampleECKeyPairs.KeyPairs
                .Skip(BingoGameContractTestConstants.InitialCoreDataCenterCount +
                      BingoGameContractTestConstants.CoreDataCenterCount)
                .Take(BingoGameContractTestConstants.ValidateDataCenterCount).ToList();

        internal BasicContractZeroContainer.BasicContractZeroStub BasicContractZeroStub { get; set; }
        internal AEDPoSContractImplContainer.AEDPoSContractImplStub AEDPoSContractStub { get; set; }
        internal BingoGameContractContainer.BingoGameContractStub BingoContractStub { get; set; }

        public BingoGameContractTestBase()
        {
            AsyncHelper.RunSync(InitialContracts);
            BingoContractStub = GetBingoContractTester(BootMinerKeyPair);
        }

        internal BasicContractZeroContainer.BasicContractZeroStub GetContractZeroTester(ECKeyPair keyPair)
        {
            return GetTester<BasicContractZeroContainer.BasicContractZeroStub>(ContractZeroAddress, keyPair);
        }

        internal BingoGameContractContainer.BingoGameContractStub GetBingoContractTester(ECKeyPair keyPair)
        {
            return GetTester<BingoGameContractContainer.BingoGameContractStub>(BingoGameContractAddress, keyPair);
        }

        internal async Task InitialContracts()
        {
            await InitializeAElfConsensus();
            await BasicContractZeroStub.DeploySystemSmartContract.SendAsync(new SystemContractDeploymentInput
            {
                Category = KernelConstants.CodeCoverageRunnerCategory,
                Code = ByteString.CopyFrom(File.ReadAllBytes(typeof(AEDPoSContract).Assembly.Location)),
                Name = ConsensusSmartContractAddressNameProvider.Name,
                TransactionMethodCallList = new SystemContractDeploymentInput.Types.SystemTransactionMethodCallList()
            });
        }

        internal async Task InitializeAElfConsensus()
        {
            {
                var result = await AEDPoSContractStub.InitialAElfConsensusContract.SendAsync(
                    new InitialAElfConsensusContractInput
                    {
                        TimeEachTerm = 604800L,
                        MinerIncreaseInterval = BingoGameContractTestConstants.MinerIncreaseInterval
                    });
                CheckResult(result.TransactionResult);
            }
            {
                var result = await AEDPoSContractStub.FirstRound.SendAsync(
                    new MinerList
                    {
                        Pubkeys = {InitialCoreDataCenterKeyPairs.Select(p => ByteString.CopyFrom(p.PublicKey))}
                    }.GenerateFirstRoundOfNewTerm(BingoGameContractTestConstants.MiningInterval,
                        StartTimestamp.ToDateTime()));
                CheckResult(result.TransactionResult);
            }
        }

        private void CheckResult(TransactionResult result)
        {
            if (!string.IsNullOrEmpty(result.Error))
            {
                throw new Exception(result.Error);
            }
        }

        private SystemContractDeploymentInput.Types.SystemTransactionMethodCallList
            GenerateBingoContractMethodCallList()
        {
            var callList = new SystemContractDeploymentInput.Types.SystemTransactionMethodCallList();
            callList.Add(nameof(BingoGameContractContainer.BingoGameContractStub.Initial), new Empty());
            return callList;
        }
    }
}