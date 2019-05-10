using System.IO;
using AElf;
using AElf.Contracts.Genesis;
using AElf.Contracts.TestKit;
using AElf.Kernel;
using AElf.OS.Node.Application;
using Google.Protobuf;
using Google.Protobuf.WellKnownTypes;
using Volo.Abp.Threading;

namespace BingoGameContract.Test 
{
    public class BingoGameContractTestBase : ContractTestBase<BingoGameContractTestModule>
    {
      
        protected Address BingoGameContractAddress { get; set; }

        public BingoGameContractTestBase()
        {

        }

        private SystemContractDeploymentInput.Types.SystemTransactionMethodCallList GenerateTransactionMethodCallList()
        {
            var callList = new SystemContractDeploymentInput.Types.SystemTransactionMethodCallList();
            return callList;
        }
    }
}