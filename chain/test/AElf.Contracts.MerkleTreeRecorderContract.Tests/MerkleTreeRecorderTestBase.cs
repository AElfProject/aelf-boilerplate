using System.Threading.Tasks;
using AElf.ContractTestBase.ContractTestKit;
using AElf.Cryptography.ECDSA;
using AElf.Kernel;
using AElf.Kernel.Blockchain.Application;
using AElf.Kernel.SmartContract.Application;
using AElf.Types;
using Google.Protobuf.WellKnownTypes;
using Microsoft.Extensions.DependencyInjection;
using MTRecorder;
using Volo.Abp.Threading;

namespace AElf.Contracts.MerkleTreeRecorderContract
{
    public class MerkleTreeRecorderTestBase : ContractTestBase<MerkleTreeRecorderContractTestModule>
    {
        internal MerkleTreeRecorderContractContainer.MerkleTreeRecorderContractStub MerkleTreeRecorderContractStub;
        protected Address MerkleTreeRecorderContractAddress => GetAddress(MerkleTreeRecorderContractNameProvider.StringName);
        protected ECKeyPair DefaultSenderKeyPair => SampleAccount.Accounts[0].KeyPair;

        public MerkleTreeRecorderTestBase()
        {
            MerkleTreeRecorderContractStub = GetMerkleTreeRecorderContractStub(DefaultSenderKeyPair);
        }
        
        internal MerkleTreeRecorderContractContainer.MerkleTreeRecorderContractStub GetMerkleTreeRecorderContractStub(ECKeyPair ecKeyPair)
        {
            return GetTester<MerkleTreeRecorderContractContainer.MerkleTreeRecorderContractStub>(MerkleTreeRecorderContractAddress, ecKeyPair);
        }
        
        private Address GetAddress(string contractStringName)
        {
            var addressService = Application.ServiceProvider.GetRequiredService<ISmartContractAddressService>();
            var blockchainService = Application.ServiceProvider.GetRequiredService<IBlockchainService>();
            var chain = AsyncHelper.RunSync(blockchainService.GetChainAsync);
            var address = AsyncHelper.RunSync(() => addressService.GetSmartContractAddressAsync(new ChainContext
            {
                BlockHash = chain.BestChainHash,
                BlockHeight = chain.BestChainHeight
            }, contractStringName)).SmartContractAddress.Address;
            return address;
        }

        protected async Task InitializeAsync()
        {
            await MerkleTreeRecorderContractStub.Initialize.SendAsync(new Empty());
        }

        protected async Task CreateRecorderAsync(Address admin, long maximalLeafCount)
        {
            await InitializeAsync();
            await MerkleTreeRecorderContractStub.CreateRecorder.SendAsync(new Recorder
            {
                Admin = admin,
                MaximalLeafCount = maximalLeafCount
            });
        }
    }
}