using System.Collections;
using System.Linq;
using System.Runtime.InteropServices;
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
        private const int BetHistoryLimit = 50;
        private const int BetLimit = 30;
        private const int BetMinimumAmount = 1;

        public override Int64Value Play(PlayInput input)
        {
            Assert(input.BuyAmount > BetMinimumAmount, "Invalid bet amount.");
            var playerInformation = RegisterOrGetPlayerInformation();
            
            Assert(playerInformation.Bouts.Count < BetLimit, "There are too many lottery tickets, please draw first");

            Context.LogDebug(() => $"Playing with amount {input.BuyAmount}");

            if (State.TokenContract.Value == null)
            {
                State.TokenContract.Value =
                    Context.GetContractAddressByName(SmartContractConstants.TokenContractSystemName);
            }

            State.TokenContract.TransferFrom.Send(new TransferFromInput
            {
                From = Context.Sender,
                To = Context.Self,
                Amount = input.BuyAmount,
                Symbol = input.TokenSymbol,
                Memo = "Enjoy!"
            });

            var boutInformation = new BoutInformation
            {
                PlayBlockHeight = Context.CurrentHeight,
                PlayId = Context.TransactionId,
                Amount = input.BuyAmount,
                BoutType = input.BuyType,
                TokenSymbol = input.TokenSymbol,
                BetTime = Context.CurrentBlockTime
            };

            playerInformation.Bouts.Add(boutInformation);
            State.PlayerInformation[Context.Sender] = playerInformation;
            
            return new Int64Value {Value = Context.CurrentHeight.Add(GetLagHeight())};
        }

        public override BingoOutput Bingo(Hash input)
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

            var usefulHash = HashHelper.ConcatAndCompute(randomHash, playerInformation.Seed);
            var bitArraySum = SumHash(usefulHash);
            var randomResult = bitArraySum % 256;
            var isWin = DrawThePrize(randomResult, boutInformation.BoutType);
            var award = isWin ? boutInformation.Amount : -boutInformation.Amount;

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
            boutInformation.LotteryCode = randomResult;

            playerInformation.Bouts.Remove(boutInformation);
            State.PlayerInformation[Context.Sender] = playerInformation;
            
            State.PlayerInformationCompleted[Context.Sender].Bouts.Add(boutInformation);
            if (State.PlayerInformationCompleted[Context.Sender].Bouts.Count > BetHistoryLimit)
            {
                State.PlayerInformationCompleted[Context.Sender].Bouts.RemoveAt(0);
            }
            
            return new BingoOutput
            {
                Random = randomResult,
                IsWin = isWin,
                BoutType = boutInformation.BoutType,
                Award = award,
            };
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
        
        public override PlayerInformation GetPlayerInformationCompleted(Address input)
        {
            return State.PlayerInformationCompleted[input];
        }
        
        private PlayerInformation RegisterOrGetPlayerInformation()
        {
            var playerInformation = State.PlayerInformation[Context.Sender];
            if (playerInformation == null)
            {
                playerInformation = new PlayerInformation
                {
                    // The value of seed will influence user's game result in some aspects.
                    Seed = Context.TransactionId,
                    RegisterTime = Context.CurrentBlockTime
                };
                State.PlayerInformation[Context.Sender] = playerInformation;
                State.PlayerInformationCompleted[Context.Sender] = new PlayerInformation
                {
                    // The value of seed will influence user's game result in some aspects.
                    Seed = Context.TransactionId,
                    RegisterTime = Context.CurrentBlockTime
                };
            }

            return playerInformation;
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

        private bool DrawThePrize(int randomResult, long boutType)
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