using System.Collections.Generic;
using System.Linq;
using AElf;
using AElf.Blockchains;
using AElf.Blockchains.MainChain;
using AElf.Contracts.Genesis;
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
using ConsensusOptions = AElf.Blockchains.ConsensusOptions;

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
            services.TryAddSingleton<ISmartContractAddressNameProvider, ConsensusSmartContractAddressNameProvider>();
            services.TryAddSingleton<ISmartContractAddressNameProvider, ElectionSmartContractAddressNameProvider>();
            services.TryAddSingleton<ISmartContractAddressNameProvider, ProfitSmartContractAddressNameProvider>();
            services.TryAddSingleton<ISmartContractAddressNameProvider, TokenSmartContractAddressNameProvider>();
            services.TryAddSingleton<ISmartContractAddressNameProvider, VoteSmartContractAddressNameProvider>();

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
            
            Configure<ConsensusOptions>(option =>
            {
                configuration.GetSection("Consensus").Bind(option);

                if (option.InitialMiners == null || option.InitialMiners.Count == 0 ||
                    string.IsNullOrWhiteSpace(option.InitialMiners[0]))
                {
                    AsyncHelper.RunSync(async () =>
                    {
                        var accountService = context.Services.GetRequiredServiceLazy<IAccountService>().Value;
                        var publicKey = (await accountService.GetPublicKeyAsync()).ToHex();
                        option.InitialMiners = new List<string> {publicKey};
                    });
                }
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
    }
}