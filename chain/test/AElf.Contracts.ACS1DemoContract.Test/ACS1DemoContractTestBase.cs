using AElf.Boilerplate.TestBase;
using AElf.Contracts.TestKit;
using AElf.Cryptography.ECDSA;
using AElf.Kernel;
using AElf.Kernel.Blockchain.Application;
using AElf.Kernel.SmartContract.Application;
using Microsoft.Extensions.DependencyInjection;
using Volo.Abp.Threading;

namespace AElf.Contracts.ACS1DemoContract
{
    public class ACS1DemoContractTestBase : ContractTestBase<ACS1DemoContractTestModule>
    {
        public ACS1DemoContractTestBase()
        {

        }

        internal ACS1DemoContractContainer.ACS1DemoContractStub GetACS1DemoContractStub(ECKeyPair senderKeyPair)
        {
            var factory = Application.ServiceProvider.GetRequiredService<IContractTesterFactory>();
            var addressService = Application.ServiceProvider.GetRequiredService<ISmartContractAddressService>();
            var blockchainService = Application.ServiceProvider.GetRequiredService<IBlockchainService>();
            var chain = AsyncHelper.RunSync(blockchainService.GetChainAsync);
            var address = AsyncHelper.RunSync(() => addressService.GetSmartContractAddressAsync(new ChainContext
            {
                BlockHash = chain.BestChainHash,
                BlockHeight = chain.BestChainHeight
            }, TestContractAddressNameProvider.StringName)).SmartContractAddress.Address;
            return factory.Create<ACS1DemoContractContainer.ACS1DemoContractStub>(address, senderKeyPair);
        }
    }
}