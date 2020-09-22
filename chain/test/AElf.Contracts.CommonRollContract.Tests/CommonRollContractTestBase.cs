using System.Linq;
using AElf.Boilerplate.TestBase;
using AElf.ContractTestKit;
using AElf.Cryptography.ECDSA;

namespace AElf.Contracts.CommonRollContract
{
    public class CommonRollContractTestBase : DAppContractTestBase<CommonRollContractTestModule>
    {
        internal CommonRollContractContainer.CommonRollContractStub GetCommonRollContractStub(ECKeyPair senderKeyPair)
        {
            return GetTester<CommonRollContractContainer.CommonRollContractStub>(DAppContractAddress, senderKeyPair);
        }

        internal ECKeyPair TomKeyPair { get; set; } = SampleAccount.Accounts.Last().KeyPair;

        internal CommonRollContractContainer.CommonRollContractStub CommonRollContractStub =>
            GetCommonRollContractStub(SampleAccount.Accounts.First().KeyPair);
    }
}