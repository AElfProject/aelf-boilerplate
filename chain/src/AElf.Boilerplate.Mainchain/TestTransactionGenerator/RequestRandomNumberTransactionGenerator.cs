using System.Collections.Generic;
using System.Threading.Tasks;
using AElf.Kernel.Consensus;
using AElf.Kernel.Miner.Application;
using AElf.Types;
using Google.Protobuf;
using Google.Protobuf.WellKnownTypes;
using Volo.Abp.Threading;

namespace AElf.Boilerplate.MainChain.TestTransactionProviders
{
    public class RequestRandomNumberTransactionGenerator : ITestTransactionGenerator
    {
        private readonly ITransactionGeneratingService _transactionGeneratingService;

        public RequestRandomNumberTransactionGenerator(ITransactionGeneratingService transactionGeneratingService)
        {
            _transactionGeneratingService = transactionGeneratingService;
        }

        public bool IsAddTransaction(long blockHeight)
        {
            return blockHeight > 10;
        }

        public void GenerateTransactions(Address @from, long preBlockHeight, Hash preBlockHash,
            ref List<Transaction> generatedTransactions)
        {
            var param = new Empty().ToByteString();
            var transactions = new List<Transaction>
            {
                AsyncHelper.RunSync(() => _transactionGeneratingService.GenerateTransactionAsync(
                    ConsensusSmartContractAddressNameProvider.Name, "RequestRandomNumber", param))
            };
            generatedTransactions.AddRange(transactions);
        }
    }
}