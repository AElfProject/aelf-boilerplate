using System;
using System.Collections.Generic;
using System.Linq;
using AElf;
using AElf.Contracts.Consensus.AEDPoS;
using AElf.Contracts.Consensus.DPoS;
using AElf.Contracts.Dividend;
using AElf.Contracts.Genesis;
using AElf.Contracts.MultiToken;
using AElf.Contracts.MultiToken.Messages;
using AElf.Database;
using AElf.Kernel;
using AElf.Kernel.Consensus.DPoS;
using AElf.Kernel.Infrastructure;
using AElf.Kernel.SmartContract;
using AElf.Kernel.SmartContract.Application;
using AElf.Kernel.Token;
using AElf.Modularity;
using AElf.OS;
using AElf.OS.Network.Grpc;
using AElf.OS.Node.Application;
using AElf.OS.Node.Domain;
using AElf.OS.Rpc.ChainController;
using AElf.OS.Rpc.Net;
using AElf.OS.Rpc.Wallet;
using AElf.Runtime.CSharp;
using AElf.RuntimeSetup;
using AElf.WebApp.Web;
using BingoGameContract;
using Google.Protobuf.WellKnownTypes;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Logging.Abstractions;
using Microsoft.Extensions.Options;
using Volo.Abp;
using Volo.Abp.AspNetCore;
using Volo.Abp.Modularity;
using Volo.Abp.Threading;
using MinerInRound = AElf.Contracts.Dividend.MinerInRound;
using Miners = AElf.Contracts.Dividend.Miners;
using Round = AElf.Contracts.Dividend.Round;

namespace Aelf.Boilerplate.Mainchain
{
    [DependsOn(
        typeof(DPoSConsensusAElfModule),
        typeof(KernelAElfModule),
        typeof(OSAElfModule),
        typeof(AbpAspNetCoreModule),
        typeof(CSharpRuntimeAElfModule),
        typeof(GrpcNetworkModule),
        typeof(ChainControllerRpcModule),
        typeof(WalletRpcModule),
        typeof(NetRpcAElfModule),
        typeof(RuntimeSetupAElfModule),
        typeof(WebWebAppAElfModule)
    )]
    public class MainChainModule : AElfModule
    {
        public ILogger<MainChainModule> Logger { get; set; }

        public OsBlockchainNodeContext OsBlockchainNodeContext { get; set; }

        private const string Symbol = "ELF";

        public MainChainModule()
        {
            Logger = NullLogger<MainChainModule>.Instance;
        }

        public override void ConfigureServices(ServiceConfigurationContext context)
        {
            var services = context.Services;
            services.AddKeyValueDbContext<BlockchainKeyValueDbContext>(o => o.UseInMemoryDatabase());
            services.AddKeyValueDbContext<StateKeyValueDbContext>(o => o.UseInMemoryDatabase());

            Configure<HostSmartContractBridgeContextOptions>(options =>
            {
                options.ContextVariables[ContextVariableDictionary.NativeSymbolName] = Symbol;
            });
        }

        public override void OnApplicationInitialization(ApplicationInitializationContext context)
        {
            var chainOptions = context.ServiceProvider.GetService<IOptionsSnapshot<ChainOptions>>().Value;

            var dto = new OsBlockchainNodeContextStartDto()
            {
                ChainId = chainOptions.ChainId,
                ZeroSmartContract = typeof(BasicContractZero)
            };

            var dposOptions = context.ServiceProvider.GetService<IOptionsSnapshot<DPoSOptions>>().Value;
            var zeroContractAddress = context.ServiceProvider.GetRequiredService<ISmartContractAddressService>()
                .GetZeroSmartContractAddress();

            dto.InitializationSmartContracts.AddGenesisSmartContract<AEDPoSContract>(
                ConsensusSmartContractAddressNameProvider.Name, GenerateConsensusInitializationCallList(dposOptions));

            dto.InitializationSmartContracts.AddGenesisSmartContract<DividendContract>(
                DividendSmartContractAddressNameProvider.Name,
                GenerateDividendInitializationCallList());

            dto.InitializationSmartContracts
                .AddGenesisSmartContract<HelloWorldContract.HelloWorldContract>(Hash.FromString("HelloWorldContract"));

            dto.InitializationSmartContracts.AddGenesisSmartContract<TokenContract>(
                TokenSmartContractAddressNameProvider.Name,
                GenerateTokenInitializationCallList(zeroContractAddress,
                    context.ServiceProvider.GetService<IOptions<DPoSOptions>>().Value.InitialMiners));

            dto.InitializationSmartContracts.AddGenesisSmartContract<BingoGameContract.BingoGameContract>(
                Hash.FromString("BingoGameContract"), GenerateBingoGameInitializationCallList());

            var osService = context.ServiceProvider.GetService<IOsBlockchainNodeContextService>();
            var that = this;
            AsyncHelper.RunSync(async () => { that.OsBlockchainNodeContext = await osService.StartAsync(dto); });
        }

        private SystemContractDeploymentInput.Types.SystemTransactionMethodCallList
            GenerateBingoGameInitializationCallList()
        {
            var bingoGameMethodCallList = new SystemContractDeploymentInput.Types.SystemTransactionMethodCallList();
            bingoGameMethodCallList.Add(nameof(BingoGameContract.BingoGameContract.InitialBingoGame), new InitialBingoGameInput
            {
                TokenContractSystemName = TokenSmartContractAddressNameProvider.Name,
                ConsensusContractSystemName = ConsensusSmartContractAddressNameProvider.Name
            });
            return bingoGameMethodCallList;
        }

