using AElf.Kernel.Infrastructure;
using AElf.Types;

namespace AElf.Contracts.TokenSwapContract
{
    public class TokenSwapContractNameProvider
    {
        public static readonly Hash Name = HashHelper.ComputeFrom("AElf.ContractNames.TokenSwapContract");

        public static readonly string StringName = Name.ToStorageKey();
    }
}