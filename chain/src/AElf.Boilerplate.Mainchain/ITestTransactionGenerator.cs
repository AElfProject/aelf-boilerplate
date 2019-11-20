using System.Collections.Generic;
using System.Threading.Tasks;
using AElf.Kernel.Miner.Application;
using AElf.Types;

namespace AElf.Boilerplate.MainChain
{
    public interface ITestTransactionGenerator : ISystemTransactionGenerator
    {
        bool IsAddTransaction(long blockHeight);
    }
}