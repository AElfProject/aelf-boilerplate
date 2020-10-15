using System.Linq;
using System.Threading.Tasks;
using AElf.Standards.ACS1;
using AElf.ContractTestBase.ContractTestKit;
using AElf.Types;
using Google.Protobuf.WellKnownTypes;
using Shouldly;
using Xunit;

namespace AElf.Contracts.ACS1DemoContract
{
    public class ACS1Tests : ACS1DemoContractTestBase
    {
        [Fact]
        public async Task Test()
        {
            var keyPair = SampleAccount.Accounts.First().KeyPair;
            var address = Address.FromPublicKey(keyPair.PublicKey);
            var acs1DemoContractStub =
                GetTester<ACS1DemoContractContainer.ACS1DemoContractStub>(DAppContractAddress, keyPair);
            
            // Set Method Fee Controller
            await acs1DemoContractStub.ChangeMethodFeeController.SendAsync(new AuthorityInfo
            {
                ContractAddress = DAppContractAddress,
                OwnerAddress = address
            });
            
            // Check Method Fee Controller
            var methodFeeController = await acs1DemoContractStub.GetMethodFeeController.CallAsync(new Empty());
            methodFeeController.ContractAddress.ShouldBe(DAppContractAddress);
            methodFeeController.OwnerAddress.ShouldBe(address);
            
            // Set Method Fee
            await acs1DemoContractStub.SetMethodFee.SendAsync(new MethodFees
            {
                MethodName = nameof(acs1DemoContractStub.Foo),
                Fees =
                {
                    new MethodFee
                    {
                        BasicFee = 1_00000000,
                        Symbol = "ELF"
                    }
                }
            });
            
            // Check Method Fee.
            {
                var methodFee = await acs1DemoContractStub.GetMethodFee.CallAsync(new StringValue {Value = nameof(acs1DemoContractStub.Foo)});
                methodFee.MethodName.ShouldBe(nameof(acs1DemoContractStub.Foo));
                methodFee.Fees.First().Symbol.ShouldBe("ELF");
                methodFee.Fees.First().BasicFee.ShouldBe(1_00000000);
            }
            
            // Free Method Fee
            await acs1DemoContractStub.SetMethodFee.SendAsync(new MethodFees
            {
                MethodName = nameof(acs1DemoContractStub.Foo),
                IsSizeFeeFree = true
            });
            
            // Check Method Fee.
            {
                var methodFee = await acs1DemoContractStub.GetMethodFee.CallAsync(new StringValue {Value = nameof(acs1DemoContractStub.Foo)});
                methodFee.MethodName.ShouldBe(nameof(acs1DemoContractStub.Foo));
                methodFee.IsSizeFeeFree.ShouldBeTrue();
            }
        }
    }
}