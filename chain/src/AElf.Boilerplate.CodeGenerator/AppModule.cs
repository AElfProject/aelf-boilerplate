using System.Collections.Generic;
using System.Text.RegularExpressions;
using Microsoft.Extensions.DependencyInjection;
using Volo.Abp.Autofac;
using Volo.Abp.Modularity;

namespace AElf.Boilerplate.CodeGenerator
{
    [DependsOn(typeof(AbpAutofacModule))] //Add dependency to the AbpAutofacModule
    public class AppModule : AbpModule
    {
        public override void ConfigureServices(ServiceConfigurationContext context)
        {
            var configuration = context.Services.GetConfiguration();

            var section = configuration.GetSection("Generating");

            Configure<GeneratingOptions>(section);
        }
    }

    public class Replacement
    {
        public string Origin { get; set; }
        public string New { get; set; }

        public bool IsRegex { get; set; }
    }

    public static class ReplacementExtensions
    {
        public static string Replace(this Replacement @this, string input)
        {
            return @this.IsRegex
                ? Regex.Replace(input, @this.Origin, @this.New)
                : input?.Replace(@this.Origin, @this.New);
        }
    }

    public class GeneratingOptions
    {
        public List<Replacement> Contents { get; set; }

        public List<Replacement> Folders { get; set; }

        public List<Replacement> Files { get; set; }

        public HashSet<string> Extensions { get; set; }
        
        public HashSet<string> IgnoreFiles { get; set; }

    }
}