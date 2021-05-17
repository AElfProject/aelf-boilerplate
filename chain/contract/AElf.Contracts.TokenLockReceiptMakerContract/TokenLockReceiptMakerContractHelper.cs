using AElf.CSharp.Core;
using AElf.CSharp.Core.Extension;
using AElf.Sdk.CSharp;
using AElf.Types;

namespace AElf.Contracts.TokenLockReceiptMakerContract
{
    public partial class TokenLockReceiptMakerContract
    {
        private void CreateReceipt(Address owner, string targetAddress, long amount)
        {
            State.TotalLockAmount.Value = State.TotalLockAmount.Value.Add(amount);
            State.LockReceipts[State.ReceiptCount.Value] = new LockReceipt
            {
                Owner = owner,
                Amount = amount,
                TargetAddress = targetAddress,
                StartTs = Context.CurrentBlockTime,
                EndTs = Context.CurrentBlockTime.AddSeconds(State.LockTime.Value),
                Unlocked = false
            };
            Context.Fire(new ReceiptCreatedEvent
            {
                ReceiptId = State.ReceiptCount.Value
            });

            var lockedReceiptIdList = State.LockedReceiptIdList[owner] ?? new LockReceiptIdList();
            lockedReceiptIdList.ReceiptIdList.Add(State.ReceiptCount.Value);
            State.LockedReceiptIdList[Context.Sender] = lockedReceiptIdList;
            State.LockedAmount[Context.Sender] = State.LockedAmount[Context.Sender].Add(amount);
            State.ReceiptCount.Value = State.ReceiptCount.Value.Add(1);
        }

        private void UnlockReceipt(long receiptId)
        {
            var lockReceipt = State.LockReceipts[receiptId];
            Assert(lockReceipt.Owner == Context.Sender, "]Not receipt owner.");
            Assert(lockReceipt.EndTs < Context.CurrentBlockTime, "Unable to finish receipt before endtime.");
            Assert(!lockReceipt.Unlocked, "Already unlocked.");
            State.TotalLockAmount.Value = State.TotalLockAmount.Value.Sub(lockReceipt.Amount);
            State.LockedAmount[Context.Sender] = State.LockedAmount[Context.Sender].Sub(lockReceipt.Amount);
            lockReceipt.Unlocked = true;
            State.LockReceipts[receiptId] = lockReceipt;
        }

        private Hash GetReceiptHash(long receiptId)
        {
            var lockReceipt = State.LockReceipts[receiptId];

            var amountHash = HashHelper.ComputeFrom(lockReceipt.Amount);
            var targetAddressHash = HashHelper.ComputeFrom(ByteArrayHelper.HexStringToByteArray(lockReceipt.TargetAddress));
            var receiptIdHash = HashHelper.ComputeFrom(receiptId);

            return HashHelper.ConcatAndCompute(amountHash, targetAddressHash, receiptIdHash);
        }
    }
}