using System.Threading.Tasks;
using AElf.Contracts.Oracle;
using AElf.Types;

namespace AElf.Boilerplate.EventHandler
{
    public class QueryCreatedLogEventProcessor : ILogEventProcessor
    {
        public string ContractName => "Oracle";
        public string LogEventName => nameof(QueryCreated);

        public async Task ProcessAsync(LogEvent logEvent)
        {
            var queryCreated = new QueryCreated();
            queryCreated.MergeFrom(logEvent);
            
        }
    }
}