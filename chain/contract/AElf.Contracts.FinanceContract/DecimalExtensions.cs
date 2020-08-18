using System.Globalization;

namespace AElf.Contracts.FinanceContract
{
    public static class DecimalExtensions
    {
        public static string ToInvariantString(this decimal value)
        {
            value /= 1.000000000000000000000000000000000m;
            return value.ToString(CultureInfo.InvariantCulture);
        }
    }
}