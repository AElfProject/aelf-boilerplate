using System.Threading.Tasks;
using AElf.Contracts.Report;
using AElf.Types;
using Microsoft.Extensions.Options;
using Volo.Abp.DependencyInjection;

namespace AElf.Boilerplate.EventHandler
{
    public class ReportProposedLogEventProcessor : ILogEventProcessor, ITransientDependency
    {
        private readonly ContractAddressOptions _contractAddressOptions;
        private readonly ConfigOptions _configOptions;

        public string ContractName => "Report";
        public string LogEventName => nameof(ReportProposed);

        public ReportProposedLogEventProcessor(IOptionsSnapshot<ConfigOptions> configOptions,
            IOptionsSnapshot<ContractAddressOptions> contractAddressOptions)
        {
            _configOptions = configOptions.Value;
            _contractAddressOptions = contractAddressOptions.Value;
        }

        public async Task ProcessAsync(LogEvent logEvent)
        {
            var reportProposed = new ReportProposed();
            reportProposed.MergeFrom(logEvent);

            var node = new NodeManager(_configOptions.BlockChainEndpoint);
            node.SendTransaction(_configOptions.AccountAddress,
                _contractAddressOptions.ContractAddressMap[ContractName], "ConfirmReport", new ConfirmReportInput
                {
                    EthereumContractAddress = _configOptions.EthereumContractAddress,
                    RoundId = reportProposed.Report.RoundId
                    // TODO: Compute signature here.
                });
        }
    }
}