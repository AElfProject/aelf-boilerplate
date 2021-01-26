using System.Collections.Generic;
using AElf.ContractTestBase;
using AElf.Kernel.SmartContract.Application;
using AElf.Types;

namespace AElf.Contracts.MerkleTreeRecorderContract
{
    public class MerkleTreeRecorderContractDeploymentList : SideChainContractDeploymentListProvider,
        IContractDeploymentListProvider
    {
        public new List<Hash> GetDeployContractNameList()
        {
            var list = base.GetDeployContractNameList();
            list.Add(MerkleTreeRecorderContractNameProvider.Name);
            return list;
        }
    }
}