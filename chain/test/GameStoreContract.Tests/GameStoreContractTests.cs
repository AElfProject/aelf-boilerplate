using System.Linq;
using System.Threading.Tasks;
using AElf.ContractTestBase.ContractTestKit;
using AElf.Kernel;
using AElf.Types;
using Google.Protobuf;
using Google.Protobuf.WellKnownTypes;
using Shouldly;
using Xunit;

namespace GameStoreContract
{
    public class GameStoreContractTests : GameStoreContractTestBase
    {
        [Fact]
        public async Task Test()
        {
            // Get a stub for testing.
            var keyPair = SampleAccount.Accounts.First().KeyPair;
            var stub = GetGameStoreContractStub(keyPair);

            await stub.Initialize.SendAsync(new Empty());

            {
                var gameList = await stub.GetTotalGameList.CallAsync(new Empty());
                gameList.Value.Count.ShouldBe(0);
            }
            
            await stub.AddGame.SendAsync(new GameInfo
            {
                Name = "idk",
                Description = "For fun",
                Price = 1_00000000,
                Time = TimestampHelper.GetUtcNow()
            });

            {
                var gameList = await stub.GetTotalGameList.CallAsync(new Empty());
                gameList.Value.Count.ShouldBe(1);
                gameList.Value.First().Name.ShouldBe("idk");
                gameList.Value.First().Description.ShouldBe("For fun");
            }
        }
    }
}