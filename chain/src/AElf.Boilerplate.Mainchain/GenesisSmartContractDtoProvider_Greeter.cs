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
        public IEnumerable<GenesisSmartContractDto> GetGenesisSmartContractDtosForGreeter()
        {
            var dto = new List<GenesisSmartContractDto>();
            dto.AddGenesisSmartContract(
                _codes.Single(kv=>kv.Key.Contains("Greeter")).Value,
                GreeterSmartContractAddressNameProvider.Name, new SystemContractDeploymentInput.Types.SystemTransactionMethodCallList());
            return dto;
        }
    }
    
    public class GreeterSmartContractAddressNameProvider : ISmartContractAddressNameProvider, ISingletonDependency
    {
        public static readonly Hash Name = HashHelper.ComputeFrom("AElf.ContractNames.Greeter");
        public static readonly string StringName = Name.ToStorageKey();
        public Hash ContractName => Name;
        public string ContractStringName => StringName;
    }
}