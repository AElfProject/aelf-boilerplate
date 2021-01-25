using AElf.CSharp.Core;
using MTRecorder;

namespace AElf.Contracts.MerkleTreeRecorder
{
    public partial class MerkleTreeRecorder
    {
        public override MerkleTree GetLeafLocatedMerkleTree(GetLeafLocatedMerkleTreeInput input)
        {
            var leafIndex = input.LeafIndex;
            var lastRecordedLeafIndex = State.LastRecordedLeafIndex[input.RecorderId];

            if (lastRecordedLeafIndex < input.LeafIndex)
                return new MerkleTree(); // not recorded

            var recorder = State.Recorder[input.RecorderId];
            var satisfiedMerkleTreeIndex = leafIndex.Div(recorder.MaximalLeafCount);
            return satisfiedMerkleTreeIndex < State.SatisfiedMerkleTreeCount[input.RecorderId]
                ? State.SatisfiedMerkleTrees[input.RecorderId][satisfiedMerkleTreeIndex]
                : State.UnSatisfiedMerkleTrees[input.LeafIndex][lastRecordedLeafIndex % recorder.MaximalLeafCount];
        }
    }
}