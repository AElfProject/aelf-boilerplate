using System.Threading.Tasks;
using Acs10;
using AElf.Contracts.MultiToken;
using AElf.Contracts.TestKit;
using AElf.Contracts.TokenHolder;
using AElf.Types;
using Google.Protobuf.WellKnownTypes;
using Shouldly;
using Xunit;

namespace AElf.Contracts.ACS10DemoContract
{
    public class ACS10Test : ACS10DemoContractTestBase
    {
        [Fact]
        public async Task Test()
        {
            const long amount = 10_00000000;
            
            var keyPair = SampleECKeyPairs.KeyPairs[0];
            var address = Address.FromPublicKey(keyPair.PublicKey);
            var acs10DemoContractStub =
                GetTester<ACS10DemoContractContainer.ACS10DemoContractStub>(ACS10DemoContractAddress, keyPair);
            var tokenContractStub =
                GetTester<TokenContractContainer.TokenContractStub>(TokenContractAddress, keyPair);
            var tokenHolderContractStub =
                GetTester<TokenHolderContractContainer.TokenHolderContractStub>(TokenHolderContractAddress,
                    keyPair);

            await tokenContractStub.Approve.SendAsync(new ApproveInput
            {
                Spender = TokenHolderContractAddress,
                Symbol = "ELF",
                Amount = long.MaxValue
            });

            await tokenContractStub.Approve.SendAsync(new ApproveInput
            {
                Spender = ACS10DemoContractAddress,
                Symbol = "ELF",
                Amount = long.MaxValue
            });

            await tokenHolderContractStub.RegisterForProfits.SendAsync(new RegisterForProfitsInput
            {
                SchemeManager = ACS10DemoContractAddress,
                Amount = amount
            });

            await acs10DemoContractStub.Donate.SendAsync(new DonateInput
            {
                Symbol = "ELF",
                Amount = amount
            });

            var undistributedDividends = await acs10DemoContractStub.GetUndistributedDividends.CallAsync(new Empty());

            undistributedDividends.Value["ELF"].ShouldBe(amount);

            var dividends = await acs10DemoContractStub.GetDividends.CallAsync(new Int64Value {Value = 5});
            dividends.Value["ELF"].ShouldBe(amount);
        }
    }
}