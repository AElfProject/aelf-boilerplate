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
            Assert(amountA>0,"Insufficient Amount");
            Assert(reserveA>0&& reserveB>0,"Insufficient Reserves");
            var amountB = amountA.Mul(reserveB).Div(reserveA);
            return amountB;
        }
    }
}