using System.Linq;
using System.Threading.Tasks;
using AElf.Contracts.MultiToken;
using AElf.ContractTestKit;
using AElf.Kernel.Infrastructure;
using AElf.Kernel.Token;
using AElf.Types;
using Google.Protobuf.WellKnownTypes;
using Shouldly;
using Xunit;

namespace AElf.Contracts.BingoGameContract
{
    public class BingoGameGameContractTests : BingoGameContractTestBase
    {
        [Fact]
        public async Task Test()
        {
            // Get a stub for testing.
            var keyPair = SampleAccount.Accounts.First().KeyPair;
            var stub = GetBingoGameContractStub(keyPair);
            var tokenStub =
                GetTester<TokenContractContainer.TokenContractStub>(
                    GetAddress(TokenSmartContractAddressNameProvider.StringName), keyPair);

            // Prepare awards.
            await tokenStub.Transfer.SendAsync(new TransferInput
            {
                To = DAppContractAddress,
                Symbol = "ELF",
                Amount = 100_00000000
            });

            await stub.Register.SendAsync(new Empty());

            // Now I have player information.
            var address = Address.FromPublicKey(keyPair.PublicKey);

            {
                var playerInformation = await stub.GetPlayerInformation.CallAsync(address);
                playerInformation.Seed.Value.ShouldNotBeEmpty();
                playerInformation.RegisterTime.ShouldNotBeNull();
            }

            // Play.
            var txResult = (await tokenStub.Approve.SendAsync(new ApproveInput
            {
                Spender = DAppContractAddress,
                Symbol = "ELF",
                Amount = 10000
            })).TransactionResult;
            txResult.Status.ShouldBe(TransactionResultStatus.Mined);

            await stub.Play.SendAsync(new Int64Value {Value = 10000});

            Hash playId;
            {
                var playerInformation = await stub.GetPlayerInformation.CallAsync(address);
                playerInformation.Bouts.ShouldNotBeEmpty();
                playId = playerInformation.Bouts.First().PlayId;
            }

            // Mine 7 more blocks.
            for (var i = 0; i < 7; i++)
            {
                await stub.Bingo.SendWithExceptionAsync(playId);
            }

            await stub.Bingo.SendAsync(playId);

            var award = await stub.GetAward.CallAsync(playId);
            award.Value.ShouldNotBe(0);
        }
    }
}