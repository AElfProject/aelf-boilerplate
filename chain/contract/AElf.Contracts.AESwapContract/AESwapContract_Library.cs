using System;
using AElf.CSharp.Core;

namespace AElf.Contracts.AESwapContract
{
    public partial class AESwapContract
    {
        /// <summary>
        /// get equivalent amount of the other token in circumstances of this reserves of pair
        /// </summary>
        /// <param name="amountA"></param>
        /// <param name="reserveA"></param>
        /// <param name="reserveB"></param>
        /// <returns>equivalent amount of tokenB</returns>
        private long Quote(long amountA, long reserveA, long reserveB)
        {
            Assert(amountA > 0, "Insufficient Amount");
            Assert(reserveA > 0 && reserveB > 0, "Insufficient Reserves");
            var amountB = amountA.Mul(reserveB).Div(reserveA);
            return amountB;
        }

        private long GetAmountIn(long amountOut, long reserveIn, long reserveOut)
        {
            Assert(amountOut > 0, "Insufficient Output amount");
            Assert(reserveIn > 0 && reserveOut > 0 && reserveOut > amountOut, "Insufficient reserves");
            var reserveInDecimal = Convert.ToDecimal(reserveIn);
            var reserveOutDecimal = Convert.ToDecimal(reserveOut);
            var numerator = reserveInDecimal * amountOut * 1000;
            var denominator = (reserveOutDecimal - amountOut) * 997;
            var amountIn = decimal.ToInt64(numerator / denominator) + 1;
            return amountIn;
        }

        private long GetAmountOut(long amountIn, long reserveIn, long reserveOut)
        {
            Assert(amountIn > 0, "Insufficient Output amount");
            Assert(reserveIn > 0 && reserveOut > 0, "Insufficient reserves");
            var reserveInDecimal = Convert.ToDecimal(reserveIn);
            var reserveOutDecimal = Convert.ToDecimal(reserveOut);
            var amountInWithFee = amountIn.Mul(997);
            var numerator = amountInWithFee * reserveOutDecimal;
            var denominator = (reserveInDecimal * 1000) + amountInWithFee;
            var amountOut = decimal.ToInt64(numerator / denominator);
            return amountOut;
        }
    }
}