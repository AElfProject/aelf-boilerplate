using AElf.Types;

namespace AElf.Contracts.MerkleTreeRecorderContract
{
    public partial class MerkleTreeRecorderContract
    {
        private void AssertOwner(Address address, string message = null)
        {
            Assert(State.Owner.Value == address, message ?? "No permission.");
        }
    }
}