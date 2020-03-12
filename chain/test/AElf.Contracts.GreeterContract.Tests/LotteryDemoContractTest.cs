/*
using System.Threading.Tasks;
using AElf.Contracts.LotteryDemoContract;
using AElf.Types;
using Google.Protobuf.WellKnownTypes;
using Shouldly;
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
    for (var i = 0; i < 10; i++)
    {
        await LotteryDemoContractStub.Buy.SendAsync(new SInt64Value {Value = 10});
        await LotteryDemoContractStub.PrepareDraw.SendAsync(new Empty());
        await LotteryDemoContractStub.Buy.SendAsync(new SInt64Value {Value = 10});
        var lotteries = await LotteryDemoContractStub.GetBoughtLotteries.CallAsync(new GetBoughtLotteriesInput
        {
            Period = i + 1
        });
        await LotteryDemoContractStub.Draw.SendAsync(new DrawInput
        {
            LevelsCount = {1, 2, 3}
        });
        if (i != 0)
        {
            var result = await LotteryDemoContractStub.GetRewardResult.CallAsync(new SInt64Value {Value = i + 1});
            result.RewardLotteries.Count.ShouldBe(6); 
        }
    }
}

[Fact]
public async Task LotteryTest2()
{
    await LotteryDemoContractStub.Initialize.SendAsync(new InitializeInput
    {
        TokenSymbol = "ELF",
        DrawingLag = 1
    });
    for (var i = 0; i < 10; i++)
    {
        await LotteryDemoContractStub.PrepareDraw.SendAsync(new Empty());
        await LotteryDemoContractStub.Buy.SendAsync(new SInt64Value {Value = 10});
        var lotteries = await LotteryDemoContractStub.GetBoughtLotteries.CallAsync(new GetBoughtLotteriesInput
        {
            Period = i + 1
        });
        await LotteryDemoContractStub.Draw.SendAsync(new DrawInput
        {
            LevelsCount = {1, 2, 3}
        });
        if (i != 0)
        {
            var result = await LotteryDemoContractStub.GetRewardResult.CallAsync(new SInt64Value {Value = i + 1});
            result.RewardLotteries.Count.ShouldBe(6); 
        }
    }
}
    }
}
*/
