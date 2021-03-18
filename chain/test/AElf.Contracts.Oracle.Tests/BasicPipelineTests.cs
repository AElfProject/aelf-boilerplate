using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AElf.Contracts.MultiToken;
using AElf.Contracts.OracleUser;
using AElf.ContractTestKit;
using AElf.CSharp.Core.Extension;
using AElf.Kernel;
using AElf.Standards.ACS3;
using AElf.Types;
using Google.Protobuf;
using Shouldly;
using Xunit;

namespace AElf.Contracts.Oracle
{
    public partial class OracleContractTests
    {
        private readonly List<Account> _oracleNodeAccounts = SampleAccount.Accounts.Skip(5).Take(5).ToList();

        private List<OracleContractContainer.OracleContractStub> OracleNodeList =>
            _oracleNodeAccounts.Select(a => GetOracleContractStub(a.KeyPair)).ToList();

        private List<Address> OracleNodeAddresses => _oracleNodeAccounts.Select(a => a.Address).ToList();

        internal async Task<QueryRecord> QueryTest()
        {
            await InitializeOracleContractAsync();
            await DefaultParliamentProposeAndRelease(new CreateProposalInput
            {
                ToAddress = TokenContractAddress,
                ContractMethodName = nameof(TokenContractContainer.TokenContractStub.ChangeTokenIssuer),
                OrganizationAddress = await GetDefaultParliament(),
                Params = new ChangeTokenIssuerInput
                {
                    NewTokenIssuer = DefaultSender,
                    Symbol = TokenSymbol
                }.ToByteString(),
                ExpiredTime = TimestampHelper.GetUtcNow().AddHours(1)
            });
            await TokenContractStub.Issue.SendAsync(new IssueInput
            {
                To = OracleUserContractAddress,
                Amount = 100_00000000,
                Symbol = TokenSymbol
            });

            var queryTemperatureInput = new QueryTemperatureInput
            {
                OracleContractAddress = DAppContractAddress,
                AggregatorContractAddress = IntegerAggregatorContractAddress,
                DesignatedNodes = {OracleNodeAddresses}
            };
            var executionResult = await OracleUserContractStub.QueryTemperature.SendAsync(queryTemperatureInput);
            var txId = executionResult.Transaction.GetHash();
            var queryInputHash = executionResult.Output;
            var queryId = ComputeQueryId(txId, queryInputHash);

            var queryRecord = await OracleContractStub.GetQueryRecord.CallAsync(queryId);
            queryRecord.DesignatedNodeList.Value.Count.ShouldBe(5);

            return queryRecord;
        }

        [Fact]
        internal async Task CommitTest()
        {
            var queryRecord = await QueryTest();
            
        }

        private Hash ComputeQueryId(Hash txId, Hash queryInputHash)
        {
            var contactedBytes = txId.Value.Concat(DAppContractAddress.Value);
            var enumerable = (IEnumerable<byte>) queryInputHash.Value as byte[] ?? queryInputHash.Value?.ToArray();
            if (enumerable != null)
                contactedBytes = contactedBytes.Concat(enumerable);
            return HashHelper.ComputeFrom(contactedBytes.ToArray());
        }
    }
}