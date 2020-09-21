using System;
using System.Globalization;
using Google.Protobuf.WellKnownTypes;

namespace AElf.Contracts.FinanceContract
{
    public static class DecimalExtensions
    {
         private  const long  ExpandScale = 100000000;
         private  const long  DoubleExpandScale = 10000000000000000;
         
        public static string ToInvariantString(this decimal value)
        {
            value /= 1.000000000000000000000000000000000m;
            return value.ToString(CultureInfo.InvariantCulture);
        }

        /// <summary>
        /// div 100000000 for calculate
        /// </summary>
        /// <param name="value"></param>
        /// <returns></returns>
        public static decimal ToDecimal(this int value)
        {
            
            return Convert.ToDecimal(value)/ ExpandScale;
        }

        /// <summary>
        /// div 10000000000000000 for calculate
        /// </summary>
        /// <param name="value"></param>
        /// <returns></returns>
        public static decimal ToDecimal(this long value)
        {
            return Convert.ToDecimal(value) / DoubleExpandScale;
        }
    }
}