using AElf.ContractTestBase.ContractTestKit;
using AElf.Kernel;
using AElf.Kernel.Blockchain.Application;
using AElf.Kernel.SmartContract.Application;
using AElf.Types;
using Microsoft.Extensions.DependencyInjection;
using Volo.Abp.Modularity;
using Volo.Abp.Threading;

namespace AElf.Boilerplate.TestBase
{
    public class DAppContractTestBase<TModule> : ContractTestBase<TModule> where TModule : AbpModule
    {
        public Address DAppContractAddress => GetAddress(DAppSmartContractAddressNameProvider.StringName);

        public Address GetAddress(string contractStringName)
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