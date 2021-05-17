using System.Collections.Generic;
using AElf.Boilerplate.TestBase;
using AElf.Kernel.SmartContract.Application;
using AElf.Types;

namespace AElf.Contracts.MerkleTreeGenerator
{
    public class TokenLockReceiptMakerContractInitializationProvider : IContractInitializationProvider
    {
        public List<ContractInitializationMethodCall> GetInitializeMethodList(byte[] contractCode)
        {
            return new List<ContractInitializationMethodCall>();
        }

        public Hash SystemSmartContractName { get; } = TokenLockReceiptMakerContractNameProvider.Name;
        public string ContractCodeName { get; } = TokenLockReceiptMakerContractNameProvider.StringName;
    }
}