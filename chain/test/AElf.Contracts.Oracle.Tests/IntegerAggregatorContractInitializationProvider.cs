using System.Collections.Generic;
using AElf.Boilerplate.TestBase;
using AElf.Kernel.SmartContract.Application;
using AElf.Types;

namespace AElf.Contracts.Oracle
{
    public class IntegerAggregatorContractInitializationProvider : IContractInitializationProvider
    {
        public List<ContractInitializationMethodCall> GetInitializeMethodList(byte[] contractCode)
        {
            return new List<ContractInitializationMethodCall>();
        }

        public Hash SystemSmartContractName { get; } = IntegerAggregatorSmartContractAddressNameProvider.Name;
        public string ContractCodeName { get; } = "AElf.Contracts.IntegerAggregator";
    }
}