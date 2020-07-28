using System.Globalization;

namespace AElf.Contracts.FinanceContract
{
    public static class DecimalExtensions
    {
        public static string ToInvariantString(this decimal value)
        {
            return value.ToString(CultureInfo.InvariantCulture).TrimEnd('0');
        }
    }
}