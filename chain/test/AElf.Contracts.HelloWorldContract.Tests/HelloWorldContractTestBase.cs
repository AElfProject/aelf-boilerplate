using AElf.Boilerplate.TestBase;
using AElf.Cryptography.ECDSA;

namespace AElf.Contracts.HelloWorldContract
{
    public class HelloWorldContractTestBase : DAppContractTestBase<HelloWorldContractTestModule>
    {
        // You can get address of any contract via GetAddress method, for example:
        // internal Address DAppContractAddress => GetAddress(DAppSmartContractAddressNameProvider.StringName);

        internal HelloWorldContractContainer.HelloWorldContractStub GetHelloWorldContractStub(ECKeyPair senderKeyPair)
        {
            return GetTester<HelloWorldContractContainer.HelloWorldContractStub>(DAppContractAddress, senderKeyPair);
        }
    }
}