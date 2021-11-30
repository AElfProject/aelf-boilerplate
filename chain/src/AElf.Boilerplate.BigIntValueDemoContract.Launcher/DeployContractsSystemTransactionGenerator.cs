using System.Collections.Generic;
using System.Threading.Tasks;
using AElf.Standards.ACS0;
using AElf.Boilerplate.SystemTransactionGenerator;
using AElf.ContractDeployer;
using AElf.Contracts.Genesis;
using AElf.Kernel;
using AElf.Kernel.Miner.Application;
using AElf.Kernel.SmartContract;
using AElf.Types;
using Google.Protobuf;
using Microsoft.Extensions.Options;

namespace AElf.Boilerplate.BigIntValueDemoContract.Launcher
{
    public class DeployContractsSystemTransactionGenerator : ISystemTransactionGenerator
    {
        private readonly ITransactionGeneratingService _transactionGeneratingService;
        private readonly ContractOptions _contractOptions;

        public DeployContractsSystemTransactionGenerator(ITransactionGeneratingService transactionGeneratingService,
            IOptionsSnapshot<ContractOptions> contractOptions)
        {
            _transactionGeneratingService = transactionGeneratingService;
            _contractOptions = contractOptions.Value;
        }

        public async Task<List<Transaction>> GenerateTransactionsAsync(Address @from, long preBlockHeight,
            Hash preBlockHash)
        {
            if (preBlockHeight == 1)
            {
                var code = ByteString.CopyFrom(GetContractCodes());
                return new List<Transaction>
                {
                    await _transactionGeneratingService.GenerateTransactionAsync(
                        ZeroSmartContractAddressNameProvider.Name, nameof(BasicContractZero.DeploySmartContract),
                        new ContractDeploymentInput
                        {
                            Category = KernelConstants.DefaultRunnerCategory,
                            Code = code
                        }.ToByteString())
                };
            }

            return new List<Transaction>();
        }

        private byte[] GetContractCodes()
        {
            return ContractsDeployer.GetContractCodes<DeployContractsSystemTransactionGenerator>(_contractOptions
                .GenesisContractDir)["AElf.Contracts.BigIntValueDemoContract"];
        }
    }
}