using System;
using System.Collections.Generic;
using AElf.Kernel.Blockchain.Application;
using AElf.Kernel.Miner.Application;
using AElf.Types;
using Google.Protobuf;
using Google.Protobuf.WellKnownTypes;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Logging.Abstractions;
using Volo.Abp.Threading;

namespace AElf.Boilerplate.Tester.TestTransactionGenerator
{
    public class GreeterTransactionGenerator : ISystemTransactionGenerator
    {
        private readonly ITransactionGeneratingService _transactionGeneratingService;
        private readonly ITransactionResultService _transactionResultService;

        private Hash _lastGetGreetedListTxId = Hash.Empty;

        public ILogger<GreeterTransactionGenerator> Logger { get; set; }

        public GreeterTransactionGenerator(ITransactionGeneratingService transactionGeneratingService,
            ITransactionResultService transactionResultService)
        {
            _transactionGeneratingService = transactionGeneratingService;
            _transactionResultService = transactionResultService;

            Logger = NullLogger<GreeterTransactionGenerator>.Instance;
        }

        public void GenerateTransactions(Address @from, long preBlockHeight, Hash preBlockHash,
            ref List<Transaction> generatedTransactions)
        {
            var empty = new Empty().ToByteString();
            var greetTx = AsyncHelper.RunSync(() => _transactionGeneratingService.GenerateTransactionAsync(
                Hash.FromString("AElf.ContractNames.Greeter"), "Greet", empty));

            var randomName = new StringValue {Value = Guid.NewGuid().ToString().Substring(3)}.ToByteString();
            var greetToTx = AsyncHelper.RunSync(() => _transactionGeneratingService.GenerateTransactionAsync(
                Hash.FromString("AElf.ContractNames.Greeter"), "GreetTo", randomName));

            var getGreetedListTx = AsyncHelper.RunSync(() => _transactionGeneratingService.GenerateTransactionAsync(
                Hash.FromString("AElf.ContractNames.Greeter"), "GetGreetedList", empty));

            var transactions = new List<Transaction>
            {
                greetTx,
                greetToTx,
                getGreetedListTx
            };

            if (_lastGetGreetedListTxId != Hash.Empty)
            {
                var greeted = AsyncHelper.RunSync(() =>
                    _transactionResultService.GetTransactionResultAsync(_lastGetGreetedListTxId)).ReadableReturnValue;
                Logger.LogDebug($"Greeted List: {greeted}");
            }

            _lastGetGreetedListTxId = getGreetedListTx.GetHash();

            generatedTransactions.AddRange(transactions);
        }
    }
}