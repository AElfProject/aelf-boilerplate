using AElf.Boilerplate.TestBase;
using AElf.Cryptography.ECDSA;

namespace AElf.Contracts.RandomContract
{
    public class RandomContractTestBase : DAppContractTestBase<RandomContractTestModule>
    {
        // You can get address of any contract via GetAddress method, for example:
        // internal Address DAppContractAddress => GetAddress(DAppSmartContractAddressNameProvider.StringName);

        internal RandomContractContainer.RandomContractStub GetRandomContractStub(ECKeyPair senderKeyPair)
        {
            return GetTester<RandomContractContainer.RandomContractStub>(DAppContractAddress, senderKeyPair);
        }
    }
}