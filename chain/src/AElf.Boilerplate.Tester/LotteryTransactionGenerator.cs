using System.Collections.Generic;
using System.Threading.Tasks;
using AElf.Kernel.Miner.Application;
using AElf.Types;
using Google.Protobuf;
using Google.Protobuf.WellKnownTypes;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Logging.Abstractions;

namespace AElf.Boilerplate.Tester
{
    public class LotteryTransactionGenerator : ISystemTransactionGenerator
    {
        private readonly ITransactionGeneratingService _transactionGeneratingService;
        public ILogger<LotteryTransactionGenerator> Logger { get; set; }

        public LotteryTransactionGenerator(ITransactionGeneratingService transactionGeneratingService)
        {
            _transactionGeneratingService = transactionGeneratingService;
            Logger = NullLogger<LotteryTransactionGenerator>.Instance;
        }

        public async Task<List<Transaction>> GenerateTransactionsAsync(Address @from, long preBlockHeight,
            Hash preBlockHash)
        {
            var tx = await _transactionGeneratingService.GenerateTransactionAsync(
                Hash.FromString("AElf.ContractNames.LotteryDemo"), "GetPrice", new Empty().ToByteString());
            Logger.LogInformation($"Generated.{tx.GetHash()}");
            return new List<Transaction>
            {
                tx
            };
        }
    }
}