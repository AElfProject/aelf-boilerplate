using AElf.Kernel.Infrastructure;
using AElf.Types;

namespace AElf.Contracts.MerkleTreeGenerator
{
    public class MerkleTreeGeneratorContractNameProvider
    {
        public static readonly Hash Name = HashHelper.ComputeFrom("AElf.ContractNames.MerkleTreeGeneratorContract");

        public static readonly string StringName = Name.ToStorageKey();
    }
}