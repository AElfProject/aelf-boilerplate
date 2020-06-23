using AElf.Boilerplate.TestBase;
using AElf.EconomicSystem;
using AElf.Kernel.Token;
using AElf.Types;

namespace AElf.Contracts.ACS10DemoContract
{
    public class ACS10DemoContractTestBase : DAppContractTestBase<ACS10DemoContractTestModule>
    {
        internal Address TokenContractAddress => GetAddress(TokenSmartContractAddressNameProvider.StringName);

        internal Address TokenHolderContractAddress =>
            GetAddress(TokenHolderSmartContractAddressNameProvider.StringName);
    }
}