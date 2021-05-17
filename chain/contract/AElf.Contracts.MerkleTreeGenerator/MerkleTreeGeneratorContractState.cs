using AElf.Sdk.CSharp.State;
using AElf.Types;

namespace AElf.Contracts.MerkleTreeGeneratorContract
{
    public class MerkleTreeGeneratorContractState : ContractState
    {
        public SingletonState<Address> Owner { get; set; }
        public MappedState<Address, ReceiptMaker> ReceiptMakers { get; set; }
    }
}