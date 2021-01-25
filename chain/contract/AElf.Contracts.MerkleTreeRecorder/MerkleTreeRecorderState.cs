using AElf.Sdk.CSharp.State;
using AElf.Types;
using Google.Protobuf.WellKnownTypes;
using MTRecorder;

namespace AElf.Contracts.MerkleTreeRecorder
{
    public class MerkleTreeRecorderState : ContractState
    {
        public SingletonState<Address> Owner
        {
            get;
            set;
        }
        
        public Int64Value MerkleTreeRecorderCount { get; set; }
        
        public MappedState<long, Recorder> Recorder { get; set; }
        
        public MappedState<long, long, MerkleTree> SatisfiedMerkleTrees { get; set; }
        public MappedState<long, long, MerkleTree> UnSatisfiedMerkleTrees { get; set; }
        public MappedState<long, long> LastRecordedLeafIndex { get; set; }

        public MappedState<long, long> SatisfiedMerkleTreeCount { get; set; }
    }
}