using System;
using AElf.Sdk.CSharp.State;
using AElf.Types;
using Google.Protobuf.WellKnownTypes;

namespace Tank.Contracts.Vote
{
    /// <summary>
    /// The state class of the contract, it inherits from the AElf.Sdk.CSharp.State.ContractState type. 
    /// </summary>
    public partial class VoteContractState : ContractState
    {
        public BoolState IsInitialized { get; set; }

        public SingletonState<Address> Sponsor { get; set; }

        public Int32State CurrentArticleCount { get; set; }

        public MappedState<int, ArticleInfo> ArticleInfoMap { get; set; }

        public MappedState<Address, bool> IsReviewerMap { get; set; }

        public Int32State MaxReviewCount { get; set; }

        /// <summary>
        /// Reviewer Address -> Article Id -> Comment
        /// </summary>
        public MappedState<Address, int, Comment> CommentMap { get; set; }

        public SingletonState<Timestamp> Deadline { get; set; }
    }
}