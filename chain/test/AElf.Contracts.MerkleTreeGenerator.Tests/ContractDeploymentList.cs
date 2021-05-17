using System.Collections.Generic;
using AElf.Contracts.MerkleTreeGenerator;
using AElf.ContractTestBase;
using AElf.Kernel.SmartContract.Application;
using AElf.Types;

namespace AElf.Contracts.MerkleTreeGenerator
{
    public class ContractDeploymentList : MainChainContractDeploymentListProvider,
        IContractDeploymentListProvider
    {
        public List<Hash> GetDeployContractNameList()
        {
            var list = base.GetDeployContractNameList();
            list.Add(TokenLockReceiptMakerContractNameProvider.Name);
            list.Add(MerkleTreeGeneratorContractNameProvider.Name);
            return list;
        }
    }
}