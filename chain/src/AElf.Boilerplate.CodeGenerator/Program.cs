using System;
using Volo.Abp;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;

namespace AElf.Boilerplate.CodeGenerator
{
    class Program
    {
        static void Main(string[] args)
        {
            using (var application = AbpApplicationFactory.Create<AppModule>(options =>
            {
                options.UseAutofac();
                options.Services.AddLogging(o => { o.AddConsole(); });

                options.Configuration.CommandLineArgs = args;
            }))
            {
                application.Initialize();

                var helloWorldService =
                    application.ServiceProvider.GetService<GeneratingService>();

                helloWorldService.Generate();

                //Console.WriteLine("Press ENTER to stop application...");
                //Console.ReadLine();
            }
        }
    }
}