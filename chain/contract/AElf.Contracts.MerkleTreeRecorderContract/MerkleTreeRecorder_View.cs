using AElf.CSharp.Core;
using AElf.Sdk.CSharp;
using AElf.Types;
using Google.Protobuf.WellKnownTypes;
using MTRecorder;

namespace AElf.Contracts.MerkleTreeRecorderContract
{
    public partial class MerkleTreeRecorderContract
    {
        [View]
        public override GetLeafLocatedMerkleTreeOutput GetLeafLocatedMerkleTree(GetLeafLocatedMerkleTreeInput input)
        {
            var leafIndex = input.LeafIndex;
            var recorder = State.Recorder[input.RecorderId];

            var lastRecordedLeafIndex =
                GetLastRecordedLeafIndex(new RecorderIdInput {RecorderId = input.RecorderId}).Value;

            Assert(leafIndex >= 0 && lastRecordedLeafIndex >= leafIndex, "Not recorded yet.");

            var satisfiedMerkleTreeIndex = leafIndex.Div(recorder.MaximalLeafCount);
            var merkleTree = satisfiedMerkleTreeIndex < State.SatisfiedMerkleTreeCount[input.RecorderId]
                ? State.SatisfiedMerkleTrees[input.RecorderId][satisfiedMerkleTreeIndex]
                : State.UnSatisfiedMerkleTrees[input.RecorderId][lastRecordedLeafIndex % recorder.MaximalLeafCount];
            return new GetLeafLocatedMerkleTreeOutput
            {
                FirstLeafIndex = merkleTree.FirstLeafIndex,
                LastLeafIndex = merkleTree.LastLeafIndex,
                TreeIndex = merkleTree.LastLeafIndex
            };
        }

        [View]
        public override MerkleTree GetMerkleTree(GetMerkleTreeInput input)
        {
            var lastLeafIndex = input.LastLeafIndex;
            var lastRecordedLeafIndex = State.LastRecordedLeafIndex[input.RecorderId];

            Assert(lastLeafIndex >= 0 && lastRecordedLeafIndex >= lastLeafIndex, "Not recorded yet.");

            var recorder = State.Recorder[input.RecorderId];
            var satisfiedMerkleTreeIndex = lastLeafIndex.Div(recorder.MaximalLeafCount);

            if (satisfiedMerkleTreeIndex < State.SatisfiedMerkleTreeCount[input.RecorderId])
                return State.SatisfiedMerkleTrees[input.RecorderId][satisfiedMerkleTreeIndex];

            var unSatisfied = State.UnSatisfiedMerkleTrees[input.RecorderId][lastLeafIndex % recorder.MaximalLeafCount];
            Assert(unSatisfied != null && unSatisfied.LastLeafIndex == lastLeafIndex,
                "Tree not recorded.");
            return unSatisfied;
        }

        [View]
        public override BoolValue MerkleProof(MerkleProofInput input)
        {
            var merkleTree = GetMerkleTree(new GetMerkleTreeInput()
            {
                LastLeafIndex = input.LastLeafIndex,
                RecorderId = input.RecorderId
            });

            var computed = input.MerklePath.ComputeRootWithLeafNode(input.LeafNode);
            return new BoolValue
            {
                Value = computed == merkleTree.MerkleTreeRoot
            };
        }

        [View]
        public override Address GetOwner(Empty input)
        {
            return State.Owner.Value;
        }

        [View]
        public override Recorder GetRecorder(RecorderIdInput input)
        {
            return State.Recorder[input.RecorderId];
        }

        [View]
        public override Int64Value GetRecorderCount(Empty input)
        {
            return new Int64Value {Value = State.MerkleTreeRecorderCount.Value};
        }

        [View]
        public override Int64Value GetLastRecordedLeafIndex(RecorderIdInput input)
        {
            var lastRecordedLeafIndex = State.Recorder[input.RecorderId] == null
                ? -2 // recorder not created
                : State.LastRecordedLeafIndex[input.RecorderId];

            return new Int64Value {Value = lastRecordedLeafIndex};
        }

        [View]
        public override Int64Value GetSatisfiedTreeCount(RecorderIdInput input)
        {
            return new Int64Value {Value = State.SatisfiedMerkleTreeCount[input.RecorderId]};
        }
    }
}