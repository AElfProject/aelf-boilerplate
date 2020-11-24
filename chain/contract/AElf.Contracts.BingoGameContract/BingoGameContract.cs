using Google.Protobuf.WellKnownTypes;
using System.Linq;
using AElf.Contracts.MultiToken;
using AElf.CSharp.Core;
using AElf.Sdk.CSharp;
using AElf.Types;

namespace AElf.Contracts.BingoGameContract
{
    public partial class BingoGameContract : BingoGameContractContainer.BingoGameContractBase
    {
        public override Empty Register(Empty input)
        {
            Initialize();
            Assert(State.PlayerInformation[Context.Sender] == null, $"User {Context.Sender} already registered.");
            var information = new PlayerInformation
            {
                // The value of seed will influence user's game result in some aspects.
                Seed = Context.TransactionId,
                RegisterTime = Context.CurrentBlockTime
            };
            State.PlayerInformation[Context.Sender] = information;
            State.TokenContract.Issue.Send(new IssueInput
            {
                Symbol = BingoGameContractConstants.CardSymbol,
                Amount = BingoGameContractConstants.InitialCards,
                To = Context.Sender,
                Memo = "Initial Bingo Cards for player."
            });
            State.TokenContract.Transfer.Send(new TransferInput
            {
                Symbol = Context.Variables.NativeSymbol,
                Amount = 100_00000000,
                To = Context.Sender,
                Memo = "Pay tx fee."
            });
            return new Empty();
        }

        private void Initialize()
        {
            if (State.Initialized.Value)
            {
                return;
            }

            State.TokenContract.Value =
                Context.GetContractAddressByName(SmartContractConstants.TokenContractSystemName);
            State.ConsensusContract.Value =
                Context.GetContractAddressByName(SmartContractConstants.ConsensusContractSystemName);

            State.Initialized.Value = true;
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
                Symbol = BingoGameContractConstants.CardSymbol,
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
            if (randomHash == null)
            {
                throw new AssertionException("Still preparing your game result, please wait for a while :)");
            }

            var usefulHash = HashHelper.ConcatAndCompute(randomHash, playerInformation.Seed);
            var bitArraySum = SumHash(usefulHash);
            var isWin = ConvertHashToBool(bitArraySum);
            var award = CalculateAward(boutInformation.Amount, GetKind(bitArraySum));
            award = isWin ? award : -award;
            var transferAmount = boutInformation.Amount.Add(award);
            if (transferAmount > 0)
            {
                State.TokenContract.Transfer.Send(new TransferInput
                {
                    Symbol = BingoGameContractConstants.CardSymbol,
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
    }
}