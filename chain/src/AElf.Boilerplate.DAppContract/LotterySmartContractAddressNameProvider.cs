using AElf.Kernel.Infrastructure;
using AElf.Kernel.SmartContract;
using AElf.Types;

namespace AElf.Boilerplate.DAppContract
{
    public class LotterySmartContractAddressNameProvider : ISmartContractAddressNameProvider
    {
        public static readonly Hash Name = HashHelper.ComputeFrom("AElf.ContractNames.LotteryContract");

        public static readonly string StringName = Name.ToStorageKey();
        public Hash ContractName => Name;
        public string ContractStringName => StringName;
    }
}