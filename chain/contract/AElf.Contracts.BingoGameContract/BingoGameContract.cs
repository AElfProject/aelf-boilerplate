using Google.Protobuf.WellKnownTypes;
using System.Collections;
using System.Linq;
using AElf.Contracts.Consensus.AEDPoS;
using AElf.Contracts.MultiToken;
using AElf.CSharp.Core;
using AElf.CSharp.Core.Extension;
using AElf.Sdk.CSharp;
using AElf.Types;

namespace AElf.Contracts.BingoGameContract
{
    public class BingoGameContract : BingoGameContractContainer.BingoGameContractBase
    {
        /// <summary>
        /// Initial reference contracts' address;
        /// create CARD token and issue to contract itself.
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        public override Empty Initial(Empty input)
        {
            Assert(!State.Initialized.Value, "Already initialized.");
            State.TokenContract.Value =
                Context.GetContractAddressByName(SmartContractConstants.TokenContractSystemName);
            State.ConsensusContract.Value =
                Context.GetContractAddressByName(SmartContractConstants.ConsensusContractSystemName);
            
            State.Initialized.Value = true;
            return new Empty();
        }

        public override SInt64Value Play(PlayInput input)
        {
            Assert(input.BuyAmount > 1, "Invalid bet amount.");
            var playerInformation = State.PlayerInformation[Context.Sender];

            if (playerInformation == null)
            {
                playerInformation = new PlayerInformation
                {
                    // The value of seed will influence user's game result in some aspects.
                    Seed = Context.TransactionId
                };
                State.PlayerInformation[Context.Sender] = playerInformation;
            }

            Context.LogDebug(() => $"Playing with amount {input.BuyAmount}");

            State.TokenContract.TransferFrom.Send(new TransferFromInput
            {
                From = Context.Sender,
                To = Context.Self,
                Amount = input.BuyAmount,
                Symbol = input.TokenSymbol,
                Memo = "Enjoy!"
            });

            var currentRound = State.ConsensusContract.GetCurrentRoundInformation.Call(new Empty());

            playerInformation.Bouts.Add(new BoutInformation
            {
                // Record current round number.
                PlayRoundNumber = currentRound.RoundNumber,
                Amount = input.BuyAmount,
                PlayId = Context.TransactionId,
                BoutType = input.BuyType,
                TokenSymbol = input.TokenSymbol,
            });

            State.PlayerInformation[Context.Sender] = playerInformation;

            return new SInt64Value {Value = CalculateWaitingMilliseconds(currentRound)};
        }

        private long CalculateWaitingMilliseconds(Round round)
        {
            var extraBlockProducerExpectedTime = round.RealTimeMinersInformation.Values.OrderByDescending(i => i.Order)
                .First().ExpectedMiningTime.AddMilliseconds(4000);
            var expectedTimeOfGettingRandomNumber = extraBlockProducerExpectedTime.AddMilliseconds(8000);
            return (expectedTimeOfGettingRandomNumber - Context.CurrentBlockTime).Milliseconds();
        }

        public override BingoOutput Bingo(Hash input)
        {
            Context.LogDebug(() => $"Getting game result of play id: {input.ToHex()}");

            var playerInformation = State.PlayerInformation[Context.Sender];
            Assert(playerInformation != null, $"User {Context.Sender} not registered before.");
            Assert(playerInformation.Bouts.Count > 0, $"User {Context.Sender} seems never join this game.");

            var boutInformation = input == Hash.Empty
                ? playerInformation.Bouts.First(i => i.BingoRoundNumber == 0)
                : playerInformation.Bouts.FirstOrDefault(i => i.PlayId == input);

            Assert(boutInformation != null, "Bouts not found.");
            Assert(!boutInformation.IsComplete, "Bout already finished.");

            var targetRound = State.ConsensusContract.GetRoundInformation.Call(new Int64Value
            {
                Value = boutInformation.PlayRoundNumber.Add(1)
            });
            Assert(targetRound != null, "Still preparing your game result, please wait for a while :)");

            var randomHash = targetRound.RealTimeMinersInformation.Values.First(i => i.PreviousInValue != null).PreviousInValue;

            var usefulHash = HashHelper.ConcatAndCompute(randomHash, playerInformation.Seed);
            var randomResult = SumHash(usefulHash) % 256;
            var isPlayerWin = DrawThePrize(randomResult, boutInformation.BoutType);

            var award = isPlayerWin ? boutInformation.Amount : -boutInformation.Amount;

            var transferAmount = boutInformation.Amount.Add(award);
            if (transferAmount > 0)
            {
                State.TokenContract.Transfer.Send(new TransferInput
                {
                    Symbol = boutInformation.TokenSymbol,
                    Amount = transferAmount,
                    To = Context.Sender,
                    Memo = "Thx for playing my game."
                });
            }

            boutInformation.Award = award;
            boutInformation.IsComplete = true;
            State.PlayerInformation[Context.Sender] = playerInformation;
            
            return new BingoOutput
            {
                Random = randomResult,
                IsWin = isPlayerWin,
                BoutType = boutInformation.BoutType,
                Award = award,
            };
        }

        public override SInt64Value GetAward(Hash input)
        {
            var playerInformation = State.PlayerInformation[Context.Sender];
            Assert(playerInformation != null, $"User {Context.Sender} not registered before.");

            var boutInformation = playerInformation.Bouts.FirstOrDefault(i => i.PlayId == input);

            return boutInformation == null
                ? new SInt64Value {Value = 0}
                : new SInt64Value {Value = boutInformation.Award};
        }

        public override PlayerInformation GetPlayerInformation(Address input)
        {
            return State.PlayerInformation[input] ?? new PlayerInformation();
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
        
        private bool DrawThePrize(long randomResult, long boutType)
        {
            var isWin = false;
            if (randomResult < 127)
            {
                isWin = boutType == 1;
            }

            if (randomResult > 128)
            {
                isWin = boutType == 2;
            }

            return isWin;
        }
    }
}