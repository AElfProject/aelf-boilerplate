using System.Collections.Generic;
using AElf.ContractTestBase;
using AElf.Kernel.SmartContract.Application;
using AElf.Types;

namespace AElf.Contracts.ACS9DemoContract
{
    public class ACS9DemoContractDeploymentList : MainChainContractDeploymentListProvider,
        IContractDeploymentListProvider
    {
        public List<Hash> GetDeployContractNameList()
        {
            var list = base.GetDeployContractNameList();
            list.Add(ACS10DemoSmartContractNameProvider.Name);
            list.Add(ACS9DemoSmartContractNameProvider.Name);
            return list;
        }
    }
}