using AElf.Contracts.MultiToken;

namespace Tank.Contracts.Vote
{
    public partial class VoteContractState
    {
        internal TokenContractContainer.TokenContractReferenceState TokenContract { get; set; }
    }
}