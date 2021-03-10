using AElf.Boilerplate.TestBase;
using AElf.Cryptography.ECDSA;

namespace AElf.Contracts.ACS2DemoContract
{
    public class ACS2DemoContractTestBase : DAppContractTestBase<ACS2DemoContractTestModule>
    {
        internal ACS2DemoContractContainer.ACS2DemoContractStub GetACS2DemoContractStub(ECKeyPair senderKeyPair)
        {
            return GetTester<ACS2DemoContractContainer.ACS2DemoContractStub>(DAppContractAddress, senderKeyPair);
        }
    }
}