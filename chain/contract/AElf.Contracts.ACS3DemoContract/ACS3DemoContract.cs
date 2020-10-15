using System.Linq;
using AElf.Standards.ACS3;
using AElf.Contracts.MultiToken;
using AElf.Sdk.CSharp;
using AElf.Types;
using Google.Protobuf.WellKnownTypes;

namespace AElf.Contracts.ACS3DemoContract
{
    /// <summary>
    /// You can achieve an authorization model via implementing ACS3.
    /// Here only provide some basic methods implementations.
    /// For more demos of ACS3, check Association Contract, Referendum Contract and Parliament Contract
    /// in AElf repo.
    /// </summary>
    public class ACS3DemoContract : ACS3DemoContractContainer.ACS3DemoContractBase
    {
        public override Empty Initialize(Empty input)
        {
            State.TokenContract.Value =
                Context.GetContractAddressByName(SmartContractConstants.TokenContractSystemName);
            State.ProposalReleaseThreshold.Value = new ProposalReleaseThreshold
            {
                MinimalApprovalThreshold = 1,
                MinimalVoteThreshold = 1
            };
            return new Empty();
        }

        public override Hash CreateProposal(CreateProposalInput input)
        {
            var proposalId = Context.GenerateId(Context.Self, input.Token);
            Assert(State.Proposals[proposalId] == null, "Proposal with same token already exists.");
            State.Proposals[proposalId] = new ProposalInfo
            {
                ProposalId = proposalId,
                Proposer = Context.Sender,
                ContractMethodName = input.ContractMethodName,
                Params = input.Params,
                ExpiredTime = input.ExpiredTime,
                ToAddress = input.ToAddress,
                ProposalDescriptionUrl = input.ProposalDescriptionUrl
            };
            return proposalId;
        }

        public override Empty Abstain(Hash input)
        {
            Charge();
            var proposal = State.Proposals[input];
            if (proposal == null)
            {
                throw new AssertionException("Proposal not found.");
            }

            proposal.Abstentions.Add(Context.Sender);
            State.Proposals[input] = proposal;
            return new Empty();
        }

        public override Empty Approve(Hash input)
        {
            Charge();
            var proposal = State.Proposals[input];
            if (proposal == null)
            {
                throw new AssertionException("Proposal not found.");
            }

            proposal.Approvals.Add(Context.Sender);
            State.Proposals[input] = proposal;
            return new Empty();
        }

        public override Empty Reject(Hash input)
        {
            Charge();
            var proposal = State.Proposals[input];
            if (proposal == null)
            {
                throw new AssertionException("Proposal not found.");
            }

            proposal.Rejections.Add(Context.Sender);
            State.Proposals[input] = proposal;
            return new Empty();
        }

        private void Charge()
        {
            State.TokenContract.TransferFrom.Send(new TransferFromInput
            {
                From = Context.Sender,
                To = Context.Self,
                Symbol = Context.Variables.NativeSymbol,
                Amount = 1_00000000
            });
        }

        public override Empty Release(Hash input)
        {
            var proposal = State.Proposals[input];
            if (proposal == null)
            {
                throw new AssertionException("Proposal not found.");
            }
            Assert(IsReleaseThresholdReached(proposal), "Didn't reach release threshold.");
            Context.SendInline(proposal.ToAddress, proposal.ContractMethodName, proposal.Params);
            return new Empty();
        }

        private bool IsReleaseThresholdReached(ProposalInfo proposal)
        {
            var isRejected = IsProposalRejected(proposal);
            if (isRejected)
                return false;

            var isAbstained = IsProposalAbstained(proposal);
            return !isAbstained && CheckEnoughVoteAndApprovals(proposal);
        }

        private bool IsProposalRejected(ProposalInfo proposal)
        {
            var rejectionMemberCount = proposal.Rejections.Count;
            return rejectionMemberCount > State.ProposalReleaseThreshold.Value.MaximalRejectionThreshold;
        }

        private bool IsProposalAbstained(ProposalInfo proposal)
        {
            var abstentionMemberCount = proposal.Abstentions.Count;
            return abstentionMemberCount > State.ProposalReleaseThreshold.Value.MaximalAbstentionThreshold;
        }

        private bool CheckEnoughVoteAndApprovals(ProposalInfo proposal)
        {
            var approvedMemberCount = proposal.Approvals.Count;
            var isApprovalEnough =
                approvedMemberCount >= State.ProposalReleaseThreshold.Value.MinimalApprovalThreshold;
            if (!isApprovalEnough)
                return false;

            var isVoteThresholdReached =
                proposal.Abstentions.Concat(proposal.Approvals).Concat(proposal.Rejections).Count() >=
                State.ProposalReleaseThreshold.Value.MinimalVoteThreshold;
            return isVoteThresholdReached;
        }

        public override StringValue GetSlogan(Empty input)
        {
            return State.Slogan.Value == null ? new StringValue() : new StringValue {Value = State.Slogan.Value};
        }

        public override Empty SetSlogan(StringValue input)
        {
            Assert(Context.Sender == Context.Self, "No permission.");
            State.Slogan.Value = input.Value;
            return new Empty();
        }
    }
}