using System.Threading.Tasks;
using Acs5;
using AElf.Contracts.TestKit;
using AElf.Types;
using Google.Protobuf.WellKnownTypes;
using Shouldly;
using Xunit;

namespace AElf.Contracts.ACS5DemoContract
{
    public class ACS5Test : ACS5DemoContractTestBase
    {
        [Fact]
        public async Task Test()
        {
            var keyPair = SampleECKeyPairs.KeyPairs[0];
            var acs5DemoContractStub =
                GetTester<ACS5DemoContractContainer.ACS5DemoContractStub>(DAppContractAddress, keyPair);

            var methodResult = await acs5DemoContractStub.GetMethodCallingThreshold.CallAsync(
                new StringValue
                {
                    Value = nameof(acs5DemoContractStub.Foo)
                });
            methodResult.SymbolToAmount.Count.ShouldBe(0);

            var setResult = await acs5DemoContractStub.SetMethodCallingThreshold.SendAsync(
                new SetMethodCallingThresholdInput
                {
                    Method = nameof(acs5DemoContractStub.Foo),
                    SymbolToAmount =
                    {
                        {"ELF", 1_0000_0000}
                    },
                    ThresholdCheckType = ThresholdCheckType.Balance
                });
            setResult.TransactionResult.Status.ShouldBe(TransactionResultStatus.Mined);

            methodResult = await acs5DemoContractStub.GetMethodCallingThreshold.CallAsync(
                new StringValue
                {
                    Value = nameof(acs5DemoContractStub.Foo)
                });
            methodResult.SymbolToAmount.Count.ShouldBe(1);
            methodResult.ThresholdCheckType.ShouldBe(ThresholdCheckType.Balance);

            var executionResult = await acs5DemoContractStub.Foo.SendAsync(new Empty());
            executionResult.TransactionResult.Status.ShouldBe(TransactionResultStatus.Mined);
        }
    }
}