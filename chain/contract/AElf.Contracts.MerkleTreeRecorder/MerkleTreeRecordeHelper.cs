using AElf.Types;

namespace AElf.Contracts.MerkleTreeRecorder
{
    public partial class MerkleTreeRecorder
    {
        private void AssertOwner(Address address)
        {
            Assert(State.Owner.Value == address, "No permission.");
        }
    }
}