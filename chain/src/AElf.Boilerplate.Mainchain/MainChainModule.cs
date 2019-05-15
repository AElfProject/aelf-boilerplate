using System;
using System.Collections.Generic;
using System.Linq;
using AElf;
using AElf.Blockchains;
using AElf.Blockchains.MainChain;
using AElf.Contracts.Consensus.AEDPoS;
using AElf.Contracts.Election;
using AElf.Contracts.Genesis;
using AElf.Contracts.MultiToken;
using AElf.Contracts.MultiToken.Messages;
using AElf.Contracts.Profit;
using AElf.Contracts.Vote;
using AElf.CrossChain;
using AElf.Database;
using AElf.Kernel;
using AElf.Kernel.Account.Application;
using AElf.Kernel.Consensus.AEDPoS;
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
using Google.Protobuf;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.DependencyInjection.Extensions;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Logging.Abstractions;
using Microsoft.Extensions.Options;
using Volo.Abp;
using Volo.Abp.AspNetCore;
using Volo.Abp.Modularity;
using Volo.Abp.Threading;
using ConsensusOptions = AElf.Kernel.Consensus.AEDPoS.ConsensusOptions;

namespace Aelf.Boilerplate.Mainchain
{
    [DependsOn(
        typeof(AEDPoSAElfModule),
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
            services.AddTransient<IGenesisSmartContractDtoProvider, GenesisSmartContractDtoProvider>();

            var s = context.Services;
            s.TryAddSingleton<ISmartContractAddressNameProvider, ConsensusSmartContractAddressNameProvider>();
            s.TryAddSingleton<ISmartContractAddressNameProvider, ElectionSmartContractAddressNameProvider>();
            s.TryAddSingleton<ISmartContractAddressNameProvider, ProfitSmartContractAddressNameProvider>();
            s.TryAddSingleton<ISmartContractAddressNameProvider, TokenSmartContractAddressNameProvider>();
            s.TryAddSingleton<ISmartContractAddressNameProvider, VoteSmartContractAddressNameProvider>();

            var configuration = context.Services.GetConfiguration();
            Configure<TokenInitialOptions>(configuration.GetSection("TokenInitial"));
            Configure<ChainOptions>(option =>
            {
                option.ChainId =
                    ChainHelpers.ConvertBase58ToChainId(context.Services.GetConfiguration()["ChainId"]);
            });

            Configure<HostSmartContractBridgeContextOptions>(options =>
            {
                options.ContextVariables[ContextVariableDictionary.NativeSymbolName] = context.Services
                    .GetConfiguration().GetValue("TokenInitial:Symbol", Symbol);
            });

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

            var zeroContractAddress = context.ServiceProvider.GetRequiredService<ISmartContractAddressService>()
                .GetZeroSmartContractAddress();
            var dtoProvider = context.ServiceProvider.GetRequiredService<IGenesisSmartContractDtoProvider>();

            dto.InitializationSmartContracts = dtoProvider.GetGenesisSmartContractDtos(zeroContractAddress).ToList();

            var osService = context.ServiceProvider.GetService<IOsBlockchainNodeContextService>();
            var that = this;
            AsyncHelper.RunSync(async () => { that.OsBlockchainNodeContext = await osService.StartAsync(dto); });
        }

        public override void OnApplicationShutdown(ApplicationShutdownContext context)
        {
            var osService = context.ServiceProvider.GetService<IOsBlockchainNodeContextService>();
            var that = this;
            AsyncHelper.RunSync(() => osService.StopAsync(that.OsBlockchainNodeContext));
        }
/*

        public override void OnApplicationInitialization(ApplicationInitializationContext context)
        {
            var chainOptions = context.ServiceProvider.GetService<IOptionsSnapshot<ChainOptions>>().Value;

            var dto = new OsBlockchainNodeContextStartDto()
            {
                ChainId = chainOptions.ChainId,
                ZeroSmartContract = typeof(BasicContractZero)
            };

            var consensusOptions = context.ServiceProvider.GetService<IOptionsSnapshot<ConsensusOptions>>().Value;
            var zeroContractAddress = context.ServiceProvider.GetRequiredService<ISmartContractAddressService>()
                .GetZeroSmartContractAddress();

            dto.InitializationSmartContracts.AddGenesisSmartContract<ProfitContract>(
                ProfitSmartContractAddressNameProvider.Name);

            dto.InitializationSmartContracts.AddGenesisSmartContract<VoteContract>(
                VoteSmartContractAddressNameProvider.Name);

            dto.InitializationSmartContracts.AddGenesisSmartContract<ElectionContract>(
                ElectionSmartContractAddressNameProvider.Name, new SystemContractDeploymentInput.Types.SystemTransactionMethodCallList
                {
                    Value = { new SystemContractDeploymentInput.Types.SystemTransactionMethodCall
                    {
                        MethodName = nameof(ElectionContract.InitialElectionContract),
                        Params = new InitialElectionContractInput
                        {
                            ProfitContractSystemName = ProfitSmartContractAddressNameProvider.Name,
                            VoteContractSystemName = VoteSmartContractAddressNameProvider.Name,
                            TokenContractSystemName = TokenSmartContractAddressNameProvider.Name,
                            ConsensusContractSystemName = ConsensusSmartContractAddressNameProvider.Name
                        }.ToByteString()
                    }}
                });

            dto.InitializationSmartContracts.AddGenesisSmartContract<TokenContract>(
                TokenSmartContractAddressNameProvider.Name,
                GenerateTokenInitializationCallList(zeroContractAddress,
                    context.ServiceProvider.GetService<IOptions<ConsensusOptions>>().Value.InitialMiners));

            dto.InitializationSmartContracts.AddGenesisSmartContract<AEDPoSContract>(
                ConsensusSmartContractAddressNameProvider.Name, GenerateConsensusInitializationCallList(consensusOptions));

            dto.InitializationSmartContracts
                .AddGenesisSmartContract<HelloWorldContract.HelloWorldContract>(Hash.FromString("HelloWorldContract"));

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
            GenerateConsensusInitializationCallList(ConsensusOptions consensusOptions)
        {
            var consensusMethodCallList = new SystemContractDeploymentInput.Types.SystemTransactionMethodCallList();
            consensusMethodCallList.Add(nameof(AEDPoSContract.InitialAElfConsensusContract),
                new InitialAElfConsensusContractInput
                {
                    IsTermStayOne = true
                });
            consensusMethodCallList.Add(nameof(AEDPoSContract.FirstRound),
                new Miners
                {
                    PublicKeys =
                    {
                        consensusOptions.InitialMiners.Select(k =>
                            ByteString.CopyFrom(ByteArrayHelpers.FromHexString(k)))
                    }
                }.GenerateFirstRoundOfNewTerm(consensusOptions.MiningInterval,
                    consensusOptions.StartTimestamp.ToUniversalTime()));
            return consensusMethodCallList;
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
                LockWhiteSystemContractNameList = {ElectionSmartContractAddressNameProvider.Name}
            });

            tokenContractCallList.Add(nameof(TokenContract.IssueNativeToken), new IssueNativeTokenInput
            {
                Symbol = Symbol,
                Amount = (long) (totalSupply * 0.2),
                ToSystemContractName = ElectionSmartContractAddressNameProvider.Name,
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
            tokenContractCallList.Add(nameof(TokenContract.SetFeePoolAddress),
                ElectionSmartContractAddressNameProvider.Name);
            return tokenContractCallList;
        }

        public override void OnApplicationShutdown(ApplicationShutdownContext context)
        {
            var osService = context.ServiceProvider.GetService<IOsBlockchainNodeContextService>();
            var that = this;
            AsyncHelper.RunSync(() => osService.StopAsync(that.OsBlockchainNodeContext));
        }*/
    }
}