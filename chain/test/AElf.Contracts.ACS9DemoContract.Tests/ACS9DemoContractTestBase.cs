using System.Collections.Generic;
using System.Linq;
using AElf.Contracts.ACS10DemoContract;
using AElf.Contracts.MultiToken;
using AElf.Contracts.Profit;
using AElf.ContractTestBase.ContractTestKit;
using AElf.Contracts.TokenHolder;
using AElf.Cryptography.ECDSA;
using AElf.EconomicSystem;
using AElf.Kernel;
using AElf.Kernel.Blockchain.Application;
using AElf.Kernel.SmartContract.Application;
using AElf.Kernel.Token;
using AElf.Types;
using Microsoft.Extensions.DependencyInjection;
using Volo.Abp.Threading;

namespace AElf.Contracts.ACS9DemoContract
{
    public class ACS9DemoContractTestBase : ContractTestBase<ACS9DemoContractTestModule>
    {
        protected List<ECKeyPair> UserKeyPairs => SampleAccount.Accounts.Skip(2).Take(3).Select(a => a.KeyPair).ToList();

        protected List<Address> UserAddresses =>
            UserKeyPairs.Select(k => Address.FromPublicKey(k.PublicKey)).ToList();

        protected Address TokenContractAddress => GetAddress(TokenSmartContractAddressNameProvider.StringName);
        protected Address ProfitContractAddress => GetAddress(ProfitSmartContractAddressNameProvider.StringName);

        protected Address TokenHolderContractAddress =>
            GetAddress(TokenHolderSmartContractAddressNameProvider.StringName);

        internal Address ACS9DemoContractAddress => GetAddress(ACS9DemoSmartContractNameProvider.StringName);
        internal Address ACS10DemoContractAddress => GetAddress(ACS10DemoSmartContractNameProvider.StringName);

        internal TokenContractImplContainer.TokenContractImplStub TokenContractStub
        {
            get
            {
                var factory = Application.ServiceProvider.GetRequiredService<IContractTesterFactory>();
                return factory.Create<TokenContractImplContainer.TokenContractImplStub>(TokenContractAddress,
                    SampleAccount.Accounts.First().KeyPair);
            }
        }

        internal ProfitContractContainer.ProfitContractStub ProfitContractStub
        {
            get
            {
                var factory = Application.ServiceProvider.GetRequiredService<IContractTesterFactory>();
                return factory.Create<ProfitContractContainer.ProfitContractStub>(ProfitContractAddress,
                    SampleAccount.Accounts.First().KeyPair);
            }
        }

        internal TokenHolderContractContainer.TokenHolderContractStub TokenHolderContractStub
        {
            get
            {
                var factory = Application.ServiceProvider.GetRequiredService<IContractTesterFactory>();
                return factory.Create<TokenHolderContractContainer.TokenHolderContractStub>(TokenHolderContractAddress,
                    SampleAccount.Accounts.First().KeyPair);
            }
        }


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

        internal ACS9DemoContractContainer.ACS9DemoContractStub GetACS9DemoContractStub(ECKeyPair senderKeyPair)
        {
            var factory = Application.ServiceProvider.GetRequiredService<IContractTesterFactory>();
            return factory.Create<ACS9DemoContractContainer.ACS9DemoContractStub>(ACS9DemoContractAddress,
                senderKeyPair);
        }

        internal ACS10DemoContractContainer.ACS10DemoContractStub GetACS10DemoContractStub(ECKeyPair senderKeyPair)
        {
            var factory = Application.ServiceProvider.GetRequiredService<IContractTesterFactory>();
            return factory.Create<ACS10DemoContractContainer.ACS10DemoContractStub>(ACS10DemoContractAddress,
                senderKeyPair);
        }
    }
}