using System.Collections.Generic;
using AElf.Kernel.SmartContract.Application;
using AElf.Types;

namespace AElf.Contracts.MerkleTreeRecorderContract
{
    public class MerkleTreeRecorderContractInitializationProvider : IContractInitializationProvider
    {
        public List<ContractInitializationMethodCall> GetInitializeMethodList(byte[] contractCode)
        {
            return new List<ContractInitializationMethodCall>();
        }

        public Hash SystemSmartContractName { get; } = MerkleTreeRecorderContractNameProvider.Name;
        public string ContractCodeName { get; } = MerkleTreeRecorderContractNameProvider.StringName;
    }
}