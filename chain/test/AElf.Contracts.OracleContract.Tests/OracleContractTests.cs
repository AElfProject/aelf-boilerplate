using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AElf.Contracts.MultiToken;
using AElf.ContractTestBase.ContractTestKit;
using AElf.CSharp.Core.Extension;
using AElf.Kernel;
using AElf.Standards.ACS3;
using AElf.Types;
using Google.Protobuf;
using Google.Protobuf.WellKnownTypes;
using Shouldly;
using Xunit;

namespace AElf.Contracts.OracleContract
{
    public partial class OracleContractTests : OracleContractTestBase
    {
        private async Task InitializeOracleContract()
        {
            await OracleContractStub.Initialize.SendAsync(new InitializeInput
            {
                DefaultMinimumAvailableNodesCount = DefaultMinimumAvailableNodesCount,
                DefaultThresholdResponses = DefaultThresholdResponses,
                DefaultThresholdToUpdateData = DefaultThresholdToUpdateData,
                MinimumEscrow = DefaultMinimumEscrow,
                ClearRedundantRevenue = DefaultClearRedundantRevenue,
                ExpirationTime = DefaultExpirationTime
            });
        }

        private async Task TransferTokenOwner()
        {
            var defaultParliament = await GetDefaultParliament();
            await DefaultParliamentPropose(new CreateProposalInput
            {
                ToAddress = TokenContractAddress,
                ContractMethodName = nameof(TokenContractContainer.TokenContractStub.ChangeTokenIssuer),
                OrganizationAddress = defaultParliament,
                Params = new ChangeTokenIssuerInput
                {
                    NewTokenIssuer = DefaultSender,
                    Symbol = TokenSymbol
                }.ToByteString(),
                ExpiredTime = TimestampHelper.GetUtcNow().AddHours(1)
            });
        }

        private async Task<IList<OracleContractContainer.OracleContractStub>> CreateOracleNode(int count)
        {
            var nodeAccounts = GetNodes(count).ToList();
            var nodesStubs = new List<OracleContractContainer.OracleContractStub>();
            foreach (var node in nodeAccounts)
            {
                await TokenContractStub.Issue.SendAsync(new IssueInput
                {
                    Symbol = TokenSymbol,
                    Amount = DefaultMinimumEscrow,
                    To = node.Address
                });
                var nodeOracleStub = GetOracleContractStub(node.KeyPair);
                var tokenStub = GetTokenContractStub(node.KeyPair);
                await tokenStub.Approve.SendAsync(new ApproveInput
                {
                    Amount = DefaultMinimumEscrow,
                    Symbol = TokenSymbol,
                    Spender = DAppContractAddress
                });
                await nodeOracleStub.DepositEscrow.SendAsync(new DepositEscrowInput
                {
                    Amount = DefaultMinimumEscrow
                });
                await OracleContractStub.AddNode.SendAsync(new AddNodeInput
                {
                    Node = node.Address
                });
                nodesStubs.Add(nodeOracleStub);
            }

            return nodesStubs;
        }

        [Fact]
        public async Task CreateRequest_Success_Test()
        {
            await InitializeOracleContract();
            await TransferTokenOwner();
            await CreateOracleNode(DefaultMinimumAvailableNodesCount);
            var ret = await OracleContractStub.CreateRequest.SendAsync(new CreateRequestInput
            {
                UrlToQuery = "wwww.adc.com",
                AttributeToFetch = "id = 1",
                Payment = 100,
                MethodName = "callback",
                CallbackAddress = new Address()
            });
            var newRequest = new NewRequest();
            newRequest.MergeFrom(ret.TransactionResult.Logs.First(l => l.Name == nameof(NewRequest)));
            newRequest.RoundId.ShouldBe(1);
        }
    }
}