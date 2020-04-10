using AElf.Contracts.Association;
using AElf.Contracts.MultiToken;
using AElf.Types;
using Google.Protobuf;
using Google.Protobuf.WellKnownTypes;

namespace AElf.Contracts.DAOContract
{
    // ReSharper disable InconsistentNaming
    public partial class DAOContract
    {
        public override Empty ProposeJoin(StringValue input)
        {
            AssertReleasedByParliament();
            State.TokenContract.TransferFrom.Send(new TransferFromInput
            {
                From = Context.Sender,
                To = Context.Self,
                Symbol = State.DepositSymbol.Value,
                Amount = State.DepositAmount.Value
            });
            var memberList = State.DAOMemberList.Value;
            var joinAddress = Address.FromPublicKey(ByteArrayHelper.HexStringToByteArray(input.Value));
            memberList.Value.Add(joinAddress);
            SelfProposalProcess(nameof(State.AssociationContract.ChangeOrganizationMember), new OrganizationMemberList
            {
                OrganizationMembers = {memberList.Value}
            }.ToByteString());
            State.DAOMemberList.Value = memberList;
            AdjustApprovalThreshold();
            return new Empty();
        }

        public override Empty Quit(StringValue input)
        {
            State.TokenContract.Transfer.Send(new TransferInput
            {
                To = Context.Sender,
                Symbol = State.DepositSymbol.Value,
                Amount = State.DepositAmount.Value
            });
            var memberList = State.DAOMemberList.Value;
            var quitAddress = Address.FromPublicKey(ByteArrayHelper.HexStringToByteArray(input.Value));
            Assert(memberList.Value.Contains(quitAddress), $"DAO Member {input.Value} not found.");
            memberList.Value.Remove(quitAddress);
            SelfProposalProcess(nameof(State.AssociationContract.ChangeOrganizationMember), new OrganizationMemberList
            {
                OrganizationMembers = {memberList.Value}
            }.ToByteString());
            AdjustApprovalThreshold();
            return new Empty();
        }

        public override Empty ProposeExpel(StringValue input)
        {
            AssertReleasedByParliament();
            var memberList = State.DAOMemberList.Value;
            var quitAddress = Address.FromPublicKey(ByteArrayHelper.HexStringToByteArray(input.Value));
            Assert(memberList.Value.Contains(quitAddress), $"DAO Member {input.Value} not found.");
            memberList.Value.Remove(quitAddress);
            SelfProposalProcess(nameof(State.AssociationContract.ChangeOrganizationMember), new OrganizationMemberList
            {
                OrganizationMembers = {memberList.Value}
            }.ToByteString());
            AdjustApprovalThreshold();
            return new Empty();
        }
    }
}