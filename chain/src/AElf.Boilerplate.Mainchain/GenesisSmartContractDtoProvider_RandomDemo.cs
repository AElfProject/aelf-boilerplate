using System.Collections.Generic;
using System.Linq;
using Acs0;
using AElf.Kernel.Infrastructure;
using AElf.Kernel.SmartContract;
using AElf.OS.Node.Application;
using AElf.Types;
using Volo.Abp.DependencyInjection;

namespace AElf.Blockchains.MainChain
{
    public partial class GenesisSmartContractDtoProvider
    {
        public IEnumerable<GenesisSmartContractDto> GetGenesisSmartContractDtosForRandomDemo()
        {
            var l = new List<GenesisSmartContractDto>();

            l.AddGenesisSmartContract(
                _codes.Single(kv=>kv.Key.Contains("RandomDemo")).Value,
                RandomDemoSmartContractAddressNameProvider.Name, new SystemContractDeploymentInput.Types.SystemTransactionMethodCallList());

            return l;
        }
    }
    
    public class RandomDemoSmartContractAddressNameProvider : ISmartContractAddressNameProvider, ISingletonDependency
    {
        public static readonly Hash Name = HashHelper.ComputeFrom("AElf.ContractNames.RandomDemo");
        public static readonly string StringName = Name.ToStorageKey();
        public Hash ContractName => Name;
        public string ContractStringName => StringName;
    }
}