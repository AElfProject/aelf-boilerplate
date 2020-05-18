using System.Collections.Generic;
using System.Linq;
using AElf.Boilerplate.TestBase;
using AElf.Contracts.ACS10DemoContract;
using AElf.Contracts.MultiToken;
using AElf.Contracts.Profit;
using AElf.Contracts.TestKit;
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

namespace AElf.Contracts.ACS10DemoContract
{
    public class ACS10DemoContractTestBase : DAppContractTestBase<ACS10DemoContractTestModule>
    {
        protected List<ECKeyPair> UserKeyPairs => SampleECKeyPairs.KeyPairs.Skip(2).Take(3).ToList();

        protected List<Address> UserAddresses =>
            UserKeyPairs.Select(k => Address.FromPublicKey(k.PublicKey)).ToList();

        internal Address ACS10DemoContractAddress => GetAddress(DAppContractAddressNameProvider.StringName);

        internal Address TokenContractAddress => GetAddress(TokenSmartContractAddressNameProvider.StringName);

        internal Address TokenHolderContractAddress =>
            GetAddress(TokenHolderSmartContractAddressNameProvider.StringName);
    }
}