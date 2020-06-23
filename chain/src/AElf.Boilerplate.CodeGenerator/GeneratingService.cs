using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.IO;
using System.Linq;
using System.Net;
using System.Text.RegularExpressions;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Logging.Abstractions;
using Microsoft.Extensions.Options;
using Volo.Abp.DependencyInjection;

namespace AElf.Boilerplate.CodeGenerator
{
    public class GeneratingService : ISingletonDependency
    {
        private readonly GeneratingOptions _options;

        public ILogger<GeneratingService> Logger { get; set; }

        public GeneratingService(IOptionsSnapshot<GeneratingOptions> options)
        {
            _options = options.Value;

            Logger = NullLogger<GeneratingService>.Instance;
        }

        public string Test()
        {
            Logger.LogInformation("Hello");
            return _options.Contents.First().New;
        }

        private static DirectoryInfo CreateDir(string path)
        {
            return Directory.Exists(path) ? new DirectoryInfo(path) : Directory.CreateDirectory(path);
        }

        private string ReplaceContent(string input)
        {
            foreach (var replacement in _options.Contents)
            {
                input = replacement.Replace(input);
            }

            return input;
        }

        public void Generate()
        {
            Queue<string> generatedFiles = new Queue<string>();

            foreach (var file in _options.Files)
            {

                var fileNew = file.New ?? ReplaceContent(file.Origin);
                File.Copy(file.Origin, fileNew, true);
                Logger.LogInformation($"Copy from {file.Origin} to {fileNew}");

                generatedFiles.Enqueue(new FileInfo(fileNew).FullName);
            }

            foreach (var folder in _options.Folders)
            {
                var originDir = new DirectoryInfo(folder.Origin);

                var destDir = CreateDir(folder.New ?? ReplaceContent(folder.Origin));

                Logger.LogInformation($"Create directory {destDir}");

                Queue<DirectoryInfo> queue = new Queue<DirectoryInfo>();
                queue.Enqueue(originDir);
                do
                {
                    var dir = queue.Dequeue();
                    foreach (var directoryInfo in dir.GetDirectories())
                    {
                        queue.Enqueue(directoryInfo);

                        var destSubDir = destDir.FullName + directoryInfo.FullName.Replace(originDir.FullName, "");
                        Logger.LogInformation($"Create directory {destSubDir}");
                        CreateDir(destSubDir);
                    }

                    var files = dir.GetFiles();
                    foreach (var originFile in files)
                    {
                        if (!_options.Extensions.Contains(originFile.Extension) ||
                            _options.IgnoreFiles.Any(p => originFile.FullName.Contains(p)))
                        {
                            Logger.LogInformation($"Skip {originFile.FullName}");

                            continue;
                        }

                        var destFileName = originFile.FullName.Replace(originDir.FullName, "");

                        destFileName = ReplaceContent(destFileName);

                        destFileName = destDir.FullName + destFileName;

                        Logger.LogInformation($"Copy from {originFile.FullName} to {destFileName}");
                        originFile.CopyTo(destFileName, true);

                        generatedFiles.Enqueue(destFileName);
                    }
                } while (queue.Count > 0);
            }

            while (generatedFiles.TryDequeue(out var file))
            {
                var content =
                    File.ReadAllText(file);
                
                Logger.LogInformation($"Change {file}");
                content = ReplaceContent(content);

                File.WriteAllText(file, content);
            }
        }
    }
}