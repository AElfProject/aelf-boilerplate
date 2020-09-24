using AElf.Boilerplate.TestBase;
using AElf.ContractTestBase.ContractTestKit;
using AElf.Cryptography.ECDSA;
using AElf.Kernel;
using AElf.Kernel.Blockchain.Application;
using AElf.Kernel.SmartContract.Application;
using AElf.Types;
using Microsoft.Extensions.DependencyInjection;
using Volo.Abp.Threading;

namespace AElf.Contracts.ACS8DemoContract
{
    public class ACS8DemoContractTestBase : ContractTestBase<ACS8DemoContractTestModule>
    {
        internal Address ACS8DemoContractAddress
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
                }, DAppSmartContractAddressNameProvider.StringName)).SmartContractAddress.Address;
                return address;
            }
        }

        internal ACS8DemoContractContainer.ACS8DemoContractStub GetACS8DemoContractStub(ECKeyPair senderKeyPair)
        {
            var factory = Application.ServiceProvider.GetRequiredService<IContractTesterFactory>();
            return factory.Create<ACS8DemoContractContainer.ACS8DemoContractStub>(ACS8DemoContractAddress,
                senderKeyPair);
        }
    }
}