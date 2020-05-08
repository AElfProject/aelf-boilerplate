using System.Collections.Generic;
using AElf.Boilerplate.TestBase;
using AElf.Kernel.SmartContractInitialization;
using AElf.Kernel.Token;
using AElf.Types;

namespace AElf.Contracts.ACS1DemoContract
{
    public class ASC1DemoContractTestDeploymentListProvider : IContractDeploymentListProvider
    {
        public List<Hash> GetDeployContractNameList()
        {
            return new List<Hash>
            {
                TokenSmartContractAddressNameProvider.Name,
                TestContractAddressNameProvider.Name
            };
        }
    }
}