using AElf.Boilerplate.TestBase;
using AElf.Contracts.TestKit;
using AElf.Cryptography.ECDSA;
using AElf.Kernel;
using AElf.Kernel.Blockchain.Application;
using AElf.Kernel.SmartContract.Application;
using AElf.Types;
using Microsoft.Extensions.DependencyInjection;
using Volo.Abp.Threading;

namespace AElf.Contracts.ACS3DemoContract
{
    public class ACS3DemoContractTestBase : ContractTestBase<ACS3DemoContractTestModule>
    {
        internal Address ACS3DemoContractAddress
        {
            get
            {
                var addressService = Application.ServiceProvider.GetRequiredService<ISmartContractAddressService>();
                var blockchainService = Application.ServiceProvider.GetRequiredService<IBlockchainService>();
                var chain = AsyncHelper.RunSync(blockchainService.GetChainAsync);
                var address = AsyncHelper.RunSync(() => addressService.GetSmartContractAddressAsync(new ChainContext
                {
                    BlockHash = chain.BestChainHash,
                    BlockHeight = chain.BestChainHeight
                }, DAppContractAddressNameProvider.StringName)).SmartContractAddress.Address;
                return address;
            }
        }

        internal ACS3DemoContractContainer.ACS3DemoContractStub GetACS3DemoContractStub(ECKeyPair senderKeyPair)
        {
            var factory = Application.ServiceProvider.GetRequiredService<IContractTesterFactory>();
            return factory.Create<ACS3DemoContractContainer.ACS3DemoContractStub>(ACS3DemoContractAddress,
                senderKeyPair);
        }
    }
}