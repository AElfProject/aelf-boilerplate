using System;
using System.Threading.Tasks;
using Volo.Abp;

namespace AElf.Boilerplate.EventHandler
{
    public class Program
    {
        public static async Task Main(string[] args)
        {
            using var application = AbpApplicationFactory.Create<EventHandlerAElfModule>(options =>
            {
                options.UseAutofac();
            });

            application.Initialize();

            Console.WriteLine("Start subscribing messages.");
            Console.ReadLine();

            application.Shutdown();
        }
    }
}