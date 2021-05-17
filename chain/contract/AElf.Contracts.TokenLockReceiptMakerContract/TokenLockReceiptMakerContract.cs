using AElf.Contracts.MultiToken;
using AElf.Contracts.ReceiptMakerContract;
using AElf.Sdk.CSharp;
using AElf.Types;
using Google.Protobuf.WellKnownTypes;

namespace AElf.Contracts.TokenLockReceiptMakerContract
{
    public partial class TokenLockReceiptMakerContract : TokenLockReceiptMakerContractContainer.TokenLockReceiptMakerContractBase
    {
        public override Empty Initialize(InitializeInput input)
        {
            Assert(string.IsNullOrEmpty(State.TokenSymbol.Value), "Already initialized.");
            Assert(input.LockTime > 0);
            State.LockTime.Value = input.LockTime;
            State.TokenSymbol.Value = input.Symbol;
            State.TokenContractReferenceState.Value =
                Context.GetContractAddressByName(SmartContractConstants.TokenContractSystemName);
            return new Empty();
        }

        public override Empty Lock(LockInput input)
        {
            State.TokenContractReferenceState.TransferFrom.Send(new TransferFromInput
            {
                Amount = input.Amount,
                From = Context.Sender,
                Symbol = State.TokenSymbol.Value,
                To = Context.Self,
                Memo = "LOCK"
            });

            CreateReceipt(Context.Sender, input.TargetAddress, input.Amount);
            return new Empty();
        }

        public override Empty UnLock(UnLockInput input)
        {
            UnlockReceipt(input.ReceiptId);
            var lockReceipt = State.LockReceipts[input.ReceiptId];
            State.TokenContractReferenceState.Transfer.Send(new TransferInput
            {
                Amount = lockReceipt.Amount,
                To = lockReceipt.Owner,
                Symbol = State.TokenSymbol.Value,
                Memo = "UNLOCK"
            });
            return new Empty();
        }

        public override GetReceiptInfoOutput GetReceiptInfo(Int64Value input)
        {
            var lockReceipt = State.LockReceipts[input.Value];
            return new GetReceiptInfoOutput
            {
                Amount = lockReceipt.Amount,
                TargetAddress = lockReceipt.TargetAddress,
                UniqueId = HashHelper.ComputeFrom(input.Value),
                IsUnlocked = lockReceipt.Unlocked
            };
        }

        public override GetLockTokenAmountOutput GetLockTokenAmount(Address input)
        {
            return new GetLockTokenAmountOutput {Amount = State.LockedAmount[input]};
        }

        public override GetMyReceiptIdListOutput GetMyReceiptIdList(Address input)
        {
            return new GetMyReceiptIdListOutput
            {
                ReceiptIdList = {State.LockedReceiptIdList[input].ReceiptIdList}
            };
        }

        public override Int64Value GetReceiptCount(Empty input)
        {
            return new Int64Value {Value = State.ReceiptCount.Value};
        }

        public override Hash GetReceiptHash(Int64Value input)
        {
            return GetReceiptHash(input.Value);
        }

        public override GetReceiptHashListOutput GetReceiptHashList(GetReceiptHashListInput input)
        {
            // todo : cover the case which require too many receipt
            var res = new GetReceiptHashListOutput();
            for (long i = input.FirstLeafIndex; i <= input.LastLeafIndex; i++)
            {
                res.ReceiptHashList.Add(GetReceiptHash(i));
            }

            return res;
        }

        public override Int64Value GetTotalLockTokenAmount(Empty input)
        {
            return new Int64Value
            {
                Value = State.TotalLockAmount.Value
            };
        }
    }
}