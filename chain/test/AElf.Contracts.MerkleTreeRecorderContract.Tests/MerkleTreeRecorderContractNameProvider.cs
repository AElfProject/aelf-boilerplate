using AElf.Kernel.Infrastructure;
using AElf.Types;

namespace AElf.Contracts.MerkleTreeRecorderContract
{
    public class MerkleTreeRecorderContractNameProvider
    {
        public static readonly Hash Name = HashHelper.ComputeFrom("AElf.ContractNames.MerkleTreeRecorderContract");

        public static readonly string StringName = Name.ToStorageKey();
    }
}