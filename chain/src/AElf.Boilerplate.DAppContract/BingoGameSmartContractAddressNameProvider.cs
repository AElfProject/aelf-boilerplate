using AElf.Kernel.Infrastructure;
using AElf.Kernel.SmartContract;
using AElf.Types;

namespace AElf.Boilerplate.DAppContract
{
    public class BingoGameSmartContractAddressNameProvider : ISmartContractAddressNameProvider
    {
        public static readonly Hash Name = HashHelper.ComputeFrom("AElf.ContractNames.BingoGameContract");

        public static readonly string StringName = Name.ToStorageKey();
        public Hash ContractName => Name;
        public string ContractStringName => StringName;
    }
}