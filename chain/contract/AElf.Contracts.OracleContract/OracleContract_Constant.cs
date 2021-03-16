namespace AElf.Contracts.OracleContract
{
    public partial class OracleContract
    {
        private const string TokenSymbol = "AELINK";
        private const string TokenName = "AelfLinK";
        private const long TotalSupply = 100_000_000_00000000;

        private const int DefaultExpirationSeconds = 3600;

        private const long DefaultClearRedundantRevenue = 10000000;

        private const int DefaultThresholdResponses = 9;

        private const int DefaultThresholdToUpdateData = 6;

        private const int DefaultMinimumAvailableNodesCount = 15;

        private const long DefaultMinimumEscrow = 1_000_00000000;
    }
}