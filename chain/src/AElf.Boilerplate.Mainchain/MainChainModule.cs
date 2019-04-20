using System;
using AElf;
using AElf.Consensus.DPoS;
using AElf.Contracts.Consensus.DPoS;
using AElf.Contracts.Genesis;
using AElf.Kernel;
using AElf.Kernel.Consensus.DPoS;
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
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Logging.Abstractions;
using Microsoft.Extensions.Options;
using Volo.Abp;
using Volo.Abp.AspNetCore;
using Volo.Abp.Modularity;
using Volo.Abp.Threading;

namespace Aelf.Boilerplate.Mainchain
{
    [DependsOn(
        typeof(DPoSConsensusAElfModule),
        typeof(KernelAElfModule),
        typeof(OSAElfModule),
        typeof(AbpAspNetCoreModule),
        typeof(CSharpRuntimeAElfModule),
        typeof(GrpcNetworkModule),

        //TODO: should move to OSAElfModule
        typeof(ChainControllerRpcModule),
        typeof(WalletRpcModule),
        typeof(NetRpcAElfModule),
        typeof(RuntimeSetupAElfModule),

        //web api module
        typeof(WebWebAppAElfModule)
    )]
    public class MainChainModule : AElfModule
    {
        public ILogger<MainChainModule> Logger { get; set; }

        public OsBlockchainNodeContext OsBlockchainNodeContext { get; set; }

        public MainChainModule()
        {
            Logger = NullLogger<MainChainModule>.Instance;
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

            dto.InitializationSmartContracts.AddConsensusSmartContract<ConsensusContract>(
                GenerateConsensusInitializationCallList(dposOptions));


            Console.WriteLine("ADDRESS: " + Hash.FromString("HelloWorldContract"));
            Console.WriteLine("ADDRESS 1: " + AddressHelper.BuildContractAddress(chainOptions.ChainId, 1));
            Console.WriteLine("ADDRESS 2: " + AddressHelper.BuildContractAddress(chainOptions.ChainId, 2));

            dto.InitializationSmartContracts
                .AddGenesisSmartContract<HelloWorldContract.HelloWorldContract>(Hash.FromString("HelloWorldContract"));

            var osService = context.ServiceProvider.GetService<IOsBlockchainNodeContextService>();
            var that = this;
            AsyncHelper.RunSync(async () => { that.OsBlockchainNodeContext = await osService.StartAsync(dto); });
        }

        private SystemTransactionMethodCallList GenerateConsensusInitializationCallList(DPoSOptions dposOptions)
        {
            var consensusMethodCallList = new SystemTransactionMethodCallList();
            consensusMethodCallList.Add(nameof(ConsensusContract.InitialDPoSContract),
                new InitialDPoSContractInput
                {
                    TokenContractSystemName = TokenSmartContractAddressNameProvider.Name,
                    DividendsContractSystemName = DividendsSmartContractAddressNameProvider.Name,
                    LockTokenForElection = 10_0000
                });
            consensusMethodCallList.Add(nameof(ConsensusContract.InitialConsensus),
                dposOptions.InitialMiners.ToMiners().GenerateFirstRoundOfNewTerm(dposOptions.MiningInterval,
                    dposOptions.StartTimestamp.ToUniversalTime()));
            consensusMethodCallList.Add(nameof(ConsensusContract.ConfigStrategy),
                new DPoSStrategyInput
                {
                    IsBlockchainAgeSettable = dposOptions.IsBlockchainAgeSettable,
                    IsTimeSlotSkippable = dposOptions.IsTimeSlotSkippable,
                    IsVerbose = dposOptions.Verbose
                });
            return consensusMethodCallList;
        }

        public static class AddressHelper
        {
            /// <summary>
            /// 
            /// </summary>
            /// <returns></returns>
            /// <exception cref="ArgumentOutOfRangeException"></exception>
            public static Address BuildContractAddress(Hash chainId, ulong serialNumber)
            {
                var hash = Hash.FromTwoHashes(chainId, Hash.FromRawBytes(serialNumber.ToBytes()));
                return Address.FromBytes(Address.TakeByAddressLength(hash.DumpByteArray()));
            }

            public static Address BuildContractAddress(int chainId, ulong serialNumber)
            {
                return BuildContractAddress(chainId.ComputeHash(), serialNumber);
            }
        }

        public override void OnApplicationShutdown(ApplicationShutdownContext context)
        {
            var osService = context.ServiceProvider.GetService<IOsBlockchainNodeContextService>();
            var that = this;
            AsyncHelper.RunSync(() => osService.StopAsync(that.OsBlockchainNodeContext));
        }
    }
}