﻿using System;
using System.Linq;
using AElf.Boilerplate.MainChain;
using AElf.Kernel;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.AspNetCore.Cors;
using Volo.Abp;
using Volo.Abp.Modularity;

namespace AElf.Boilerplate.Launcher
{
    public class Startup
    {
        private readonly IConfiguration _configuration;
        private const string DefaultCorsPolicyName = "CorsPolicy";

        public Startup(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        // This method gets called by the runtime. Use this method to add services to the container.
        // For more information on how to configure your application, visit https://go.microsoft.com/fwlink/?LinkID=398940
        public void ConfigureServices(IServiceCollection services)
        {
            AddApplication<MainChainModule>(services);
            services.AddCors(options =>
            {
                options.AddPolicy(DefaultCorsPolicyName, builder =>
                {
                    builder
                        .WithOrigins(_configuration["CorsOrigins"]
                            .Split(",", StringSplitOptions.RemoveEmptyEntries)
                            .Select(o => o.RemovePostFix("/"))
                            .ToArray()
                        )
                        .WithAbpExposedHeaders()
                        .AllowAnyHeader()
                        .AllowAnyMethod();
                    if (_configuration["CorsOrigins"] != "*")
                    {
                        builder.AllowCredentials();
                    }
                });
            });
        }
        
        private static void AddApplication<T>(IServiceCollection services) where T: IAbpModule
        {
            services.AddApplication<T>();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            app.UseRouting();
            app.UseCors(DefaultCorsPolicyName);

            app.InitializeApplication();
        }
    }
}