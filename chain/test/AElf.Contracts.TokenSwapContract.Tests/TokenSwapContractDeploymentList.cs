using System.Collections.Generic;
using AElf.ContractTestBase;
using AElf.Kernel.SmartContract.Application;
using AElf.Types;

namespace AElf.Contracts.TokenSwapContract
{
    public class TokenSwapContractDeploymentList : MainChainContractDeploymentListProvider,
        IContractDeploymentListProvider
    {
        public List<Hash> GetDeployContractNameList()
        {
            var list = base.GetDeployContractNameList();
            list.Add(TokenSwapContractNameProvider.Name);
            return list;
        }
    }
}