using System.Collections.Generic;
using AElf.ContractTestBase;
using AElf.Kernel.SmartContract.Application;
using AElf.Types;

namespace AElf.Contracts.TokenLockReceiptMakerContract.Tests
{
    public class ContractDeploymentList : MainChainContractDeploymentListProvider,
        IContractDeploymentListProvider
    {
        public List<Hash> GetDeployContractNameList()
        {
            var list = base.GetDeployContractNameList();
            list.Add(TokenLockReceiptMakerContractNameProvider.Name);
            return list;
        }
    }
}