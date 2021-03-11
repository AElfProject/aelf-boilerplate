using AElf.Boilerplate.TestBase;
using AElf.Cryptography.ECDSA;

namespace AElf.Contracts.TransferWrapperContract
{
    public class TransferWrapperContractTestBase : DAppContractTestBase<TransferWrapperContractTestModule>
    {
        // You can get address of any contract via GetAddress method, for example:
        // internal Address DAppContractAddress => GetAddress(DAppSmartContractAddressNameProvider.StringName);

        internal TransferWrapperContractContainer.TransferWrapperContractStub GetTransferWrapperContractStub(ECKeyPair senderKeyPair)
        {
            return GetTester<TransferWrapperContractContainer.TransferWrapperContractStub>(DAppContractAddress, senderKeyPair);
        }
    }
}