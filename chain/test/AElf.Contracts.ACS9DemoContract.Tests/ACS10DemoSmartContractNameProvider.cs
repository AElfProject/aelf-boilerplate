using AElf.Kernel.Infrastructure;
using AElf.Types;

namespace AElf.Contracts.ACS9DemoContract
{
    public class ACS10DemoSmartContractNameProvider
    {
        public static readonly Hash Name = HashHelper.ComputeFrom("AElf.ContractNames.ACS10DemoContract");

        public static readonly string StringName = Name.ToStorageKey();
        public Hash ContractName => Name;
        public string ContractStringName => StringName;
    }
}