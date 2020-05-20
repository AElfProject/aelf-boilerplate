using System.Linq;
using System.Threading.Tasks;
using AElf.Contracts.MultiToken;
using AElf.Contracts.TestKit;
using AElf.Kernel.Token;
using AElf.Types;
using Google.Protobuf.WellKnownTypes;
using Shouldly;
using Xunit;

namespace AElf.Contracts.BingoContract
{
    public class BingoContractTest : BingoContractTestBase
    {
        [Fact]
        public async Task Test()
        {
            // Get a stub for testing.
            var keyPair = SampleECKeyPairs.KeyPairs[0];
            var stub = GetBingoContractStub(keyPair);
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
            await tokenStub.Approve.SendAsync(new ApproveInput
            {
                Spender = DAppContractAddress,
                Symbol = "ELF",
                Amount = 10000
            });

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