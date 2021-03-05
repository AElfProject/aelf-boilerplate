using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AElf.Boilerplate.TestBase;
using AElf.Contracts.MultiToken;
using AElf.Contracts.Parliament;
using AElf.ContractTestKit;
using AElf.Cryptography.ECDSA;
using AElf.Standards.ACS3;
using AElf.Types;
using Google.Protobuf.WellKnownTypes;

namespace AElf.Contracts.OracleContract
{
    public class OracleContractTestBase : DAppContractTestBase<OracleContractTestModule>
    {
        // You can get address of any contract via GetAddress method, for example:
        // internal Address DAppContractAddress => GetAddress(DAppSmartContractAddressNameProvider.StringName);
        
        protected Address DefaultSender { get; set; }
        internal IList<OracleContractContainer.OracleContractStub> OracleNodes { get; set; }
        internal OracleContractContainer.OracleContractStub OracleContractStub { get; set; }
        internal TokenContractContainer.TokenContractStub TokenContractStub { get; set; }
        internal ParliamentContractImplContainer.ParliamentContractImplStub ParliamentContractStub { get; set; }

        protected OracleContractTestBase()
        {
            var keyPair = SampleAccount.Accounts.First().KeyPair;
            DefaultSender = SampleAccount.Accounts.First().Address;
            OracleContractStub = GetOracleContractStub(keyPair);
            TokenContractStub = GetTokenContractStub(keyPair);
            ParliamentContractStub = GetParliamentContractStub(keyPair);
            OracleNodes = new List<OracleContractContainer.OracleContractStub>();
        }
        internal OracleContractContainer.OracleContractStub GetOracleContractStub(ECKeyPair senderKeyPair)
        {
            return GetTester<OracleContractContainer.OracleContractStub>(DAppContractAddress, senderKeyPair);
        }
        
        internal TokenContractContainer.TokenContractStub GetTokenContractStub(ECKeyPair senderKeyPair)
        {
            return GetTester<TokenContractContainer.TokenContractStub>(TokenContractAddress, senderKeyPair);
        }
        
        internal ParliamentContractImplContainer.ParliamentContractImplStub GetParliamentContractStub(ECKeyPair senderKeyPair)
        {
            return GetTester<ParliamentContractImplContainer.ParliamentContractImplStub>(ParliamentContractAddress, senderKeyPair);
        }

        protected IEnumerable<Account> GetNodes(int count)
        {
            return SampleAccount.Accounts.Skip(1).Take(count).ToList();
        }

        protected async Task<Address> GetDefaultParliament()
        {
            return await ParliamentContractStub.GetDefaultOrganizationAddress.CallAsync(new Empty());
        }

        internal async Task DefaultParliamentProposeAndRelease(CreateProposalInput proposal)
        {
            var ret = await ParliamentContractStub.CreateProposal.SendAsync(proposal);
            var proposalId = Hash.Parser.ParseFrom(ret.TransactionResult.ReturnValue);
            await ParliamentContractStub.Approve.SendAsync(proposalId);
            await ParliamentContractStub.Release.SendAsync(proposalId);
        }
    }
}