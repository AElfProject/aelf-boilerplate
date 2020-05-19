using System.Collections;
using System.Linq;
using AElf.Contracts.MultiToken;
using AElf.CSharp.Core;
using AElf.Sdk.CSharp;
using AElf.Types;
using Google.Protobuf.WellKnownTypes;

namespace AElf.Contracts.BingoContract
{
    /// <summary>
    /// The C# implementation of the contract defined in bingo_contract.proto that is located in the "protobuf"
    /// folder.
    /// Notice that it inherits from the protobuf generated code. 
    /// </summary>
    public class BingoContract : BingoContractContainer.BingoContractBase
    {
        public override Empty Register(Empty input)
        {
            Assert(State.PlayerInformation[Context.Sender] == null, $"User {Context.Sender} already registered.");
            var information = new PlayerInformation
            {
                // The value of seed will influence user's game result in some aspects.
                Seed = Context.TransactionId,
                RegisterTime = Context.CurrentBlockTime
            };
            State.PlayerInformation[Context.Sender] = information;
            return new Empty();
        }

        public override Int64Value Play(Int64Value input)
        {
            Assert(input.Value > 1, "Invalid bet amount.");
            var playerInformation = GetPlayerInformation();

            Context.LogDebug(() => $"Playing with amount {input.Value}");

            if (State.TokenContract.Value == null)
            {
                State.TokenContract.Value =
                    Context.GetContractAddressByName(SmartContractConstants.TokenContractSystemName);
            }

            State.TokenContract.TransferFrom.Send(new TransferFromInput
            {
                From = Context.Sender,
                To = Context.Self,
                Amount = input.Value,
                Symbol = Context.Variables.NativeSymbol,
                Memo = "Enjoy!"
            });

            playerInformation.Bouts.Add(new BoutInformation
            {
                PlayBlockHeight = Context.CurrentHeight,
                Amount = input.Value,
                PlayId = Context.TransactionId
            });

            State.PlayerInformation[Context.Sender] = playerInformation;

            return new Int64Value {Value = Context.CurrentHeight.Add(GetLagHeight())};
        }

        public override BoolValue Bingo(Hash input)
        {
            Context.LogDebug(() => $"Getting game result of play id: {input.ToHex()}");

            var playerInformation = State.PlayerInformation[Context.Sender];
            if (playerInformation == null)
            {
                throw new AssertionException($"User {Context.Sender} not registered before.");
            }

            Assert(playerInformation.Bouts.Count > 0, $"User {Context.Sender} seems never join this game.");

            var boutInformation = input == Hash.Empty
                ? playerInformation.Bouts.First(i => i.BingoBlockHeight == 0)
                : playerInformation.Bouts.FirstOrDefault(i => i.PlayId == input);

            if (boutInformation == null)
            {
                throw new AssertionException("Bout not found.");
            }

            Assert(!boutInformation.IsComplete, "Bout already finished.");
            var targetHeight = boutInformation.PlayBlockHeight.Add(GetLagHeight());
            Assert(targetHeight <= Context.CurrentHeight, "Invalid target height.");

            if (State.ConsensusContract.Value == null)
            {
                State.ConsensusContract.Value =
                    Context.GetContractAddressByName(SmartContractConstants.ConsensusContractSystemName);
            }

            var randomHash = State.ConsensusContract.GetRandomHash.Call(new Int64Value
            {
                Value = targetHeight
            });
            if (randomHash == Hash.Empty)
            {
                // Only can happen in test case.
                randomHash = HashHelper.XorAndCompute(input, Context.PreviousBlockHash);
            }

            var isWin = ConvertHashToBool(randomHash);
            var usefulHash = HashHelper.ConcatAndCompute(randomHash, playerInformation.Seed);
            var award = CalculateAward(boutInformation.Amount, GetKindFromHash(usefulHash));
            award = isWin ? award : -award;
            var transferAmount = boutInformation.Amount.Add(award);
            if (transferAmount > 0)
            {
                State.TokenContract.Transfer.Send(new TransferInput
                {
                    Symbol = Context.Variables.NativeSymbol,
                    Amount = transferAmount,
                    To = Context.Sender,
                    Memo = "Thx for playing my game."
                });
            }

            boutInformation.Award = award;
            boutInformation.IsComplete = true;
            State.PlayerInformation[Context.Sender] = playerInformation;
            return new BoolValue {Value = isWin};
        }

        public override Int64Value GetAward(Hash input)
        {
            var boutInformation = GetPlayerInformation().Bouts.FirstOrDefault(i => i.PlayId == input);
            return boutInformation == null
                ? new Int64Value {Value = 0}
                : new Int64Value {Value = boutInformation.Award};
        }

        public override Empty Quit(Empty input)
        {
            State.PlayerInformation.Remove(Context.Sender);
            return new Empty();
        }

        public override PlayerInformation GetPlayerInformation(Address input)
        {
            return State.PlayerInformation[input];
        }

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

            if (State.ConsensusContract.Value == null)
            {
                State.ConsensusContract.Value =
                    Context.GetContractAddressByName(SmartContractConstants.ConsensusContractSystemName);
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
                    value += 1;
            }

            return value;
        }

        private bool ConvertHashToBool(Hash hash)
        {
            return SumHash(hash) % 2 == 0;
        }
    }
}