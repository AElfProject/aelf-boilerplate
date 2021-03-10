using System.Linq;
using System.Threading.Tasks;
using AElf.ContractTestBase.ContractTestKit;
using AElf.Types;
using Google.Protobuf;
using Google.Protobuf.WellKnownTypes;
using Shouldly;
using Xunit;

namespace AElf.Contracts.HaloContract
{
    public class HaloContractTests : HaloContractTestBase
    {
        [Fact]
        public async Task Test()
        {
            // Get a stub for testing.
            var keyPair = SampleAccount.Accounts.First().KeyPair;
            var stub = GetHaloContractStub(keyPair);

            // Use CallAsync or SendAsync method of this stub to test.
            // await stub.Hello.SendAsync(new Empty())

            // Or maybe you want to get its return value.
            // var output = (await stub.Hello.SendAsync(new Empty())).Output;

            // Or transaction result.
            // var transactionResult = (await stub.Hello.SendAsync(new Empty())).TransactionResult;
        }

        [Fact]
        public async Task Test_Halo()
        {
            var keyPair = SampleAccount.Accounts.First().KeyPair;
            var stub = GetHaloContractStub(keyPair);
            var haloReturn = await stub.Halo.SendAsync(new Empty());
            haloReturn.TransactionResult.Status.ShouldBe(TransactionResultStatus.Mined);
            haloReturn.Output.Value.ShouldBe("Have a nice day!");
            haloReturn.Output.Height.ShouldBe(haloReturn.TransactionResult.BlockNumber);
        }
        
        [Fact]
        public async Task Test_NativeGreeting()
        {
            var keyPair = SampleAccount.Accounts.First().KeyPair;
            var stub = GetHaloContractStub(keyPair);
            var setResult = await stub.SetNativeGreeting.SendAsync(new StringValue{Value = "Hello!"});
            setResult.TransactionResult.Status.ShouldBe(TransactionResultStatus.Mined);
            var getResult = await stub.GetNativeGreeting.CallAsync(new Empty());
            getResult.Value.ShouldBe("Hello!");
        }
        
        [Fact]
        public async Task Test_NativeGreeting_RepeatedSet_Error()
        {
            var keyPair = SampleAccount.Accounts.First().KeyPair;
            var stub = GetHaloContractStub(keyPair);
            var setResult = await stub.SetNativeGreeting.SendAsync(new StringValue{Value = "Hello!"});
            setResult.TransactionResult.Status.ShouldBe(TransactionResultStatus.Mined);
            var getResult = await stub.GetNativeGreeting.CallAsync(new Empty());
            getResult.Value.ShouldBe("Hello!");
            
            setResult = await stub.SetNativeGreeting.SendWithExceptionAsync(new StringValue{Value = "Hello!"});
            setResult.TransactionResult.Status.ShouldBe(TransactionResultStatus.Failed);
            setResult.TransactionResult.Error.ShouldContain("Already set the native greeting...");
        }
        
        [Fact]
        public async Task Test_Greeting()
        {
            var keyPair = SampleAccount.Accounts.First().KeyPair;
            var stub = GetHaloContractStub(keyPair);
            var setResult1 = await stub.SetGreeting.SendAsync(new GreetingInfo
            {
                Times = "morning",
                Greeting = "Good morning!"
            });
            setResult1.TransactionResult.Status.ShouldBe(TransactionResultStatus.Mined);
            var setResult2 = await stub.SetGreeting.SendAsync(new GreetingInfo
            {
                Times = "night",
                Greeting = "Good night, have a sweet dream!"
            });
            setResult2.TransactionResult.Status.ShouldBe(TransactionResultStatus.Mined);
            var setResult3 = await stub.SetGreeting.SendAsync(new GreetingInfo
            {
                Times = "noon",
                Greeting = "Good afternoon!"
            });
            setResult3.TransactionResult.Status.ShouldBe(TransactionResultStatus.Mined);
            
            var getResult1 = await stub.GetGreetings.CallAsync(new StringValue{Value = "morning"});
            getResult1.Greeting.ShouldBe("Good morning!");
            var getResult2 = await stub.GetGreetings.CallAsync(new StringValue{Value = "night"});
            getResult2.Greeting.ShouldBe("Good night, have a sweet dream!");
            var getResult3 = await stub.GetGreetings.CallAsync(new StringValue{Value = "noon"});
            getResult3.Greeting.ShouldBe("Good afternoon!");

            var getList = await stub.GetGreetedList.CallAsync(new Empty());
            getList.GreatInfo.ShouldContain(getResult1);
            getList.GreatInfo.ShouldContain(getResult2);
            getList.GreatInfo.ShouldContain(getResult3);
            
            var getResultNull = await stub.GetGreetings.CallAsync(new StringValue{Value = "years"});
            getResultNull.ShouldBe(new GreetingInfo());
        }
    }
}