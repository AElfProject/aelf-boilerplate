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
    public class HelloWorldTransactionGenerator : ISystemTransactionGenerator
    {
        private readonly ITransactionGeneratingService _transactionGeneratingService;
        private readonly ITransactionResultService _transactionResultService;

        private Hash _lastGetGreetedListTxId = Hash.Empty;

        public ILogger<HelloWorldTransactionGenerator> Logger { get; set; }

        public HelloWorldTransactionGenerator(ITransactionGeneratingService transactionGeneratingService,
            ITransactionResultService transactionResultService)
        {
            _transactionGeneratingService = transactionGeneratingService;
            _transactionResultService = transactionResultService;

            Logger = NullLogger<HelloWorldTransactionGenerator>.Instance;
        }

        public void GenerateTransactions(Address @from, long preBlockHeight, Hash preBlockHash,
            ref List<Transaction> generatedTransactions)
        {
            var empty = new Empty().ToByteString();
            var greetTx = AsyncHelper.RunSync(() => _transactionGeneratingService.GenerateTransactionAsync(
                Hash.FromString("AElf.ContractNames.HelloWorld"), "Greet", empty));

            var randomName = new StringValue {Value = Guid.NewGuid().ToString().Substring(3)}.ToByteString();
            var greetToTx = AsyncHelper.RunSync(() => _transactionGeneratingService.GenerateTransactionAsync(
                Hash.FromString("AElf.ContractNames.HelloWorld"), "GreetTo", randomName));

            var getGreetedListTx = AsyncHelper.RunSync(() => _transactionGeneratingService.GenerateTransactionAsync(
                Hash.FromString("AElf.ContractNames.HelloWorld"), "GetGreetedList", empty));

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