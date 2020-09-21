using System;

namespace AElf.Contracts.FinanceContract
{
    public partial class FinanceContract
    {
        /// <summary>
        /// Maximum borrow rate that can ever be applied (0.000016% / block)
        /// </summary>
        public const long MaxBorrowRate = 1600000000;

        /// <summary>
        /// Maximum fraction of interest that can be set aside for reserves
        /// </summary>
        public const int MaxReserveFactor = 100000000;

        /// <summary>
        /// The approximate number of blocks per year that is assumed by the interest rate model
        /// </summary>
        public const int BlocksPerYear = 63072000; //2 * 60 * 60 * 24 * 365

        // closeFactorMantissa must be strictly greater than this value
        public const int MinCloseFactor = 5000000; // 0.05

        // closeFactorMantissa must not exceed this value
        public const int MaxCloseFactor = 90000000; // 0.9

        // No collateralFactorMantissa may exceed this value
        public const int MaxCollateralFactor = 90000000; // 0.9

        // liquidationIncentiveMantissa must be no less than this value
        public const int MinLiquidationIncentive = 100000000; // 1.0

        // liquidationIncentiveMantissa must be no greater than this value
        public const int MaxLiquidationIncentive = 150000000; // 1.5

        public const long InitialBorrowIndex = 10000000000000000;

        public const long ExpandScale = 100000000;

        public const long DoubleExpandScale = 10000000000000000;
    }
}