using AElf.Kernel.Infrastructure;
using AElf.Types;

namespace AElf.Contracts.TokenLockReceiptMakerContract.Tests
{
    public class TokenLockReceiptMakerContractNameProvider
    {
        public static readonly Hash Name = HashHelper.ComputeFrom("AElf.ContractNames.TokenLockReceiptMakerContract");

        public static readonly string StringName = Name.ToStorageKey();
    }
}