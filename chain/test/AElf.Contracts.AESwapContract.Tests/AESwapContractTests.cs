using System.Threading.Tasks;
using AElf.Contracts.AESwapContract;
using Google.Protobuf.WellKnownTypes;
using Xunit;
using System;
using System.Linq;
using AElf.Contracts.MultiToken;
using AElf.CSharp.Core;
using AElf.Types;
using Google.Protobuf;
using Google.Protobuf.Collections;
using Google.Protobuf.WellKnownTypes;
using Shouldly;
using Xunit;

namespace AElf.Contract.AESwapContract.Tests
{
    public class AESwapContractTests:AESwapContractTestBase
    {
        [Fact]
        public async Task SetUnderlyingPriceTest()
        {
            await CreateAndGetToken();
            await AESwapContractStub.Initialize.SendAsync(new Empty());
            await UserTomStub.CreatePair.SendAsync(new CreatePairInput()
            {
                SymbolPair = "ELF-TEST"
            });
        }
        
        
        private async Task CreateAndGetToken()
        {
            //TEST
            var result = await TokenContractStub.Create.SendAsync(new CreateInput
            {
                Issuer = AdminAddress,
                Symbol = "TEST",
                Decimals = 8,
                IsBurnable = true,
                TokenName = "TEST symbol",
                TotalSupply = 100000000_00000000
            });

            result.TransactionResult.Status.ShouldBe(TransactionResultStatus.Mined);

            var issueResult = await TokenContractStub.Issue.SendAsync(new IssueInput
            {
                Amount = 100000000000000,
                Symbol ="TEST",
                To = AdminAddress
            });
            issueResult.TransactionResult.Status.ShouldBe(TransactionResultStatus.Mined);
            var balance =await TokenContractStub.GetBalance.SendAsync(new GetBalanceInput()
            {
                Owner = AdminAddress,
                Symbol = "TEST"
            });
            balance.Output.Balance.ShouldBe(100000000000000);
            //DAI
            var result2 = await TokenContractStub.Create.SendAsync(new CreateInput
            {
                Issuer = AdminAddress,
                Symbol = "DAI",
                Decimals = 10,
                IsBurnable = true,
                TokenName = "DAI symbol",
                TotalSupply = 100000000_00000000
            });

            result2.TransactionResult.Status.ShouldBe(TransactionResultStatus.Mined);

            var issueResult2 = await TokenContractStub.Issue.SendAsync(new IssueInput
            {
                Amount = 100000000000000,
                Symbol ="DAI",
                To = AdminAddress
            });
            issueResult2.TransactionResult.Status.ShouldBe(TransactionResultStatus.Mined);
            var balance2 =await TokenContractStub.GetBalance.SendAsync(new GetBalanceInput()
            {
                Owner = AdminAddress,
                Symbol = "DAI"
            });
            balance2.Output.Balance.ShouldBe(100000000000000);
            await TokenContractStub.Transfer.SendAsync(new TransferInput()
            {
                Amount = 100000000000,
                Symbol = "ELF",
                Memo = "Recharge",
                To = UserTomAddress
            });
            await TokenContractStub.Transfer.SendAsync(new TransferInput()
            {
                Amount = 100000000000,
                Symbol = "ELF",
                Memo = "Recharge",
                To = UserLilyAddress
            });
            await TokenContractStub.Transfer.SendAsync(new TransferInput()
            {
                Amount = 100000000000,
                Symbol = "TEST",
                Memo = "Recharge",
                To = UserTomAddress
            });
            await TokenContractStub.Transfer.SendAsync(new TransferInput()
            {
                Amount = 100000000000,
                Symbol = "TEST",
                Memo = "Recharge",
                To = UserLilyAddress
            });
            await TokenContractStub.Transfer.SendAsync(new TransferInput()
            {
                Amount = 100000000000,
                Symbol = "DAI",
                Memo = "Recharge",
                To = UserTomAddress
            });
            //authorize  Tom and Lily and admin to transfer ELF and TEST and DAI to FinanceContract
            await UserTomTokenContractStub.Approve.SendAsync(new ApproveInput()
            {
                Amount = 100000000000,
                Spender = AESwapContractAddress,
                Symbol = "ELF"
            });
            await UserTomTokenContractStub.Approve.SendAsync(new ApproveInput()
            {
                Amount = 100000000000,
                Spender = AESwapContractAddress,
                Symbol = "DAI"
            });
            await TokenContractStub.Approve.SendAsync(new ApproveInput()
            {
                Amount = 100000000000,
                Spender = AESwapContractAddress,
                Symbol = "ELF"
            });
            await UserLilyTokenContractStub.Approve.SendAsync(new ApproveInput()
            {
                Amount = 100000000000,
                Spender = AESwapContractAddress,
                Symbol = "ELF"
            });
            await UserTomTokenContractStub.Approve.SendAsync(new ApproveInput()
            {
                Amount = 100000000000,
                Spender = AESwapContractAddress,
                Symbol = "TEST"
            });
            await TokenContractStub.Approve.SendAsync(new ApproveInput()
            {
                Amount = 100000000000,
                Spender = AESwapContractAddress,
                Symbol = "TEST"
            });
            await UserLilyTokenContractStub.Approve.SendAsync(new ApproveInput()
            {
                Amount = 100000000000,
                Spender = AESwapContractAddress,
                Symbol = "TEST"
            });
        }
    }
}