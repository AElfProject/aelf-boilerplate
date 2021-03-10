using AElf.Boilerplate.TestBase;
using AElf.Cryptography.ECDSA;

namespace AElf.Contracts.HaloContract
{
    public class HaloContractTestBase : DAppContractTestBase<HaloContractTestModule>
    {
        // You can get address of any contract via GetAddress method, for example:
        // internal Address DAppContractAddress => GetAddress(DAppSmartContractAddressNameProvider.StringName);

        internal HaloContractContainer.HaloContractStub GetHaloContractStub(ECKeyPair senderKeyPair)
        {
            return GetTester<HaloContractContainer.HaloContractStub>(DAppContractAddress, senderKeyPair);
        }
    }
}