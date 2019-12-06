using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Reflection;

namespace AElf.Contracts.Deployer
{
    public class ContractsDeployer
    {
        private readonly ISystemContractProvider _systemContractProvider;

        public ContractsDeployer(ISystemContractProvider systemContractProvider)
        {
            _systemContractProvider = systemContractProvider;
        }

        public IReadOnlyDictionary<string, byte[]> GetContractCodes<T>()
        {
            var contractNames = GetContractNames(typeof(T).Assembly).ToList();
            if (contractNames.Count == 0)
            {
                throw new DllNotFoundInManifestException();
            }

            var codes = contractNames.Select(n => (n, GetCode(n))).ToDictionary(x => x.Item1, x => x.Item2);
            foreach (var systemContractDllPath in _systemContractProvider.GetSystemContractDllPaths())
            {
                codes.Add(systemContractDllPath.Split('.').Reverse().Skip(1).First(),
                    File.ReadAllBytes(Assembly.LoadFile(systemContractDllPath).Location));
            }
            return codes;
        }

        private static byte[] GetCode(string dllName)
        {
            return File.ReadAllBytes(Assembly.Load(dllName).Location);
        }

        private static IEnumerable<string> GetContractNames(Assembly assembly)
        {
            var manifestName = "Contracts.manifest";

            var resourceName = assembly.GetManifestResourceNames().FirstOrDefault(n => n.EndsWith(manifestName));
            if (resourceName == default(string))
            {
                return new string[0];
            }

            using (var stream = assembly.GetManifestResourceStream(resourceName))
            using (var reader = new StreamReader(stream))
            {
                var result = reader.ReadToEnd();
                return result.Trim().Split('\n').Select(f => f.Trim()).ToArray();
            }
        }
    }
}