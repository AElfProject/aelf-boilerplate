using System;
using System.IO;
using AElf.Contracts.TestKit;
using AElf.Kernel;
using AElf.Modularity;
using AElf.Runtime.CSharp;
using Volo.Abp.Modularity;

namespace HelloWorldContract.Test
{
    public class HelloWorldContractTestModule : ContractTestModule
    {
        public override void ConfigureServices(ServiceConfigurationContext context)
        {
            base.ConfigureServices(context);
            
            Console.WriteLine("PATH: " + Path.GetDirectoryName(typeof (RunnerOptions).Assembly.Location));
            
            Configure<RunnerOptions>(o => { o.SdkDir = Path.GetDirectoryName(typeof(HelloWorldContractTestModule).Assembly.Location); });
        }
    }
}