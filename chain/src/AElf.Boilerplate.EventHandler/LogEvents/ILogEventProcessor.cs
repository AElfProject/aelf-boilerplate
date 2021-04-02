using System.Collections.Generic;
using System.Threading.Tasks;
using AElf.Types;
using AElf.WebApp.MessageQueue;

namespace AElf.Boilerplate.EventHandler
{
    public interface ILogEventProcessor
    {
        string ContractName { get; }
        string LogEventName { get; }
        Task ProcessAsync(LogEvent logEvent);
    }
}