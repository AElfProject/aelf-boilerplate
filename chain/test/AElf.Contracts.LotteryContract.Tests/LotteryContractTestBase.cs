using System.Linq;
using AElf.Boilerplate.TestBase;
using AElf.Contracts.MultiToken;
using AElf.ContractTestBase.ContractTestKit;
using AElf.Cryptography.ECDSA;
using AElf.Kernel;
using AElf.Kernel.Blockchain.Application;
using AElf.Kernel.SmartContract.Application;
using AElf.Kernel.Token;
using AElf.Types;
using Microsoft.Extensions.DependencyInjection;
using Volo.Abp.Threading;

namespace AElf.Contracts.LotteryContract
{
    // ReSharper disable InconsistentNaming
    public class LotteryContractTestBase : ContractTestBase<LotteryContractTestModule>
    {
        internal Address LotteryContractAddress => GetAddress(DAppSmartContractAddressNameProvider.StringName);

        internal LotteryContractContainer.LotteryContractStub LotteryContractStub =>
            GetLotteryContractStub(SampleAccount.Accounts.First().KeyPair);

        internal LotteryContractContainer.LotteryContractStub GetLotteryContractStub(ECKeyPair senderKeyPair)
        {
            return Application.ServiceProvider.GetRequiredService<IContractTesterFactory>()
                .Create<LotteryContractContainer.LotteryContractStub>(LotteryContractAddress,
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
    }
}