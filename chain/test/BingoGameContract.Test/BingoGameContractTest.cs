using System;
using System.Threading.Tasks;
using Google.Protobuf;
using Shouldly;
using Xunit;

namespace BingoGameContract.Test 
{
    public class BingoGameContractTest : BingoGameContractTestBase
    {
        [Fact]
        public async Task HelloCall_ReturnsHelloWorldMessage()
        {
            var result = await BingoGameContractStub.SendBingoCard.CallAsync(CreateBingoCard());
            result.Value.ShouldBe(false);
        }

        private static readonly Random _myRnd = new Random();

        private static BingoCard CreateBingoCard() => new BingoCard() {
            Value=ByteString.CopyFrom(
                (byte)_myRnd.Next(1,16),
                (byte)_myRnd.Next(16, 31),
                (byte)_myRnd.Next(31, 46),
                (byte)_myRnd.Next(46, 61),
                (byte)_myRnd.Next(61, 76))
        };
         
         

    }
}