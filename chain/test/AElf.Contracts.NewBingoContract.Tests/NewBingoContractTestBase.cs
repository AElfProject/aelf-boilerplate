using AElf.Boilerplate.TestBase;
using AElf.Cryptography.ECDSA;

namespace AElf.Contracts.NewBingoContract
{
    public class NewBingoContractTestBase : DAppContractTestBase<NewBingoContractTestModule>
    {
        // You can get address of any contract via GetAddress method, for example:
        // internal Address DAppContractAddress => GetAddress(DAppSmartContractAddressNameProvider.StringName);

        internal NewBingoContractContainer.NewBingoContractStub GetNewBingoContractStub(ECKeyPair senderKeyPair)
        {
            return GetTester<NewBingoContractContainer.NewBingoContractStub>(DAppContractAddress, senderKeyPair);
        }
    }
}