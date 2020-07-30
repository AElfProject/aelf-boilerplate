namespace AElf.Contracts.FinanceContract
{
    public partial class FinanceContract
    {
        /// <summary>
        /// Maximum borrow rate that can ever be applied (.0005% / block)
        /// </summary>
        public const string MaxBorrowRate = "0.005";

        /// <summary>
        /// Maximum fraction of interest that can be set aside for reserves
        /// </summary>
        public const string MaxReserveFactor = "1.00";

        /// <summary>
        /// The approximate number of blocks per year that is assumed by the interest rate model
        /// </summary>
        public const int BlocksPerYear = 63072000; //2 * 60 * 60 * 24 * 365

        // closeFactorMantissa must be strictly greater than this value
        public const string MinCloseFactor = "0.05"; // 0.05

        // closeFactorMantissa must not exceed this value
        public const string MaxCloseFactor = "0.9"; // 0.9

        // No collateralFactorMantissa may exceed this value
        public const string MaxCollateralFactor = "0.9"; // 0.9

        // liquidationIncentiveMantissa must be no less than this value
        public const string MinLiquidationIncentive = "1"; // 1.0

        // liquidationIncentiveMantissa must be no greater than this value
        public const string MaxLiquidationIncentive = "1.5"; // 1.5

        public const int CTokenDecimals = 18;
    }
}