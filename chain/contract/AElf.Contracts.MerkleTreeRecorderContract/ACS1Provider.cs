using AElf.Standards.ACS1;
using Google.Protobuf.WellKnownTypes;

namespace AElf.Contracts.MerkleTreeRecorderContract
{
    public partial class MerkleTreeRecorderContract
    {
        public override Empty ChangeMethodFeeController(AuthorityInfo input)
        {
            Assert(Context.Sender == GetMethodFeeController(new Empty()).OwnerAddress,
                "Only MethodFeeController can change method fee controller.");

            State.MethodFeeController.Value = input;

            return new Empty();
        }

        public override Empty SetMethodFee(MethodFees input)
        {
            Assert(Context.Sender == GetMethodFeeController(new Empty()).OwnerAddress,
                "Only MethodFeeController can set method fee.");

            State.TransactionFees[input.MethodName] = input;

            return new Empty();
        }

        public override MethodFees GetMethodFee(StringValue input)
        {
            return State.TransactionFees[input.Value];
        }

        public override AuthorityInfo GetMethodFeeController(Empty input)
        {
            return State.MethodFeeController.Value ?? new AuthorityInfo
                {OwnerAddress = State.Owner.Value};
        }
    }
}