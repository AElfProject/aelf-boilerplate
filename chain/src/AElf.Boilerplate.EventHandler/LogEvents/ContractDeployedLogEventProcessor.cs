using System;
using System.Threading.Tasks;
using AElf.Standards.ACS0;
using AElf.Types;
using Volo.Abp.DependencyInjection;

namespace AElf.Boilerplate.EventHandler
{
    public class ContractDeployedLogEventProcessor: ILogEventProcessor, ITransientDependency
    {
        public string ContractName => "BasicZero";
        public string LogEventName => nameof(ContractDeployed);

        public async Task ProcessAsync(LogEvent logEvent)
        {
            var contractDeployed = new ContractDeployed();
            contractDeployed.MergeFrom(logEvent);
            Console.WriteLine(contractDeployed);
        }
    }
}