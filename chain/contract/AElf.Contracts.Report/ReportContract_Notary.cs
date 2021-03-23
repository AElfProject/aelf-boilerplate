using Google.Protobuf.WellKnownTypes;

namespace AElf.Contracts.Report
{
    public partial class ReportContract
    {
        public override Empty ApplyNotary(ApplyNotaryInput input)
        {
            return new Empty();
        }

        public override Empty QuitNotary(QuitNotaryInput input)
        {
            return new Empty();
        }

        public override Empty VoteNotary(VoteNotaryInput input)
        {
            return new Empty();
        }
    }
}