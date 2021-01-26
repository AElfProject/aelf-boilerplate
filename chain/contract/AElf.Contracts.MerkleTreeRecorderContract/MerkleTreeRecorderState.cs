using AElf.Sdk.CSharp.State;
using AElf.Standards.ACS1;
using AElf.Types;
using MTRecorder;

namespace AElf.Contracts.MerkleTreeRecorderContract
{
    public class MerkleTreeRecorderContractState : ContractState
    {
        public SingletonState<Address> Owner { get; set; }

        public Int64State MerkleTreeRecorderCount { get; set; }

        public MappedState<long, Recorder> Recorder { get; set; }

        public MappedState<long, long, MerkleTree> SatisfiedMerkleTrees { get; set; }
        public MappedState<long, long, MerkleTree> UnSatisfiedMerkleTrees { get; set; }
        public MappedState<long, long> LastRecordedLeafIndex { get; set; }

        public MappedState<long, long> SatisfiedMerkleTreeCount { get; set; }

        public MappedState<string, MethodFees> TransactionFees { get; set; }
        public SingletonState<AuthorityInfo> MethodFeeController { get; set; }
    }
}