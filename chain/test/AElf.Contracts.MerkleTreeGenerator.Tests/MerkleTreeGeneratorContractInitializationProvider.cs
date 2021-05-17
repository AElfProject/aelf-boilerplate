using System.Collections.Generic;
using AElf.Boilerplate.TestBase;
using AElf.Kernel.SmartContract.Application;
using AElf.Types;

namespace AElf.Contracts.MerkleTreeGenerator
{
    public class MerkleTreeGeneratorContractInitializationProvider : IContractInitializationProvider
    {
        public List<ContractInitializationMethodCall> GetInitializeMethodList(byte[] contractCode)
        {
            return new List<ContractInitializationMethodCall>();
        }

        public Hash SystemSmartContractName { get; } = MerkleTreeGeneratorContractNameProvider.Name;
        public string ContractCodeName { get; } = MerkleTreeGeneratorContractNameProvider.StringName;
    }
}