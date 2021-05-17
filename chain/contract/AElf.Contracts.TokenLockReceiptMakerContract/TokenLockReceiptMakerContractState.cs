using AElf.Contracts.MultiToken;
using AElf.Sdk.CSharp.State;
using AElf.Types;

namespace AElf.Contracts.TokenLockReceiptMakerContract
{
    public class TokenLockReceiptMakerContractState : ContractState
    {
        public StringState TokenSymbol { get; set; }
        public Int64State LockTime { get; set; }
    
        public Int64State TotalLockAmount { get; set; }
        public Int64State ReceiptCount { get; set; }

        public MappedState<long, LockReceipt> LockReceipts { get; set; }
        public MappedState<Address, LockReceiptIdList> LockedReceiptIdList { get; set; }
        public MappedState<Address, long> LockedAmount { get; set; }
        internal TokenContractContainer.TokenContractReferenceState TokenContractReferenceState { get; set; }
    }
}