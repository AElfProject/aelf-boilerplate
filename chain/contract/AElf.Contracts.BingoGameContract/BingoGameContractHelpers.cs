using System.Collections;
using AElf.CSharp.Core;
using AElf.Sdk.CSharp;
using AElf.Types;
using Google.Protobuf.WellKnownTypes;

namespace AElf.Contracts.BingoGameContract
{
    public partial class BingoGameContract
    {
        private PlayerInformation GetPlayerInformation()
        {
            var playerInformation = State.PlayerInformation[Context.Sender];
            if (playerInformation == null)
            {
                throw new AssertionException($"User {Context.Sender} not registered before.");
            }

            return playerInformation;
        }

        private long GetLagHeight()
        {
            if (State.LagHeight.Value != 0)
            {
                return State.LagHeight.Value;
            }

            var minersCount = State.ConsensusContract.GetCurrentMinerList.Call(new Empty()).Pubkeys.Count;
            State.LagHeight.Value = minersCount.Mul(8);

            return State.LagHeight.Value;
        }

        /// <summary>
        /// 100%: 0...15, 240...256
        /// 70%: 16...47, 208...239
        /// 40%: 48...95, 160...207
        /// 10%: 96...159
        /// </summary>
        /// <param name="hash"></param>
        /// <returns></returns>
        private int GetKindFromHash(Hash hash)
        {
            var sum = SumHash(hash);
            if (sum <= 15 || sum >= 240)
                return 4;

            if (sum <= 47 || sum >= 208)
                return 3;

            if (sum <= 95 || sum >= 160)
                return 2;

            return 1;
        }

        private long CalculateAward(long amount, int kind)
        {
            switch (kind)
            {
                case 1:
                    return amount.Div(10);
                case 2:
                    return amount.Mul(4).Div(10);
                case 3:
                    return amount.Mul(7).Div(10);
                case 4:
                    return amount;
                default:
                    return 0;
            }
        }

        private int SumHash(Hash hash)
        {
            var bitArray = new BitArray(hash.Value.ToByteArray());
            var value = 0;
            for (var i = 0; i < bitArray.Count; i++)
            {
                if (bitArray[i])
                    value += i;
            }

            return value;
        }

        private bool ConvertHashToBool(Hash hash)
        {
            return SumHash(hash) % 2 == 0;
        }
    }
}