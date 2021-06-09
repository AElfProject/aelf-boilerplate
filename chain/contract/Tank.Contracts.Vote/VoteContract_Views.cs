using AElf.Types;
using Google.Protobuf.WellKnownTypes;

namespace Tank.Contracts.Vote
{
    public partial class VoteContract
    {
        public override Timestamp GetDeadline(Empty input)
        {
            return State.Deadline.Value;
        }

        public override ArticleInfo GetArticleInfo(Int32Value input)
        {
            return State.ArticleInfoMap[input.Value];
        }

        public override Address GetSponsor(Empty input)
        {
            return State.Sponsor.Value;
        }
    }
}