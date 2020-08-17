using System.IO;
using System.Threading.Tasks;
using Acs0;
using AElf.ContractTestBase.ContractTestKit;
using AElf.Cryptography.ECDSA;
using AElf.Kernel;
using AElf.Kernel.SmartContract.Application;
using AElf.Types;
using Google.Protobuf;
using System.Linq;
using AElf.Boilerplate.TestBase;
using AElf.Contracts.MultiToken;
using AElf.Cryptography.ECDSA;
using AElf.Kernel;
using AElf.Kernel.Blockchain.Application;
using AElf.Kernel.SmartContract.Application;
using AElf.Kernel.Token;
using AElf.Types;
using Microsoft.Extensions.DependencyInjection;
using Volo.Abp.Threading;

namespace AElf.Contracts.FinanceContract
{
    public class FinanceContractTestBase : ContractTestBase<FinanceContractTestModule>
    {
        internal readonly Address FinanceContractAddress;
        internal readonly IBlockchainService blockChainService;
        private Address tokenContractAddress => GetAddress(TokenSmartContractAddressNameProvider.StringName);

        internal FinanceContractContainer.FinanceContractStub GetFinanceContractStub(ECKeyPair senderKeyPair)
        {
            return GetTester<FinanceContractContainer.FinanceContractStub>(FinanceContractAddress, senderKeyPair);
        }

        internal FinanceContractContainer.FinanceContractStub FinanceContractStub =>
            GetFinanceContractStub(SampleAccount.Accounts.First().KeyPair);

      

        internal TokenContractContainer.TokenContractStub TokenContractStub =>
            GetTokenContractStub(SampleAccount.Accounts.First().KeyPair);
        
        internal TokenContractContainer.TokenContractStub GetTokenContractStub(ECKeyPair senderKeyPair)
        {
            return Application.ServiceProvider.GetRequiredService<IContractTesterFactory>()
                .Create<TokenContractContainer.TokenContractStub>(tokenContractAddress, senderKeyPair);
        }

        // You can get address of any contract via GetAddress method, for example:
        // internal Address DAppContractAddress => GetAddress(DAppSmartContractAddressNameProvider.StringName);
        public FinanceContractTestBase()
        {
            FinanceContractAddress = AsyncHelper.RunSync(() => DeployContractAsync(
                KernelConstants.DefaultRunnerCategory,
                File.ReadAllBytes(typeof(FinanceContract).Assembly.Location), SampleAccount.Accounts[0].KeyPair));
            blockChainService =  Application.ServiceProvider.GetRequiredService<IBlockchainService>();
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

        internal FinanceContractContainer.FinanceContractStub UserTomStub =>
            GetFinanceContractStub(UserTomKeyPair);
        internal FinanceContractContainer.FinanceContractStub UserLilyStub =>
            GetFinanceContractStub(UserLilyKeyPair);
        internal TokenContractContainer.TokenContractStub UserTomTokenContractStub => GetTokenContractStub(UserTomKeyPair);
        internal TokenContractContainer.TokenContractStub UserLilyTokenContractStub => GetTokenContractStub(UserLilyKeyPair);
        
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