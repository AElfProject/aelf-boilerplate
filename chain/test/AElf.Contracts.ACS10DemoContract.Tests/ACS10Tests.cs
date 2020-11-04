using System.Linq;
using System.Threading.Tasks;
using AElf.Standards.ACS10;
using AElf.Contracts.MultiToken;
using AElf.ContractTestBase.ContractTestKit;
using AElf.Contracts.TokenHolder;
using AElf.Kernel.Blockchain.Application;
using AElf.Types;
using Google.Protobuf.WellKnownTypes;
using Microsoft.Extensions.DependencyInjection;
using Shouldly;
using Xunit;

namespace AElf.Contracts.ACS10DemoContract
{
    public class ACS10Tests : ACS10DemoContractTestBase
    {
        [Fact]
        public async Task Test()
        {
            const long amount = 10_00000000;

            var keyPair = SampleAccount.Accounts.First().KeyPair;
            var address = Address.FromPublicKey(keyPair.PublicKey);
            var acs10DemoContractStub =
                GetTester<ACS10DemoContractContainer.ACS10DemoContractStub>(DAppContractAddress, keyPair);
            var tokenContractStub =
                GetTester<TokenContractContainer.TokenContractStub>(TokenContractAddress, keyPair);
            var tokenHolderContractStub =
                GetTester<TokenHolderContractContainer.TokenHolderContractStub>(TokenHolderContractAddress,
                    keyPair);

            await tokenContractStub.Approve.SendAsync(new ApproveInput
            {
                Spender = TokenHolderContractAddress,
                Symbol = "ELF",
                Amount = long.MaxValue
            });

            await tokenContractStub.Approve.SendAsync(new ApproveInput
            {
                Spender = DAppContractAddress,
                Symbol = "ELF",
                Amount = long.MaxValue
            });

            await tokenHolderContractStub.RegisterForProfits.SendAsync(new RegisterForProfitsInput
            {
                SchemeManager = DAppContractAddress,
                Amount = amount
            });

            await acs10DemoContractStub.Donate.SendAsync(new DonateInput
            {
                Symbol = "ELF",
                Amount = amount
            });

            // Check undistributed dividends before releasing.
            {
                var undistributedDividends =
                    await acs10DemoContractStub.GetUndistributedDividends.CallAsync(new Empty());
                undistributedDividends.Value["ELF"].ShouldBe(amount);
            }

            var blockchainService = Application.ServiceProvider.GetRequiredService<IBlockchainService>();
            var currentBlockHeight = (await blockchainService.GetChainAsync()).BestChainHeight;
            var dividends =
                await acs10DemoContractStub.GetDividends.CallAsync(new Int64Value {Value = currentBlockHeight});
            dividends.Value["ELF"].ShouldBe(amount);

            await acs10DemoContractStub.Release.SendAsync(new ReleaseInput
            {
                PeriodNumber = 1
            });

            // Check undistributed dividends after releasing.
            {
                var undistributedDividends =
                    await acs10DemoContractStub.GetUndistributedDividends.CallAsync(new Empty());
                undistributedDividends.Value["ELF"].ShouldBe(0);
            }

            var balanceBeforeClaimForProfits = await tokenContractStub.GetBalance.CallAsync(new GetBalanceInput
            {
                Owner = address,
                Symbol = "ELF"
            });

            await tokenHolderContractStub.ClaimProfits.SendAsync(new ClaimProfitsInput
            {
                SchemeManager = DAppContractAddress,
                Beneficiary = address
            });

            var balanceAfterClaimForProfits = await tokenContractStub.GetBalance.CallAsync(new GetBalanceInput
            {
                Owner = address,
                Symbol = "ELF"
            });

            balanceAfterClaimForProfits.Balance.ShouldBe(balanceBeforeClaimForProfits.Balance + amount);
        }
    }
}