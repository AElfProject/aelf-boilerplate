using AElf.Types;
using Google.Protobuf.WellKnownTypes;

namespace Tank.Contracts.Vote
{
    public partial class VoteContract
    {
        public override Empty AddReviewer(AddReviewerInput input)
        {
            AssertTimeout();

            Assert(Context.Sender == State.Sponsor.Value, "No permission.");
            State.IsReviewerMap[input.Reviewer] = true;
            return new Empty();
        }

        public override Empty DeleteReviewer(Address input)
        {
            AssertTimeout();

            Assert(Context.Sender == State.Sponsor.Value, "No permission.");
            State.IsReviewerMap.Remove(input);
            return new Empty();
        }
    }
}