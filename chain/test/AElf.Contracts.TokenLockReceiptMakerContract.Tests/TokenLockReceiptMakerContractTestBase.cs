using System.Linq;
using System.Threading.Tasks;
using AElf.Boilerplate.TestBase;
using AElf.Contracts.MultiToken;
using AElf.Contracts.TokenLockReceiptMakerContract.Tests;
using AElf.ContractTestBase.ContractTestKit;
using AElf.Cryptography.ECDSA;
using AElf.Kernel;
using AElf.Kernel.Blockchain.Application;
using AElf.Kernel.SmartContract.Application;
using AElf.Kernel.Token;
using AElf.Types;
using Microsoft.Extensions.DependencyInjection;
using Volo.Abp.Threading;

namespace AElf.Contracts.TokenLockReceiptMakerContract
{
    // ReSharper disable InconsistentNaming
    public class TokenLockReceiptMakerContractTestBase : ContractTestBase<TokenLockReceiptMakerContractTestModule>
    {
        internal Address TokenLockReceiptMakerContractAddress => GetAddress(TokenLockReceiptMakerContractNameProvider.StringName);

        internal TokenLockReceiptMakerContractContainer.TokenLockReceiptMakerContractStub TokenLockReceiptMakerContractStub =>
            GetTokenLockReceiptMakerContractStub(SampleAccount.Accounts.First().KeyPair);

        internal TokenLockReceiptMakerContractContainer.TokenLockReceiptMakerContractStub GetTokenLockReceiptMakerContractStub(ECKeyPair senderKeyPair)
        {
            return Application.ServiceProvider.GetRequiredService<IContractTesterFactory>()
                .Create<TokenLockReceiptMakerContractContainer.TokenLockReceiptMakerContractStub>(TokenLockReceiptMakerContractAddress,
                    senderKeyPair);
        }
        
        internal TokenContractContainer.TokenContractStub GetTokenContractStub(ECKeyPair senderKeyPair)
        {
            return Application.ServiceProvider.GetRequiredService<IContractTesterFactory>()
                .Create<TokenContractContainer.TokenContractStub>(TokenContractAddress,
                    senderKeyPair);
        }

        internal TokenContractContainer.TokenContractStub TokenContractStub =>
            GetTokenContractStub(SampleAccount.Accounts.First().KeyPair);

        internal ECKeyPair AliceKeyPair { get; set; } = SampleAccount.Accounts.Last().KeyPair;
        internal ECKeyPair BobKeyPair { get; set; } = SampleAccount.Accounts.Reverse().Skip(1).First().KeyPair;
        internal Address AliceAddress => Address.FromPublicKey(AliceKeyPair.PublicKey);
        internal Address BobAddress => Address.FromPublicKey(BobKeyPair.PublicKey);
        internal Address TokenContractAddress => GetAddress(TokenSmartContractAddressNameProvider.StringName);

        private Address GetAddress(string contractStringName)
        {
            var addressService = Application.ServiceProvider.GetRequiredService<ISmartContractAddressService>();
            var blockchainService = Application.ServiceProvider.GetRequiredService<IBlockchainService>();
            var chain = AsyncHelper.RunSync(blockchainService.GetChainAsync);
            var address = AsyncHelper.RunSync(() => addressService.GetSmartContractAddressAsync(new ChainContext
            {
                BlockHash = chain.BestChainHash,
                BlockHeight = chain.BestChainHeight
            }, contractStringName)).SmartContractAddress.Address;
            return address;
        }

        protected async Task Initialize(string symbol, long lockTime = 100)
        {
            await TokenLockReceiptMakerContractStub.Initialize.SendAsync(new InitializeInput
            {
                LockTime = lockTime,
                Symbol = symbol
            });
        }

        protected async Task Approve(string symbol, long amount)
        {
            await TokenContractStub.Approve.SendAsync(new ApproveInput
            {
                Symbol = symbol,
                Amount = amount,
                Spender = TokenLockReceiptMakerContractAddress
            });
        }
    }
}