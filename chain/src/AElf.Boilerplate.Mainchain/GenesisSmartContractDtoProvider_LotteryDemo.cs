using System.Collections.Generic;
using System.Linq;
using Acs0;
using AElf.Contracts.LotteryDemoContract;
using AElf.OS.Node.Application;
using AElf.Types;

namespace AElf.Blockchains.MainChain
{
    public partial class GenesisSmartContractDtoProvider
    {
        public IEnumerable<GenesisSmartContractDto> GetGenesisSmartContractDtosForLotteryDemo()
        {
            var l = new List<GenesisSmartContractDto>();

            l.AddGenesisSmartContract(
                _codes.Single(kv => kv.Key.Contains("LotteryDemo")).Value,
                Hash.FromString("AElf.ContractNames.LotteryDemo"), GenerateLotteryDemoInitializationCallList());

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
}