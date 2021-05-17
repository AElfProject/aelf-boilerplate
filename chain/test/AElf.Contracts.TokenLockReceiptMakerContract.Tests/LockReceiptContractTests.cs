using System;
using System.Threading.Tasks;
using AElf.Contracts.ReceiptMakerContract;
using AElf.ContractTestBase.ContractTestKit;
using Google.Protobuf.WellKnownTypes;
using Shouldly;
using Xunit;

namespace AElf.Contracts.TokenLockReceiptMakerContract.Tests
{
    public class LockReceiptContractTests : TokenLockReceiptMakerContractTestBase
    {
        private IBlockTimeProvider _blockTimeProvider;

        public LockReceiptContractTests()
        {
            _blockTimeProvider = GetService<IBlockTimeProvider>();
        }

        [Fact]
        public async Task CreateReceiptTest()
        {
            await Initialize("ELF");
            await Approve("ELF", 1000);
            await TokenLockReceiptMakerContractStub.Lock.SendAsync(new LockInput
            {
                Amount = 1000,
                TargetAddress = "12ab4"
            });

            var lockTokenAmount =
                await TokenLockReceiptMakerContractStub.GetLockTokenAmount.CallAsync(DefaultAccount.Address);
            lockTokenAmount.Amount.ShouldBe(1000);

            var totalLockTokenAmount =
                await TokenLockReceiptMakerContractStub.GetTotalLockTokenAmount.CallAsync(new Empty());
            totalLockTokenAmount.Value.ShouldBe(1000);

            var receiptHash =
                await TokenLockReceiptMakerContractStub.GetReceiptHash.CallAsync(new Int64Value {Value = 0});
            receiptHash.ShouldNotBeNull();

            var receiptHashList = await TokenLockReceiptMakerContractStub.GetReceiptHashList.CallAsync(
                new GetReceiptHashListInput
                {
                    FirstLeafIndex = 0,
                    LastLeafIndex = 0
                });
            receiptHashList.ReceiptHashList.Count.ShouldBe(1);
            receiptHashList.ReceiptHashList[0].ShouldBe(receiptHash);
        }

        [Fact]
        public async Task UnlockReceiptTest()
        {
            await Initialize("ELF", 10);
            await Approve("ELF", 1000);
            await TokenLockReceiptMakerContractStub.Lock.SendAsync(new LockInput
            {
                Amount = 1000,
                TargetAddress = "12ab4"
            });

            _blockTimeProvider.SetBlockTime(Timestamp.FromDateTime(DateTime.UtcNow.AddSeconds(10)));
            await TokenLockReceiptMakerContractStub.UnLock.SendAsync(new UnLockInput
            {
                ReceiptId = 0
            });
            
            var lockTokenAmount =
                await TokenLockReceiptMakerContractStub.GetLockTokenAmount.CallAsync(DefaultAccount.Address);
            lockTokenAmount.Amount.ShouldBe(0);
            
            var totalLockTokenAmount =
                await TokenLockReceiptMakerContractStub.GetTotalLockTokenAmount.CallAsync(new Empty());
            totalLockTokenAmount.Value.ShouldBe(0);
        }
    }
}