using AElf;
using Google.Protobuf.WellKnownTypes;
using System;

namespace BingoGameContract
{
    public class BingoGameContract : BingoGameContractContainer.BingoGameContractBase
    {

        public override BingoWin SendBingoCard(BingoCard card) => new BingoWin()
        {
            Value = Contrast(card.Value.ToByteArray(), GetWinNum())
        };



        protected virtual byte[] GetWinNum()
        {
            var aelfHash =State
                            .BasicContractZero.
                                GetContractHash.Call(State.BasicContractZero.Value);

            var hash = aelfHash.DumpByteArray();
 
            var result = new byte[5];
            var i = 0;
            foreach (var item in hash)
            {
                if (item != 0)
                {
                    result[i] = (byte)(item % 16 + 15 * i);
                    ++i;
                    if (i == 5) break;
                }
            }
            return result;
        }

        private bool Contrast(byte[] cardBytes, byte[] winNumber)
        {
            if (cardBytes.Length != 25)
            {
                return false;
            }

            var flag = 0;

            for (int i = 0; i < 5; i++)
            {
                for (int j = 0; j <= 20; j += 5)
                {
                    if (cardBytes[i + j] == winNumber[i])
                    {
                        flag <<= 1;
                    }
                }
            }

            return flag == 16;
        }



    }



}