namespace AElf.Contracts.Oracle
{
    public partial class OracleContractTests
    {
        private const string TokenSymbol = "AELINK";
        
        private const int DefaultExpirationSeconds = 300;

        private const long DefaultClearRedundantRevenue = 10000000;

        private const int DefaultThresholdResponses = 3;

        private const int DefaultThresholdToUpdateData = 2;

        private const int DefaultMinimumAvailableNodesCount = 3;

        private const long DefaultMinimumEscrow = 1_000_00000000;
        
    }
}