using System.Threading.Tasks;
using AElf.Types;
using Google.Protobuf;
using Google.Protobuf.WellKnownTypes;
using Shouldly;
using Xunit;

namespace AElf.Contracts.GreeterContract
{
    public class GreeterContractTests : GreeterContractTestBase
    {
        [Fact]
        public async Task GreetTest()
        {
            var txResult = await GreeterContractStub.Greet.SendAsync(new Empty());
            txResult.TransactionResult.Status.ShouldBe(TransactionResultStatus.Mined);
            var text = new StringValue();
            text.MergeFrom(txResult.TransactionResult.ReturnValue);
            text.Value.ShouldBe("Hello World!");
        }

        [Theory]
        [InlineData("Ean")]
        [InlineData("Sam")]
        public async Task GreetToTests(string name)
        {
            var txResult = await GreeterContractStub.GreetTo.SendAsync(new StringValue {Value = name});
            txResult.TransactionResult.Status.ShouldBe(TransactionResultStatus.Mined);
            var output = new GreetToOutput();
            output.MergeFrom(txResult.TransactionResult.ReturnValue);
            output.Name.ShouldBe(name);
            output.GreetTime.ShouldNotBeNull();
        }

        [Theory]
        [InlineData("")]
        [InlineData(" ")]
        public async Task GreetToWithEmptyStringOrWhiteSpace(string name)
        {
            var txResult = await GreeterContractStub.GreetTo.SendWithExceptionAsync(new StringValue {Value = name});
            txResult.TransactionResult.Status.ShouldBe(TransactionResultStatus.Failed);
            txResult.TransactionResult.Error.ShouldContain("Invalid name.");
        }

        [Fact]
        public async Task GetGreetedListTest()
        {
            await GreetToTests("Ean");
            await GreetToTests("Sam");

            var greetedList = await GreeterContractStub.GetGreetedList.CallAsync(new Empty());
            greetedList.Value.Count.ShouldBe(2);
            greetedList.Value.ShouldContain("Ean");
            greetedList.Value.ShouldContain("Sam");
        }

        [Fact]
        public async Task GreetToWithDuplicatedNameTest()
        {
            const string name = "Ean";
            await GreetToTests(name);
            // Dup the name
            await GreetToTests(name);

            var greetedList = await GreeterContractStub.GetGreetedList.CallAsync(new Empty());
            greetedList.Value.Count.ShouldBe(1);
            greetedList.Value.ShouldContain("Ean");
        }
    }
}