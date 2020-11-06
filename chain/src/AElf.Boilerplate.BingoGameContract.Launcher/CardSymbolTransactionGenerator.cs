using System.Collections.Generic;
using System.Threading.Tasks;
using AElf.Boilerplate.SystemTransactionGenerator;
using AElf.Contracts.MultiToken;
using AElf.Kernel.Miner.Application;
using AElf.Kernel.Token;
using AElf.Types;
using Google.Protobuf;

namespace AElf.Boilerplate.BingoGameContract.Launcher
{
    public class CardSymbolTransactionGenerator : ISystemTransactionGenerator
    {
        private readonly ITransactionGeneratingService _transactionGeneratingService;

        public CardSymbolTransactionGenerator(ITransactionGeneratingService transactionGeneratingService)
        {
            _transactionGeneratingService = transactionGeneratingService;
        }

        public async Task<List<Transaction>> GenerateTransactionsAsync(Address @from, long preBlockHeight,
            Hash preBlockHash)
        {
            if (preBlockHeight != 2)
            {
                return new List<Transaction>();
            }

            var contractAddress = Address.FromBase58("2LUmicHyH4RXrMjG4beDwuDsiWJESyLkgkwPdGTR8kahRzq5XS");
            var createInput = new CreateInput
            {
                Symbol = "CARD",
                TokenName = "Bingo Card",
                Decimals = 0,
                Issuer = contractAddress,
                IsBurnable = true,
                TotalSupply = long.MaxValue
            }.ToByteString();
            var transferInput = new TransferInput
            {
                Symbol = "ELF",
                Amount = 1_0000_0000_00000000,
                To = contractAddress
            }.ToByteString();
            return new List<Transaction>
            {
                await _transactionGeneratingService.GenerateTransactionAsync(TokenSmartContractAddressNameProvider.Name,
                    nameof(TokenContractContainer.TokenContractStub.Create), createInput),
                await _transactionGeneratingService.GenerateTransactionAsync(TokenSmartContractAddressNameProvider.Name,
                    nameof(TokenContractContainer.TokenContractStub.Transfer), transferInput),
            };
        }
    }
}