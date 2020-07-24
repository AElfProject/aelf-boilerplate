using AElf.Types;
using Google.Protobuf.WellKnownTypes;

namespace AElf.Contracts.FinanceContract
{
    public partial class FinanceContract
    {
        public override StringValue GetReserveFactor(StringValue input)
        {
            return base.GetReserveFactor(input);
        }

        public override Address GetPendingAdmin(Empty input)
        {
            return base.GetPendingAdmin(input);
        }

        public override Address GetAdmin(Empty input)
        {
            return base.GetAdmin(input);
        }

        public override StringValue GetCloseFactor(Empty input)
        {
            return base.GetCloseFactor(input);
        }

        public override StringValue GetCollateralFactor(StringValue input)
        {
            return base.GetCollateralFactor(input);
        }

        public override Int32Value GetMaxAssets(Empty input)
        {
            return base.GetMaxAssets(input);
        }

        public override StringValue GetLiquidationIncentive(Empty input)
        {
            return base.GetLiquidationIncentive(input);
        }

        public override Address GetPauseGuardian(Empty input)
        {
            return base.GetPauseGuardian(input);
        }

        public override GetInterestRateOutput GetInterestRate(StringValue input)
        {
            return base.GetInterestRate(input);
        }

        public override StringValue GetUnderlyingPrice(StringValue input)
        {
            return base.GetUnderlyingPrice(input);
        }
    }
}