using System.Linq;
using System.Threading.Tasks;
using AElf.Kernel;
using AElf.Kernel.Account.Application;
using AElf.Kernel.Blockchain.Application;
using AElf.Kernel.Infrastructure;
using AElf.Kernel.SmartContract.Application;
using AElf.Types;
using Google.Protobuf;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Logging.Abstractions;

namespace AElf.Boilerplate.SystemTransactionGenerator
{
    public interface ITransactionGeneratingService
    {
        Task<Transaction> GenerateTransactionAsync(Hash contractName, string methodName, ByteString param);
    }

    public class TransactionGeneratingService : ITransactionGeneratingService
    {
        private readonly IAccountService _accountService;
        private readonly ISmartContractAddressService _smartContractAddressService;
        private readonly IBlockchainService _blockchainService;

        public ILogger<TransactionGeneratingService> Logger { get; set; }

        public TransactionGeneratingService(IAccountService accountService,
            ISmartContractAddressService smartContractAddressService, IBlockchainService blockchainService)
        {
            _accountService = accountService;
            _smartContractAddressService = smartContractAddressService;
            _blockchainService = blockchainService;

            Logger = NullLogger<TransactionGeneratingService>.Instance;
        }

        public async Task<Transaction> GenerateTransactionAsync(Hash contractName, string methodName, ByteString param)
        {
            var pubkey = await _accountService.GetPublicKeyAsync();
            var chain = await _blockchainService.GetChainAsync();
            var address = await _smartContractAddressService.GetAddressByContractNameAsync(new ChainContext
            {
                BlockHash = chain.BestChainHash,
                BlockHeight = chain.BestChainHeight
            }, contractName.ToStorageKey());
            var transaction = new Transaction
            {
                From = Address.FromPublicKey(pubkey),
                To = address,
                MethodName = methodName,
                Params = param,
                RefBlockNumber = chain.BestChainHeight,
                RefBlockPrefix = ByteString.CopyFrom(chain.BestChainHash.Value.Take(4).ToArray())
            };
            //Logger.LogDebug($"[Boilerplate]Generated test tx: {transaction}. tx id: {transaction.GetHash()}");
            return transaction;
        }
    }
}