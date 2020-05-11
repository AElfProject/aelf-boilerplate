using System.Collections.Generic;
using AElf.ContractTestBase;
using AElf.Kernel.SmartContractInitialization;
using AElf.Types;

namespace AElf.Boilerplate.TestBase
{
    public class SideChainDAppContractTestDeploymentListProvider : SideChainContractDeploymentListProvider, IContractDeploymentListProvider
    {
        public List<Hash> GetDeployContractNameList()
        {
            var list = base.GetDeployContractNameList();
            list.Add(DAppContractAddressNameProvider.Name);
            return list;
        }
    }
    
    public class MainChainDAppContractTestDeploymentListProvider : MainChainContractDeploymentListProvider, IContractDeploymentListProvider
    {
        public List<Hash> GetDeployContractNameList()
        {
            var list = base.GetDeployContractNameList();
            list.Add(DAppContractAddressNameProvider.Name);
            return list;
        }
    }
}