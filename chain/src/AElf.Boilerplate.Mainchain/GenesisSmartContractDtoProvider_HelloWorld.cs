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
    /* Part of the GenesisSmartContractDtoProvider */
    public partial class GenesisSmartContractDtoProvider
    {
        public IEnumerable<GenesisSmartContractDto> GetGenesisSmartContractDtosForHelloWorld()
        {
            var l = new List<GenesisSmartContractDto>();

            l.AddGenesisSmartContract(
                // find the contracts code by name
                _codes.Single(kv => kv.Key.Contains("HelloWorld")).Value,
                // the name of the contract is built from the full name
                HelloWorldSmartContractAddressNameProvider.Name, 
                
                new SystemContractDeploymentInput.Types.SystemTransactionMethodCallList());

            return l;
        }
    }
    
    public class HelloWorldSmartContractAddressNameProvider : ISmartContractAddressNameProvider, ISingletonDependency
    {
        public static readonly Hash Name = HashHelper.ComputeFrom("AElf.ContractNames.HelloWorldContract");
        public static readonly string StringName = Name.ToStorageKey();
        public Hash ContractName => Name;
        public string ContractStringName => StringName;
    }
}