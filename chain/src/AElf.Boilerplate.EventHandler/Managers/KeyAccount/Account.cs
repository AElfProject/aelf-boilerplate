using System.Threading;
using AElf.Cryptography.ECDSA;

namespace AElf.Boilerplate.EventHandler
{
    public class Account
    {
        public Account(string address)
        {
            AccountName = address;
        }

        // Close account when time out 
        public Timer LockTimer { private get; set; }
        public ECKeyPair KeyPair { get; set; }
        public string AccountName { get; }

        public void Lock()
        {
            LockTimer.Dispose();
        }
    }
}