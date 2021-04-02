using System;
using System.Collections.Generic;
using System.Net;
using System.Security;
using AElf;
using AElf.Cryptography.ECDSA;
using AElf.Types;
using Volo.Abp.Threading;

namespace AElf.Boilerplate.EventHandler
{
    public class AccountManager
    {
        private readonly AElfKeyStore _keyStore;
        private List<string> _accounts;
        private const string DefaultPassword = "123456789";

        public AccountManager(AElfKeyStore keyStore)
        {
            _keyStore = keyStore;
            _accounts = AsyncHelper.RunSync(_keyStore.GetAccountsAsync);
        }

        public AccountManager()
        {
            _keyStore = AElfKeyStore.GetKeyStore();
            _accounts = AsyncHelper.RunSync(_keyStore.GetAccountsAsync);
        }

        public string NewAccount(string password = "")
        {
            if (password == "")
                password = DefaultPassword;

            if (password == "")
                password = AskInvisible("password:");

            var keyPair = AsyncHelper.RunSync(() => _keyStore.CreateAccountKeyPairAsync(password));
            var pubKey = keyPair.PublicKey;
            var address = Address.FromPublicKey(pubKey);

            var accountInfo = address.ToBase58();
            _accounts.Add(accountInfo);

            return accountInfo;
        }

        public string GetRandomAccount()
        {
            var n = 0;
            var account = string.Empty;
            while (n < 10)
            {
                var number = CommonHelper.GenerateRandomNumber(0, _accounts.Count);
                account = _accounts[number];

                var result = UnlockAccount(account);
                if (result)
                    return account;
                if (n == 10)
                    throw new Exception("Cannot got random account with default password.");
                n++;
            }

            return account;
        }

        public List<string> ListAccount()
        {
            _accounts = AsyncHelper.RunSync(_keyStore.GetAccountsAsync);
            return _accounts;
        }

        public bool UnlockAccount(string address, string password = "")
        {
            if (password == "")
                password = DefaultPassword;

            if (_accounts == null || _accounts.Count == 0)
            {
                return false;
            }

            if (!_accounts.Contains(address))
            {
                return false;
            }

            var tryOpen = AsyncHelper.RunSync(() => _keyStore.UnlockAccountAsync(address, password, false));

            switch (tryOpen)
            {
                case KeyStoreErrors.WrongPassword:
                    break;
                case KeyStoreErrors.AccountAlreadyUnlocked:
                    return true;
                case KeyStoreErrors.None:
                    return true;
                case KeyStoreErrors.WrongAccountFormat:
                    break;
                case KeyStoreErrors.AccountFileNotFound:
                    break;
                default:
                    throw new ArgumentOutOfRangeException();
            }

            return false;
        }

        public string GetPublicKey(string address, string password = "")
        {
            if (password == "")
                password = DefaultPassword;

            UnlockAccount(address, password);
            var keyPair = GetKeyPair(address);
            return keyPair.PublicKey.ToHex();
        }

        public bool AccountIsExist(string address)
        {
            if (_accounts == null)
                ListAccount();

            return _accounts.Contains(address);
        }

        private ECKeyPair GetKeyPair(string addr)
        {
            var kp = _keyStore.GetAccountKeyPair(addr);
            return kp;
        }

        private static string AskInvisible(string prefix)
        {
            Console.WriteLine(prefix);

            var pwd = new SecureString();
            while (true)
            {
                var i = Console.ReadKey(true);
                if (i.Key == ConsoleKey.Enter) break;

                if (i.Key == ConsoleKey.Backspace)
                {
                    if (pwd.Length > 0) pwd.RemoveAt(pwd.Length - 1);
                }
                else
                {
                    pwd.AppendChar(i.KeyChar);
                }
            }

            Console.WriteLine();

            return new NetworkCredential("", pwd).Password;
        }
    }
}