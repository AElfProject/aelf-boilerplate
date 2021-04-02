using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using AElf.Cryptography;
using AElf.Cryptography.ECDSA;
using AElf.Cryptography.Exceptions;
using AElf.Types;
using Nethereum.KeyStore;
using Nethereum.KeyStore.Crypto;
using Volo.Abp.Threading;

namespace AElf.Boilerplate.EventHandler
{
    public enum KeyStoreErrors
    {
        None = 0,
        AccountAlreadyUnlocked = 1,
        WrongPassword = 2,
        WrongAccountFormat = 3,
        AccountFileNotFound = 4
    }

    public class AElfKeyStore : IKeyStore
    {
        private const string KeyFileExtension = ".json";
        private const string KeyFolderName = "keys";

        private static AElfKeyStore _keyStore;
        private readonly KeyStoreService _keyStoreService;

        private readonly List<Account> _unlockedAccounts;

        public readonly string DataDirectory;
        public AccountInfoCache CacheAccount;
        public TimeSpan DefaultTimeoutToClose = TimeSpan.FromMinutes(10); //in order to customize time setting.

        private AElfKeyStore(string dataDirectory)
        {
            DataDirectory = dataDirectory;
            CacheAccount = new AccountInfoCache();
            _unlockedAccounts = new List<Account>();
            _keyStoreService = new KeyStoreService();
        }

        public async Task<KeyStoreErrors> UnlockAccountAsync(string address, string password, bool withTimeout = true)
        {
            try
            {
                if (_unlockedAccounts.Any(x => x.AccountName == address))
                    return KeyStoreErrors.AccountAlreadyUnlocked;

                if (withTimeout)
                    await UnlockAccountAsync(address, password, DefaultTimeoutToClose);
                else
                    await UnlockAccountAsync(address, password, null);
            }
            catch (InvalidPasswordException)
            {
                return KeyStoreErrors.WrongPassword;
            }
            catch (KeyStoreNotFoundException)
            {
                return KeyStoreErrors.AccountFileNotFound;
            }

            return KeyStoreErrors.None;
        }

        public ECKeyPair GetAccountKeyPair(string address)
        {
            var kp = _unlockedAccounts.FirstOrDefault(oa => oa.AccountName == address)?.KeyPair;
            if (kp == null)
            {
                AsyncHelper.RunSync(() => UnlockAccountAsync(address, "123456789"));
                kp = _unlockedAccounts.FirstOrDefault(oa => oa.AccountName == address)?.KeyPair;
            }

            return kp;
        }

        public async Task<ECKeyPair> CreateAccountKeyPairAsync(string password)
        {
            var keyPair = CryptoHelper.GenerateKeyPair();
            var res = await WriteKeyPairAsync(keyPair, password);
            return !res ? null : keyPair;
        }

        public async Task<List<string>> GetAccountsAsync()
        {
            var dir = CreateKeystoreDirectory();
            var files = dir.GetFiles("*" + KeyFileExtension);
            var accounts = new List<string>();
            foreach (var file in files)
            {
                if (file.Length == 0)
                {
                    File.Delete(file.FullName); //delete empty account files
                    continue;
                }

                accounts.Add(Path.GetFileNameWithoutExtension(file.Name));
            }

            return await Task.FromResult(accounts);
        }

        public static AElfKeyStore GetKeyStore(string dataDirectory = "")
        {
            if (dataDirectory == "")
                dataDirectory = CommonHelper.GetCurrentDataDir();

            if (_keyStore != null && _keyStore.DataDirectory == dataDirectory)
                return _keyStore;

            _keyStore = new AElfKeyStore(dataDirectory);

            return _keyStore;
        }

        private async Task UnlockAccountAsync(string address, string password, TimeSpan? timeoutToClose)
        {
            var keyPair = await ReadKeyPairAsync(address, password);
            var unlockedAccount = new Account(address) {KeyPair = keyPair};

            if (timeoutToClose.HasValue)
            {
                var t = new Timer(LockAccount, unlockedAccount, timeoutToClose.Value, timeoutToClose.Value);
                unlockedAccount.LockTimer = t;
            }

            _unlockedAccounts.Add(unlockedAccount);
        }

        private void LockAccount(object accountObject)
        {
            if (!(accountObject is Account unlockedAccount))
                return;
            unlockedAccount.Lock();
            _unlockedAccounts.Remove(unlockedAccount);
        }

        public async Task<ECKeyPair> ReadKeyPairAsync(string address, string password)
        {
            try
            {
                if (!CacheAccount.ReadCache(address, out var privateKey))
                {
                    var keyFilePath = GetKeyFileFullPath(address);
                    privateKey = await Task.Run(() =>
                    {
                        using (var textReader = File.OpenText(keyFilePath))
                        {
                            var json = textReader.ReadToEnd();
                            return _keyStoreService.DecryptKeyStoreFromJson(password, json);
                        }
                    });
                    //save cache info
                    await CacheAccount.WriteCache(address, privateKey);
                }

                return CryptoHelper.FromPrivateKey(privateKey);
            }
            catch (FileNotFoundException ex)
            {
                throw new KeyStoreNotFoundException("Keystore file not found.", ex);
            }
            catch (DirectoryNotFoundException ex)
            {
                throw new KeyStoreNotFoundException("Invalid keystore path.", ex);
            }
            catch (DecryptionException ex)
            {
                throw new InvalidPasswordException("Invalid password.", ex);
            }
        }

        private async Task<bool> WriteKeyPairAsync(ECKeyPair keyPair, string password)
        {
            if (keyPair?.PrivateKey == null || keyPair.PublicKey == null)
                throw new InvalidKeyPairException("Invalid keypair (null reference).", null);

            // Ensure path exists
            CreateKeystoreDirectory();

            var address = Address.FromPublicKey(keyPair.PublicKey);
            var fullPath = GetKeyFileFullPath(address.ToBase58());
            //save cache
            await CacheAccount.WriteCache(address.ToBase58(), keyPair.PrivateKey);

            await Task.Run(() =>
            {
                using var writer = File.CreateText(fullPath);
                string scryptResult;
                while (true)
                {
                    scryptResult = _keyStoreService.EncryptAndGenerateDefaultKeyStoreAsJson(password,
                        keyPair.PrivateKey,
                        address.ToBase58());
                    if (!scryptResult.IsNullOrWhiteSpace())
                        break;
                }

                writer.Write(scryptResult);
                writer.Flush();
            });

            return true;
        }

        /// <summary>
        ///     Return the full path of the files
        /// </summary>
        private string GetKeyFileFullPath(string address)
        {
            var path = GetKeyFileFullPathStrict(address);
            return File.Exists(path) ? path : GetKeyFileFullPathStrict(address);
        }

        private string GetKeyFileFullPathStrict(string address)
        {
            var dirPath = GetKeystoreDirectoryPath();
            var filePath = Path.Combine(dirPath, address);
            var filePathWithExtension = Path.ChangeExtension(filePath, KeyFileExtension);
            return filePathWithExtension;
        }

        private DirectoryInfo CreateKeystoreDirectory()
        {
            var dirPath = GetKeystoreDirectoryPath();
            return Directory.CreateDirectory(dirPath);
        }

        private string GetKeystoreDirectoryPath()
        {
            return Path.Combine(DataDirectory, KeyFolderName);
        }
    }
}