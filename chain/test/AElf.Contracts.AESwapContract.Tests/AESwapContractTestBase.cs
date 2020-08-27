using System.IO;
using System.Threading.Tasks;
using Acs0;
using AElf.Cryptography.ECDSA;
using AElf.Kernel;
using AElf.Kernel.SmartContract.Application;
using AElf.Types;
using Google.Protobuf;
using System.Linq;
using AElf.Contracts.MultiToken;
using AElf.ContractTestBase.ContractTestKit;
using AElf.Kernel.Blockchain.Application;
using AElf.Kernel.Token;
using Microsoft.Extensions.DependencyInjection;
using Volo.Abp.Threading;

namespace AElf.Contracts.AESwapContract
{
    public class AESwapContractTestBase : ContractTestBase<AESwapContractTestModule>
    {
        internal readonly Address AESwapContractAddress;
        internal readonly IBlockchainService blockChainService;
        private Address tokenContractAddress => GetAddress(TokenSmartContractAddressNameProvider.StringName);

        internal AESwapContractContainer.AESwapContractStub GetAESwapContractStub(ECKeyPair senderKeyPair)
        {
            return GetTester<AESwapContractContainer.AESwapContractStub>(AESwapContractAddress, senderKeyPair);
        }

        internal AESwapContractContainer.AESwapContractStub AESwapContractStub =>
            GetAESwapContractStub(SampleAccount.Accounts.First().KeyPair);


        internal TokenContractContainer.TokenContractStub TokenContractStub =>
            GetTokenContractStub(SampleAccount.Accounts.First().KeyPair);

        internal TokenContractContainer.TokenContractStub GetTokenContractStub(ECKeyPair senderKeyPair)
        {
            return Application.ServiceProvider.GetRequiredService<IContractTesterFactory>()
                .Create<TokenContractContainer.TokenContractStub>(tokenContractAddress, senderKeyPair);
        }

        // You can get address of any contract via GetAddress method, for example:
        // internal Address DAppContractAddress => GetAddress(DAppSmartContractAddressNameProvider.StringName);
        public AESwapContractTestBase()
        {
            AESwapContractAddress = AsyncHelper.RunSync(() => DeployContractAsync(
                KernelConstants.DefaultRunnerCategory,
                File.ReadAllBytes(typeof(AESwapContract).Assembly.Location), SampleAccount.Accounts[0].KeyPair));
            blockChainService = Application.ServiceProvider.GetRequiredService<IBlockchainService>();
        }

        private async Task<Address> DeployContractAsync(int category, byte[] code, ECKeyPair keyPair)
        {
            var addressService = Application.ServiceProvider.GetRequiredService<ISmartContractAddressService>();
            var stub = GetTester<ACS0Container.ACS0Stub>(addressService.GetZeroSmartContractAddress(),
                keyPair);
            var executionResult = await stub.DeploySmartContract.SendAsync(new ContractDeploymentInput
            {
                Category = category,
                Code = ByteString.CopyFrom(code)
            });
            return executionResult.Output;
        }

        private ECKeyPair AdminKeyPair { get; set; } = SampleAccount.Accounts[0].KeyPair;
        private ECKeyPair UserTomKeyPair { get; set; } = SampleAccount.Accounts.Last().KeyPair;
        private ECKeyPair UserLilyKeyPair { get; set; } = SampleAccount.Accounts.Reverse().Skip(1).First().KeyPair;

        internal Address UserTomAddress => Address.FromPublicKey(UserTomKeyPair.PublicKey);
        internal Address UserLilyAddress => Address.FromPublicKey(UserLilyKeyPair.PublicKey);

        internal Address AdminAddress => Address.FromPublicKey(AdminKeyPair.PublicKey);

        internal AESwapContractContainer.AESwapContractStub UserTomStub =>
            GetAESwapContractStub(UserTomKeyPair);

        internal AESwapContractContainer.AESwapContractStub UserLilyStub =>
            GetAESwapContractStub(UserLilyKeyPair);

        internal TokenContractContainer.TokenContractStub UserTomTokenContractStub =>
            GetTokenContractStub(UserTomKeyPair);

        internal TokenContractContainer.TokenContractStub UserLilyTokenContractStub =>
            GetTokenContractStub(UserLilyKeyPair);

        private Address GetAddress(string contractName)
        {
            var addressService = Application.ServiceProvider.GetRequiredService<ISmartContractAddressService>();
            var blockChainService = Application.ServiceProvider.GetRequiredService<IBlockchainService>();
            var chain = AsyncHelper.RunSync(blockChainService.GetChainAsync);
            var address = AsyncHelper.RunSync(() => addressService.GetSmartContractAddressAsync(new ChainContext()
            {
                BlockHash = chain.BestChainHash,
                BlockHeight = chain.BestChainHeight
            }, contractName)).SmartContractAddress.Address;
            return address;
        }
    }
}