using System.Linq;
using System.Threading.Tasks;
using AElf.Contracts.Oracle;
using AElf.Types;
using Google.Protobuf;
using Google.Protobuf.WellKnownTypes;
using Microsoft.Extensions.Options;
using Volo.Abp.DependencyInjection;

namespace AElf.Boilerplate.EventHandler
{
    public class SufficientCommitmentsCollectedLogEventProcessor : ILogEventProcessor, ITransientDependency
    {
        private readonly ContractAddressOptions _contractAddressOptions;
        private readonly ConfigOptions _configOptions;

        public SufficientCommitmentsCollectedLogEventProcessor(IOptionsSnapshot<ConfigOptions> configOptions,
            IOptionsSnapshot<ContractAddressOptions> contractAddressOptions)
        {
            _configOptions = configOptions.Value;
            _contractAddressOptions = contractAddressOptions.Value;
        }

        public string ContractName => "Oracle";
        public string LogEventName => nameof(SufficientCommitmentsCollected);

        public async Task ProcessAsync(LogEvent logEvent)
        {
            var collected = new SufficientCommitmentsCollected();
            collected.MergeFrom(logEvent);
            var node = new NodeManager(_configOptions.BlockChainEndpoint);
            node.SendTransaction(_configOptions.AccountAddress,
                _contractAddressOptions.ContractAddressMap[ContractName], "Reveal", new RevealInput
                {
                    QueryId = collected.QueryId,
                    Data = new StringValue {Value = _configOptions.Data}.ToByteString(),
                    Salt = HashHelper.ComputeFrom(new StringValue {Value = _configOptions.Salt})
                });
        }
    }
}