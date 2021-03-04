namespace AElf.Contracts.OracleContract
{
    public partial class OracleContract
    {
        public const string TokenSymbol = "AELINK";

        // seconds
        public const long DefaultExpirationTime = 300;

        public const long DefaultClearRedundantRevenue = 1_00000000;

        public const int DefaultThresholdResponses = 9;

        public const int DefaultThresholdToUpdateData = 6;

        public const long DefaultMinimumEscrow = 1_000_00000000;
    }
}