using AElf.Boilerplate.TestBase;
using AElf.Cryptography.ECDSA;

namespace Tank.Contracts.Vote
{
    public class VoteContractTestBase : DAppContractTestBase<VoteContractTestModule>
    {
        // You can get address of any contract via GetAddress method, for example:
        // internal Address DAppContractAddress => GetAddress(DAppSmartContractAddressNameProvider.StringName);

        internal VoteContractContainer.VoteContractStub GetVoteContractStub(ECKeyPair senderKeyPair)
        {
            return GetTester<VoteContractContainer.VoteContractStub>(DAppContractAddress, senderKeyPair);
        }
    }
}