using System;
using System.Threading.Tasks;
using AElf.Contracts.Report;
using AElf.Types;
using Volo.Abp.DependencyInjection;

namespace AElf.Boilerplate.EventHandler
{
    public class ReportConfirmedLogEventProcessor : ILogEventProcessor, ITransientDependency
    {
        public string ContractName => "Report";
        public string LogEventName => nameof(ReportConfirmed);

        public void Process(LogEvent logEvent)
        {
            var reportConfirmed = new ReportConfirmed();
            reportConfirmed.MergeFrom(logEvent);
            Console.WriteLine(reportConfirmed);
        }
    }
}