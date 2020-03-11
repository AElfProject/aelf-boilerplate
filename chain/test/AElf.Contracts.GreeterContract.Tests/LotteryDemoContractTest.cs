using System.Threading.Tasks;
using AElf.Contracts.LotteryDemoContract;
using AElf.Types;
using Google.Protobuf.WellKnownTypes;
using Xunit;

namespace AElf.Contracts.GreeterContract
{
    public class LotteryDemoContractTest : GreeterContractTestBase
    {
        [Fact]
        public async Task LotteryTest()
        {
            await LotteryDemoContractStub.Initialize.SendAsync(new InitializeInput
            {
                TokenSymbol = "ELF",
                DrawingLag = 1
            });
            await LotteryDemoContractStub.Buy.SendAsync(new SInt64Value {Value = 10});
            var lotteries = await LotteryDemoContractStub.GetBoughtLotteries.CallAsync(new GetBoughtLotteriesInput
            {
                Period = 1
            });
            await LotteryDemoContractStub.PrepareDraw.SendAsync(new Empty());
            await LotteryDemoContractStub.Draw.SendAsync(new DrawInput
            {
                LevelsCount = {1, 2, 3}
            });
            var result = await LotteryDemoContractStub.GetRewardResult.CallAsync(new SInt64Value {Value = 1});
        }
    }
}