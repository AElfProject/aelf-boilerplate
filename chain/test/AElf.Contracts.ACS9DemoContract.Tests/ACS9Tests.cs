using System.Threading.Tasks;
using AElf.Standards.ACS9;
using AElf.Contracts.MultiToken;
using AElf.Contracts.Profit;
using AElf.ContractTestBase.ContractTestKit;
using AElf.Contracts.TokenHolder;
using AElf.CSharp.Core.Extension;
using AElf.Kernel;
using AElf.Types;
using Google.Protobuf.WellKnownTypes;
using Shouldly;
using Xunit;
using ClaimProfitsInput = AElf.Contracts.TokenHolder.ClaimProfitsInput;

namespace AElf.Contracts.ACS9DemoContract
{
    public class ACS9Tests : ACS9DemoContractTestBase
    {
        [Fact]
        public async Task Test()
        {
            var keyPair = UserKeyPairs[0];
            var address = Address.FromPublicKey(keyPair.PublicKey);

            // Prepare stubs.
            var acs9DemoContractStub = GetACS9DemoContractStub(keyPair);
            var acs10DemoContractStub = GetACS10DemoContractStub(keyPair);
            var userTokenStub =
                GetTester<TokenContractImplContainer.TokenContractImplStub>(TokenContractAddress, UserKeyPairs[0]);
            var userTokenHolderStub =
                GetTester<TokenHolderContractContainer.TokenHolderContractStub>(TokenHolderContractAddress,
                    UserKeyPairs[0]);

            await acs10DemoContractStub.Initialize.SendAsync(new ACS10DemoContract.InitializeInput());
            
            // Transfer some ELFs to user.
            await TokenContractStub.Transfer.SendAsync(new TransferInput
            {
                To = address,
                Symbol = "ELF",
                Amount = 1000_00000000
            });

            await acs9DemoContractStub.SignUp.SendAsync(new Empty());

            // User has 10 APP tokens because of signing up.
            (await GetFirstUserBalance("APP")).ShouldBe(10_00000000);

            var elfBalanceBefore = await GetFirstUserBalance("ELF");

            // User has to Approve an amount of ELF tokens before deposit to the DApp.
            await userTokenStub.Approve.SendAsync(new ApproveInput
            {
                Amount = 1000_00000000,
                Spender = ACS9DemoContractAddress,
                Symbol = "ELF"
            });
            await acs9DemoContractStub.Deposit.SendAsync(new DepositInput
            {
                Amount = 100_00000000
            });

            // Check the change of balance of ELF.
            var elfBalanceAfter = await GetFirstUserBalance("ELF");
            elfBalanceAfter.ShouldBe(elfBalanceBefore - 100_00000000);

            // Now user has 110 APP tokens.
            (await GetFirstUserBalance("APP")).ShouldBe(110_00000000);

            // User lock some APP tokens for getting profits. (APP -57)
            await userTokenHolderStub.RegisterForProfits.SendAsync(new RegisterForProfitsInput
            {
                SchemeManager = ACS9DemoContractAddress,
                Amount = 57_00000000
            });

            await userTokenStub.Approve.SendAsync(new ApproveInput
            {
                Amount = long.MaxValue,
                Spender = ACS9DemoContractAddress,
                Symbol = "APP"
            });

            // User uses 10 times of this DApp. (APP -3)
            for (var i = 0; i < 10; i++)
            {
                await acs9DemoContractStub.Use.SendAsync(new Record());
            }

            // Now user has 50 APP tokens.
            (await GetFirstUserBalance("APP")).ShouldBe(50_00000000);

            const long baseBalance = 0;

            {
                var balance = await TokenContractStub.GetBalance.CallAsync(new GetBalanceInput
                {
                    Owner = UserAddresses[1], Symbol = "ELF"
                });
                balance.Balance.ShouldBe(baseBalance);
            }

            // Profits receiver claim 10 ELF profits.
            await acs9DemoContractStub.TakeContractProfits.SendAsync(new TakeContractProfitsInput
            {
                Symbol = "ELF",
                Amount = 10_0000_0000
            });

            // Then profits receiver should have 9.9 ELF tokens.
            {
                var balance = await TokenContractStub.GetBalance.CallAsync(new GetBalanceInput
                {
                    Owner = UserAddresses[1], Symbol = "ELF"
                });
                balance.Balance.ShouldBe(baseBalance + 9_9000_0000);
            }

            // And Side Chain Dividends Pool should have 0.1 ELF tokens.
            {
                var scheme = await TokenHolderContractStub.GetScheme.CallAsync(ACS10DemoContractAddress);
                var virtualAddress = await ProfitContractStub.GetSchemeAddress.CallAsync(new SchemePeriod
                {
                    SchemeId = scheme.SchemeId,
                    Period = 0
                });
                var balance = await TokenContractStub.GetBalance.CallAsync(new GetBalanceInput
                {
                    Owner = virtualAddress,
                    Symbol = "ELF"
                });
                balance.Balance.ShouldBe(1000_0000);
            }

            // Help user to claim profits from token holder profit scheme.
            await TokenHolderContractStub.ClaimProfits.SendAsync(new ClaimProfitsInput
            {
                Beneficiary = UserAddresses[0],
                SchemeManager = ACS9DemoContractAddress,
            });

            // Profits should be 1 ELF.
            (await GetFirstUserBalance("ELF")).ShouldBe(elfBalanceAfter + 1_0000_0000);

            // Withdraw
            var beforeBalance =
                await userTokenStub.GetBalance.CallAsync(new GetBalanceInput
                {
                    Symbol = "APP",
                    Owner = UserAddresses[0]
                });
            var blockTimeProvider = GetRequiredService<IBlockTimeProvider>();
            blockTimeProvider.SetBlockTime(TimestampHelper.GetUtcNow().AddMilliseconds(60000));
            var withDrawResult = await userTokenHolderStub.Withdraw.SendAsync(ACS9DemoContractAddress);
            withDrawResult.TransactionResult.Status.ShouldBe(TransactionResultStatus.Mined);
            var resultBalance = await userTokenStub.GetBalance.CallAsync(new GetBalanceInput
            {
                Symbol = "APP",
                Owner = UserAddresses[0]
            });
            resultBalance.Balance.ShouldBe(beforeBalance.Balance + 57_00000000);
        }

        private async Task<long> GetFirstUserBalance(string symbol)
        {
            var balance = await TokenContractStub.GetBalance.CallAsync(new GetBalanceInput
            {
                Owner = UserAddresses[0], Symbol = symbol
            });
            return balance.Balance;
        }
    }
}