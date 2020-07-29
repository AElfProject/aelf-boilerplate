using System.IO;
using AElf.Boilerplate.TestBase;
using AElf.ContractTestKit;
using AElf.Cryptography.ECDSA;
using AElf.Kernel;
using AElf.Types;
using Volo.Abp.Threading;

namespace AElf.Contracts.FinanceContract
{
    public class FinanceContractTestBase : ContractTestBase<FinanceContractTestModule>
    {
        internal Address financeContractAddress;
        internal FinanceContractContainer.FinanceContractStub GetFinanceContractStub(ECKeyPair senderKeyPair)
        {
            return GetTester<FinanceContractContainer.FinanceContractStub>(financeContractAddress, senderKeyPair);
        }
        
        // You can get address of any contract via GetAddress method, for example:
        // internal Address DAppContractAddress => GetAddress(DAppSmartContractAddressNameProvider.StringName);
        public FinanceContractTestBase()
        {
            financeContractAddress= AsyncHelper.RunSync(()=>DeployContractAsync(KernelConstants.DefaultRunnerCategory,
                File.ReadAllBytes(typeof( FinanceContract).Assembly.Location), null, SampleAccount.Accounts[0].KeyPair));
        }
    }
   

}