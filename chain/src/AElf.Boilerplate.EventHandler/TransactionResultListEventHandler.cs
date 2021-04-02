using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AElf.Types;
using AElf.WebApp.MessageQueue;
using Google.Protobuf;
using Microsoft.Extensions.Options;
using Volo.Abp.DependencyInjection;
using Volo.Abp.EventBus.Distributed;

namespace AElf.Boilerplate.EventHandler
{
    public class TransactionResultListEventHandler : IDistributedEventHandler<TransactionResultListEto>,
        ITransientDependency
    {
        private readonly IEnumerable<ILogEventProcessor> _logEventProcessors;
        private readonly ContractAddressOptions _contractAddressOptions;

        public TransactionResultListEventHandler(IEnumerable<ILogEventProcessor> logEventProcessors,
            IOptionsSnapshot<ContractAddressOptions> contractAddressOptions)
        {
            _logEventProcessors = logEventProcessors;
            _contractAddressOptions = contractAddressOptions.Value;
        }

        public async Task HandleEventAsync(TransactionResultListEto eventData)
        {
            foreach (var logEventProcessor in _logEventProcessors)
            {
                foreach (var result in eventData.TransactionResults.Values)
                {
                    foreach (var eventLog in result.Logs)
                    {
                        if (!_contractAddressOptions.ContractAddressMap.TryGetValue(logEventProcessor.ContractName,
                            out var contractAddress)) return;
                        if (eventLog.Address != contractAddress) return;
                        if (eventLog.Name != logEventProcessor.LogEventName) return;
                        await logEventProcessor.ProcessAsync(new LogEvent
                        {
                            Indexed = {eventLog.Indexed.Select(ByteString.FromBase64)},
                            NonIndexed = ByteString.FromBase64(eventLog.NonIndexed)
                        });
                    }
                }
            }
        }
    }
}