        private SystemContractDeploymentInput.Types.SystemTransactionMethodCallList
            GenerateConsensusInitializationCallList(DPoSOptions dposOptions)
        {
            var consensusMethodCallList = new SystemContractDeploymentInput.Types.SystemTransactionMethodCallList();
            consensusMethodCallList.Add(nameof(AEDPoSContract.InitialAElfConsensusContract),
                new InitialAElfConsensusContractInput
                {
                    IsTermStayOne = true
                });
            consensusMethodCallList.Add(nameof(AEDPoSContract.FirstRound),
                dposOptions.InitialMiners.ToMiners().GenerateFirstRoundOfNewTerm(dposOptions.MiningInterval,
                    dposOptions.StartTimestamp.ToUniversalTime()));
            return consensusMethodCallList;
        }

        private SystemContractDeploymentInput.Types.SystemTransactionMethodCallList
            GenerateDividendInitializationCallList()
        {
            var dividendMethodCallList = new SystemContractDeploymentInput.Types.SystemTransactionMethodCallList();
            dividendMethodCallList.Add(nameof(DividendContract.InitializeDividendContract),
                new InitialDividendContractInput
                {
                    ConsensusContractSystemName = ConsensusSmartContractAddressNameProvider.Name,
                    TokenContractSystemName = TokenSmartContractAddressNameProvider.Name
                });
            return dividendMethodCallList;
        }

        private SystemContractDeploymentInput.Types.SystemTransactionMethodCallList GenerateTokenInitializationCallList(
            Address issuer, List<string> tokenReceivers)
        {
            const int totalSupply = 10_0000_0000;
            var tokenContractCallList = new SystemContractDeploymentInput.Types.SystemTransactionMethodCallList();
            tokenContractCallList.Add(nameof(TokenContract.CreateNativeToken), new CreateNativeTokenInput
            {
                Symbol = Symbol,
                Decimals = 2,
                IsBurnable = true,
                TokenName = "elf token",
                TotalSupply = totalSupply,
                Issuer = issuer,
                LockWhiteSystemContractNameList = {ConsensusSmartContractAddressNameProvider.Name}
            });

            tokenContractCallList.Add(nameof(TokenContract.IssueNativeToken), new IssueNativeTokenInput
            {
                Symbol = Symbol,
                Amount = (long) (totalSupply * 0.2),
                ToSystemContractName = DividendSmartContractAddressNameProvider.Name,
                Memo = "Set dividends."
            });

            foreach (var tokenReceiver in tokenReceivers)
            {
                tokenContractCallList.Add(nameof(TokenContract.Issue), new IssueInput
                {
                    Symbol = Symbol,
                    Amount = (long) (totalSupply * 0.8) / tokenReceivers.Count,
                    To = Address.FromPublicKey(ByteArrayHelpers.FromHexString(tokenReceiver)),
                    Memo = "Set initial miner's balance.",
                });
            }

            // Set fee pool address to dividend contract address.
            tokenContractCallList.Add(nameof(TokenContract.SetFeePoolAddress),DividendSmartContractAddressNameProvider.Name);
            return tokenContractCallList;
        }

        public override void OnApplicationShutdown(ApplicationShutdownContext context)
        {
            var osService = context.ServiceProvider.GetService<IOsBlockchainNodeContextService>();
            var that = this;
            AsyncHelper.RunSync(() => osService.StopAsync(that.OsBlockchainNodeContext));
        }
    }

    static class Extensions
    {
        public static Miners ToMiners(this List<string> minerPublicKeys, long termNumber = 0)
        {
            return new Miners
            {
                PublicKeys = {minerPublicKeys},
                Addresses = {minerPublicKeys.Select(p => Address.FromPublicKey(ByteArrayHelpers.FromHexString(p)))},
                TermNumber = termNumber
            };
        }

        public static Round GenerateFirstRoundOfNewTerm(this Miners miners, int miningInterval,
            DateTime currentBlockTime, long currentRoundNumber = 0, long currentTermNumber = 0)
        {
            var dict = new Dictionary<string, int>();

            foreach (var miner in miners.PublicKeys)
            {
                dict.Add(miner, miner[0]);
            }

            var sortedMiners =
                (from obj in dict
                    orderby obj.Value descending
                    select obj.Key).ToList();

            var round = new Round();

            for (var i = 0; i < sortedMiners.Count; i++)
            {
                var minerInRound = new MinerInRound();

                // The first miner will be the extra block producer of first round of each term.
                if (i == 0)
                {
                    minerInRound.IsExtraBlockProducer = true;
                }

                minerInRound.PublicKey = sortedMiners[i];
                minerInRound.Order = i + 1;
                minerInRound.ExpectedMiningTime =
                    currentBlockTime.AddMilliseconds((i * miningInterval) + miningInterval).ToTimestamp();
                minerInRound.PromisedTinyBlocks = 1;
                // Should be careful during validation.
                minerInRound.PreviousInValue = Hash.Empty;

                round.RealTimeMinersInformation.Add(sortedMiners[i], minerInRound);
            }

            round.RoundNumber = currentRoundNumber + 1;
            round.TermNumber = currentTermNumber + 1;

            return round;
        }
    }
}