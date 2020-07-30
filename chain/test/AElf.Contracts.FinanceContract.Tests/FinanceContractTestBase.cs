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
        internal Address FinanceContractAddress;
        internal TokenContractContainer.TokenContractStub UserTokenContractStub => GetTokenContractStub(UserKeyPair);
        internal Address tokenContractAddress => GetAddress(TokenSmartContractAddressNameProvider.StringName);

        internal FinanceContractContainer.FinanceContractStub GetFinanceContractStub(ECKeyPair senderKeyPair)
        {
            return GetTester<FinanceContractContainer.FinanceContractStub>(FinanceContractAddress, senderKeyPair);
        }

        internal FinanceContractContainer.FinanceContractStub FinanceContractStub =>
            GetFinanceContractStub(SampleAccount.Accounts.First().KeyPair);

        internal FinanceContractContainer.FinanceContractStub UserStub =>
            GetFinanceContractStub(UserKeyPair);

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

        internal ECKeyPair UserKeyPair { get; set; } = SampleAccount.Accounts.Last().KeyPair;
        internal Address UserAddress => Address.FromPublicKey(UserKeyPair.PublicKey);

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