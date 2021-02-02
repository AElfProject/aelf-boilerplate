using AElf.Boilerplate.TestBase;
using AElf.Cryptography.ECDSA;

namespace GameStoreContract
{
    public class GameStoreContractTestBase : DAppContractTestBase<GameStoreContractTestModule>
    {
        // You can get address of any contract via GetAddress method, for example:
        // internal Address DAppContractAddress => GetAddress(DAppSmartContractAddressNameProvider.StringName);

        internal GameStoreContractContainer.GameStoreContractStub GetGameStoreContractStub(ECKeyPair senderKeyPair)
        {
            return GetTester<GameStoreContractContainer.GameStoreContractStub>(DAppContractAddress, senderKeyPair);
        }
    }
}