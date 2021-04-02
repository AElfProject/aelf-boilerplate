using System;
using System.Threading.Tasks;
using AElf.Contracts.Oracle;
using AElf.Types;
using Volo.Abp.DependencyInjection;

namespace AElf.Boilerplate.EventHandler
{
    public class SufficientDataCollectedLogEventProcessor : ILogEventProcessor, ITransientDependency
    {
        public string ContractName => "Oracle";
        public string LogEventName => nameof(SufficientDataCollected);

        public async Task ProcessAsync(LogEvent logEvent)
        {
            var collected = new SufficientDataCollected();
            collected.MergeFrom(logEvent);
            Console.WriteLine(logEvent);
        }
    }
}