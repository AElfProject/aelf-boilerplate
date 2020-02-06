using System.Collections.Generic;
using System.Linq;
using AElf.Contracts.Deployer;
using AElf.Kernel.Account.Application;
using AElf.Kernel.Consensus.AEDPoS;
using AElf.Kernel.SmartContract.Application;
using AElf.OS;
using AElf.OS.Node.Application;
using AElf.Types;
using Microsoft.Extensions.Options;

namespace AElf.Blockchains.MainChain
{
    public partial class GenesisSmartContractDtoProvider : IGenesisSmartContractDtoProvider
    {
        private readonly IAccountService _accountService;
        private readonly ISmartContractAddressService _smartContractAddressService;
        private readonly IReadOnlyDictionary<string, byte[]> _codes;

        private readonly ConsensusOptions _consensusOptions;
        private readonly EconomicOptions _economicOptions;

        public GenesisSmartContractDtoProvider(IOptionsSnapshot<ConsensusOptions> consensusOptions,
            IOptionsSnapshot<EconomicOptions> economicOptions, ContractsDeployer contractsDeployer,
            IAccountService accountService, ISmartContractAddressService smartContractAddressService)
        {
            _accountService = accountService;
            _smartContractAddressService = smartContractAddressService;
            _consensusOptions = consensusOptions.Value;
            _economicOptions = economicOptions.Value;

            _codes = contractsDeployer.GetContractCodes<GenesisSmartContractDtoProvider>();
        }

        public IEnumerable<GenesisSmartContractDto> GetGenesisSmartContractDtos()
        {
            // The order matters !!!
            return new[]
            {
                GetGenesisSmartContractDtosForVote(),
                GetGenesisSmartContractDtosForProfit(),
                GetGenesisSmartContractDtosForElection(),
                GetGenesisSmartContractDtosForToken(),
                GetGenesisSmartContractDtosForConsensus(),
                GetGenesisSmartContractDtosForConfiguration(),
                GetGenesisSmartContractDtosForHelloWorld(),
                GetGenesisSmartContractDtosForBingoGame(),
                GetGenesisSmartContractDtosForLotteryDemo(),
                GetGenesisSmartContractDtosForGreeter(),
            }.SelectMany(x => x);
        }
    }
}