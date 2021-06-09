using AElf.CSharp.Core;
using Google.Protobuf.WellKnownTypes;

namespace Tank.Contracts.Vote
{
    public partial class VoteContract
    {
        public override Empty AddArticleInfo(AddArticleInfoInput input)
        {
            AssertTimeout();

            var currentArticleCount = State.CurrentArticleCount.Value;
            var articleId = currentArticleCount.Add(1);
            State.CurrentArticleCount.Value = articleId;

            State.ArticleInfoMap[articleId] = new ArticleInfo
            {
                Authors = { input.Authors},
                Title = input.Title,
                Submitter = Context.Sender,
                ArticleId = articleId,
                KeyWords = { input.KeyWords}
            };
            return new Empty();
        }

        public override Empty UpdateArticleInfo(UpdateArticleInfoInput input)
        {
            AssertTimeout();

            var stateArticleInfo = State.ArticleInfoMap[input.ArticleId];
            Assert(stateArticleInfo.Submitter == Context.Sender, "Sender is not the submitter.");
            var newArticleInfo = new ArticleInfo
            {
                ArticleId = input.ArticleId,
                Title = input.Title ?? stateArticleInfo.Title
            };
            newArticleInfo.Authors.Add(input.Authors ?? stateArticleInfo.Authors);
            newArticleInfo.KeyWords.Add(input.KeyWords ?? stateArticleInfo.KeyWords);
            State.ArticleInfoMap[input.ArticleId] = newArticleInfo;
            return new Empty();
        }

        public override Empty DeleteArticleInfo(Int32Value input)
        {
            return base.DeleteArticleInfo(input);
        }
    }
}