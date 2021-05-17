using AElf.CSharp.Core;
using AElf.Sdk.CSharp;
using AElf.Types;
using Google.Protobuf.WellKnownTypes;

namespace AElf.Contracts.MerkleTreeGeneratorContract
{
    public partial class
        MerkleTreeGeneratorContract : MerkleTreeGeneratorContractContainer.MerkleTreeGeneratorContractBase
    {
        public override Empty Initialize(InitializeInput input)
        {
            Assert(State.Owner.Value == null, "Already initialized.");
            State.Owner.Value = input.Owner;
            return new Empty();
        }

        public override Empty RegisterReceiptMaker(RegisterReceiptMakerInput input)
        {
            Assert(State.Owner.Value == Context.Sender, "No permission.");
            Assert(State.ReceiptMakers[input.ReceiptMakerAddress] == null, "Already registered.");
            State.ReceiptMakers[input.ReceiptMakerAddress] = new ReceiptMaker
            {
                ReceiptMakerAddress = input.ReceiptMakerAddress,
                MerkleTreeLeafLimit = input.MerkleTreeLeafLimit
            };
            Context.Fire(new ReceiptMakerRegistered
            {
                ReceiptMakerAddress = input.ReceiptMakerAddress
            });
            return new Empty();
        }

        public override Empty UnRegisterReceiptMaker(Address input)
        {
            Assert(State.Owner.Value == Context.Sender, "No permission.");
            Assert(State.ReceiptMakers[input] != null, "Not registered.");
            State.ReceiptMakers.Remove(input);
            Context.Fire(new ReceiptMakerUnRegistered
            {
                ReceiptMakerAddress = input
            });
            return new Empty();
        }

        public override GetMerkleTreeOutput GetMerkleTree(GetMerkleTreeInput input)
        {
            Assert(State.ReceiptMakers[input.ReceiptMakerAddress] != null, "Not registered.");
            var generator = State.ReceiptMakers[input.ReceiptMakerAddress];
            var merkleTree = ConstructMerkleTree(generator.ReceiptMakerAddress, input.ExpectedFullTreeIndex,
                generator.MerkleTreeLeafLimit);
            return new GetMerkleTreeOutput
            {
                MerkleTreeRoot = merkleTree.MerkleTreeRoot,
                FirstIndex = merkleTree.FirstLeafIndex,
                LastIndex = merkleTree.LastLeafIndex,
                IsFullTree = merkleTree.IsFullTree
            };
        }

        public override Int64Value GetFullTreeCount(Address input)
        {
            var maker = State.ReceiptMakers[input];
            Assert(maker != null, "Not registered.");
            var receiptCount = GetReceiptCount(input);
            return new Int64Value {Value = receiptCount.Div(maker.MerkleTreeLeafLimit)};
        }

        public override GetReceiptMakerOutput GetReceiptMaker(Address input)
        {
            var maker = State.ReceiptMakers[input];
            return new GetReceiptMakerOutput
            {
                ReceiptMakerAddress = maker.ReceiptMakerAddress,
                MerkleTreeLeafLimit = maker.MerkleTreeLeafLimit
            };
        }

        public override MerklePath GetMerklePath(GetMerklePathInput input)
        {
            var maker = State.ReceiptMakers[input.ReciptMaker];
            Assert(maker != null, "Not registered.");
            Assert(input.LastLeafIndex >= input.ReceiptId && input.LastLeafIndex >= input.FirstLeafIndex, "Invalid merkle input.");

            var binaryMerkleTree = GenerateMerkleTree(input.ReciptMaker, input.FirstLeafIndex, input.LastLeafIndex);
            var index = (int) input.ReceiptId.Sub(input.FirstLeafIndex);
            var path = binaryMerkleTree.GenerateMerklePath(index);
            return path;
        }
    }
}