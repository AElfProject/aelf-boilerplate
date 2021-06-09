using AElf.Sdk.CSharp;
using Google.Protobuf.WellKnownTypes;

namespace Tank.Contracts.Vote
{
    /// <summary>
    /// The C# implementation of the contract defined in tank_vote_contract.proto that is located in the "protobuf"
    /// folder.
    /// Notice that it inherits from the protobuf generated code. 
    /// </summary>
    public partial class VoteContract : VoteContractContainer.VoteContractBase
    {
        public override Empty Initialize(InitializeInput input)
        {
            Assert(!State.IsInitialized.Value, "Already initialized.");
            State.IsInitialized.Value = true;
            State.TokenContract.Value =
                Context.GetContractAddressByName(SmartContractConstants.TokenContractSystemName);

            State.Sponsor.Value = input.Sponsor;
            State.MaxReviewCount.Value = input.MaxReviewCount;
            State.Deadline.Value = input.Deadline;
            return new Empty();
        }

        public override Empty Assignment(AssignmentInput input)
        {
            AssertTimeout();
            Assert(input.ArticleIds.Count <= State.MaxReviewCount.Value, "Article count exceeded.");
            foreach (var articleId in input.ArticleIds)
            {
                State.CommentMap[input.Reviewer][articleId] = new Comment
                {
                    ArticleId = articleId
                };
            }
            return new Empty();
        }

        public override Empty Comment(CommentInput input)
        {
            AssertTimeout();
            var comment = State.CommentMap[Context.Sender][input.ArticleId];
            Assert(comment.ArticleId > 0, "Assignment not found.");
            comment.Comment_ = input.Comment;
            comment.Score = input.Score;
            comment.CommentTime = Context.CurrentBlockTime;
            State.CommentMap[Context.Sender][input.ArticleId] = comment;
            return new Empty();
        }

        private void AssertTimeout()
        {
            Assert(Context.CurrentBlockTime < State.Deadline.Value, "Deadline passed.");
        }
    }
}