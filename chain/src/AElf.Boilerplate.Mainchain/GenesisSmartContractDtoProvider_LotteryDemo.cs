using System.Collections.Generic;
using System.Linq;
using Acs0;
using AElf.Contracts.LotteryDemoContract;
using AElf.Kernel.Infrastructure;
using AElf.Kernel.SmartContract;
using AElf.OS.Node.Application;
using AElf.Types;
using Volo.Abp.DependencyInjection;

namespace AElf.Blockchains.MainChain
{
    public partial class GenesisSmartContractDtoProvider
    {
        public IEnumerable<GenesisSmartContractDto> GetGenesisSmartContractDtosForLotteryDemo()
        {
            var l = new List<GenesisSmartContractDto>();

            l.AddGenesisSmartContract(
                _codes.Single(kv => kv.Key.Contains("LotteryDemo")).Value,
                LotteryDemoSmartContractAddressNameProvider.Name, GenerateLotteryDemoInitializationCallList());

            return l;
        }

        private SystemContractDeploymentInput.Types.SystemTransactionMethodCallList
            GenerateLotteryDemoInitializationCallList()
        {
            var lotteryDemoContractMethodCallList =
                new SystemContractDeploymentInput.Types.SystemTransactionMethodCallList();
            lotteryDemoContractMethodCallList.Add(
                nameof(LotteryDemoContractContainer.LotteryDemoContractStub.InitializeLotteryDemoContract),
                new InitializeLotteryDemoContractInput
                {
                    TokenSymbol = _economicOptions.TokenName
                });
            return lotteryDemoContractMethodCallList;
        }
    }
    
    public class LotteryDemoSmartContractAddressNameProvider : ISmartContractAddressNameProvider, ISingletonDependency
    {
        public static readonly Hash Name = HashHelper.ComputeFrom("AElf.ContractNames.LotteryDemo");
        public static readonly string StringName = Name.ToStorageKey();
        public Hash ContractName => Name;
        public string ContractStringName => StringName;
    }
}