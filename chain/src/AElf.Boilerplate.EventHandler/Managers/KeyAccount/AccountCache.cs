using System;
using System.IO;
using System.Threading.Tasks;
using AElf;
using AElf.Cryptography;

namespace AElf.Boilerplate.EventHandler
{
    public class AccountInfo
    {
        public AccountInfo(string account, string privateKey, string publicKey)
        {
            Account = account;
            PrivateKey = privateKey;
            PublicKey = publicKey;
        }

        public string Account { get; set; }
        public string PrivateKey { get; set; }
        public string PublicKey { get; set; }
    }

    public class AccountInfoCache
    {
        private const string KeyCacheExtension = ".cache";
        private const string KeyFolderName = "keys";

        public AccountInfoCache()
        {
            KeyPath = Path.Combine(CommonHelper.GetCurrentDataDir(), KeyFolderName);
        }

        public string KeyPath { get; set; }

        public async Task WriteCache(string account, byte[] privateKeyBytes)
        {
            var privateKey = privateKeyBytes.ToHex();
            var keyPair = CryptoHelper.FromPrivateKey(privateKeyBytes);
            var publicKeyBytes = keyPair.PublicKey;
            var publicKey = publicKeyBytes.ToHex();

            var accountInfo = new AccountInfo(account, privateKey, publicKey);
            await WriteCache(accountInfo);
        }

        public bool ReadCache(string account, out byte[] privateKeyBytes)
        {
            privateKeyBytes = null;
            var result = TryGetCache(account, out var info);
            if (result)
            {
                privateKeyBytes = ByteArrayHelper.HexStringToByteArray(info.PrivateKey);
                return true;
            }

            return false;
        }

        private async Task WriteCache(AccountInfo info)
        {
            var fullName = Path.Combine(KeyPath, $"{info.Account}{KeyCacheExtension}");
            await Task.Run(() =>
            {
                using (var writer = File.CreateText(fullName))
                {
                    var content = $"{info.PrivateKey} {info.PublicKey}";
                    writer.Write(content);
                    writer.Flush();
                }
            });
        }

        private bool TryGetCache(string account, out AccountInfo info)
        {
            info = null;
            var fullName = Path.Combine(KeyPath, $"{account}{KeyCacheExtension}");
            if (File.Exists(fullName))
            {
                var content = File.ReadAllText(fullName);
                var infoArray = content.Split(" ");
                info = new AccountInfo(account, infoArray[0], infoArray[1]);

                return true;
            }

            return false;
        }
    }
}