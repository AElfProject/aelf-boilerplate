using AElf.Modularity;
using Volo.Abp.EventBus.RabbitMq;
using Volo.Abp.Modularity;
using Volo.Abp.RabbitMQ;

namespace AElf.Boilerplate.EventHandler
{
    [DependsOn(typeof(AbpEventBusRabbitMqModule))]
    public class EventHandlerAElfModule : AElfModule
    {
        public override void ConfigureServices(ServiceConfigurationContext context)
        {
            Configure<AbpRabbitMqEventBusOptions>(options =>
            {
                options.ClientName = "AElfBoilerplate";
                options.ExchangeName = "AElfExchange";
            });

            Configure<AbpRabbitMqOptions>(options =>
            {
                options.Connections.Default.HostName = "localhost";
                options.Connections.Default.Port = 5672;
            });
        }
    }
}