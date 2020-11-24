using AElf.Boilerplate.TestBase;
using AElf.Cryptography.ECDSA;

namespace AElf.Contracts.GreeterContract
{
    public class GreeterContractTestBase : DAppContractTestBase<GreeterContractTestModule>
    {
        // You can get address of any contract via GetAddress method, for example:
        // internal Address DAppContractAddress => GetAddress(DAppSmartContractAddressNameProvider.StringName);

        internal GreeterContractContainer.GreeterContractStub GetGreeterContractStub(ECKeyPair senderKeyPair)
        {
            return GetTester<GreeterContractContainer.GreeterContractStub>(DAppContractAddress, senderKeyPair);
        }
    }
}