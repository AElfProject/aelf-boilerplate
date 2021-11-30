using AElf.Boilerplate.TestBase;
using AElf.Cryptography.ECDSA;

namespace AElf.Contracts.BigIntValueDemoContract
{
    public class BigIntValueDemoContractTestBase : DAppContractTestBase<BigIntValueDemoContractTestModule>
    {
        // You can get address of any contract via GetAddress method, for example:
        // internal Address DAppContractAddress => GetAddress(DAppSmartContractAddressNameProvider.StringName);

        internal BigIntValueDemoContractContainer.BigIntValueDemoContractStub GetBigIntValueDemoContractStub(ECKeyPair senderKeyPair)
        {
            return GetTester<BigIntValueDemoContractContainer.BigIntValueDemoContractStub>(DAppContractAddress, senderKeyPair);
        }
    }
}