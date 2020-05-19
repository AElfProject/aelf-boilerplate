using AElf.Boilerplate.TestBase;
using AElf.Cryptography.ECDSA;

namespace AElf.Contracts.BingoGameContract
{
    public class BingoGameContractTestBase : DAppContractTestBase<BingoGameContractTestModule>
    {
        // You can get address of any contract via GetAddress method, for example:
        // internal Address DAppContractAddress => GetAddress(DAppSmartContractAddressNameProvider.StringName);

        internal BingoGameContractContainer.BingoGameContractStub GetBingoGameContractStub(ECKeyPair senderKeyPair)
        {
            return GetTester<BingoGameContractContainer.BingoGameContractStub>(DAppContractAddress, senderKeyPair);
        }
    }
}