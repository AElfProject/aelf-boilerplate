using System.IO;
using System.Threading.Tasks;
using Acs0;
using AElf.ContractTestBase.ContractTestKit;
using AElf.Cryptography.ECDSA;
using AElf.Kernel;
using AElf.Kernel.SmartContract.Application;
using AElf.Types;
using Google.Protobuf;
using Microsoft.Extensions.DependencyInjection;
using Volo.Abp.Threading;

namespace AElf.Contracts.FinanceContract
{
    public class FinanceContractTestBase : ContractTestBase<FinanceContractTestModule>
    {
        internal Address FinanceContractAddress;
        internal FinanceContractContainer.FinanceContractStub GetFinanceContractStub(ECKeyPair senderKeyPair)
        {
            return GetTester<FinanceContractContainer.FinanceContractStub>(FinanceContractAddress, senderKeyPair);
        }
        
        // You can get address of any contract via GetAddress method, for example:
        // internal Address DAppContractAddress => GetAddress(DAppSmartContractAddressNameProvider.StringName);
        public FinanceContractTestBase()
        {
            FinanceContractAddress= AsyncHelper.RunSync(()=>DeployContractAsync(KernelConstants.DefaultRunnerCategory,
                File.ReadAllBytes(typeof( FinanceContract).Assembly.Location), SampleAccount.Accounts[0].KeyPair));
        }
        
        private async Task<Address> DeployContractAsync(int category, byte[] code, ECKeyPair keyPair)
        {
            var addressService = Application.ServiceProvider.GetRequiredService<ISmartContractAddressService>();
            var stub = GetTester<ACS0Container.ACS0Stub>(addressService.GetZeroSmartContractAddress(),
                keyPair);
            var executionResult = await stub.DeploySmartContract.SendAsync(new ContractDeploymentInput
            {
                Category = category,
                Code = ByteString.CopyFrom(code)
            });
            return executionResult.Output;
        }
    }
   

}