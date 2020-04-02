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

            // Create and issue token of this contract.
            State.TokenContract.Create.Send(new CreateInput
            {
                Symbol = BingoGameContractConstants.CardSymbol,
                TokenName = "Bingo Card",
                Decimals = 0,
                Issuer = Context.Self,
                IsBurnable = true,
                TotalSupply = long.MaxValue,
                LockWhiteList = {Context.Self}
            });

            State.TokenContract.Issue.Send(new IssueInput
            {
                Symbol = BingoGameContractConstants.CardSymbol,
                Amount = long.MaxValue,
                To = Context.Self,
                Memo = "All to issuer."
            });
            State.Initialized.Value = true;
            return new Empty();
        }

        /// <summary>
        /// Give user a certain amount of CARD tokens for free.
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        public override Empty Register(Empty input)
        {
            Assert(State.PlayerInformation[Context.Sender] == null, $"User {Context.Sender} already registered.");
            var information = new PlayerInformation
            {
                // The value of seed will influence user's game result in some aspects.
                Seed = Context.TransactionId
            };
            State.PlayerInformation[Context.Sender] = information;

            State.TokenContract.Transfer.Send(new TransferInput
            {
                Symbol = BingoGameContractConstants.CardSymbol,
                Amount = BingoGameContractConstants.InitialCards,
                To = Context.Sender,
                Memo = "Initial Bingo Cards for player."
            });

            return new Empty();
        }

        public override Empty Deposit(SInt64Value input)
        {
            var playerInformation = State.PlayerInformation[Context.Sender];
            Assert(playerInformation != null, $"User {Context.Sender} not registered before.");
            Assert(input.Value > 0, "At least you should buy 1 CARD.");
            var elfAmount = input.Value.Mul(1_0000_0000);
            State.TokenContract.TransferFrom.Send(new TransferFromInput
            {
                Symbol = Context.Variables.NativeSymbol,
                Amount = elfAmount,
                From = Context.Sender,
                To = Context.Self,
                Memo = "Thanks for recharging:)"
            });
            State.TokenContract.Transfer.Send(new TransferInput
            {
                Symbol = BingoGameContractConstants.CardSymbol,
                Amount = input.Value,
                To = Context.Sender,
                Memo = "Now you are stronger:)"
            });

            return new Empty();
        }

        public override SInt64Value Play(SInt64Value input)
        {
            Assert(input.Value > 1, "Invalid bet amount.");
            var playerInformation = State.PlayerInformation[Context.Sender];
            Assert(playerInformation != null, $"User {Context.Sender} not registered before.");

            Context.LogDebug(() => $"Playing with amount {input.Value}");

            State.TokenContract.TransferFrom.Send(new TransferFromInput
            {
                From = Context.Sender,
                To = Context.Self,
                Amount = input.Value,
                Symbol = BingoGameContractConstants.CardSymbol,
                Memo = "Enjoy!"
            });

            var currentRound = State.ConsensusContract.GetCurrentRoundInformation.Call(new Empty());

            playerInformation.Bouts.Add(new BoutInformation
            {
                // Record current round number.
                PlayRoundNumber = currentRound.RoundNumber,
                Amount = input.Value,
                PlayId = Context.TransactionId
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

        public override BoolValue Bingo(Hash input)
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
            var isWin = ConvertHashToBool(randomHash);

            var usefulHash = Hash.FromTwoHashes(randomHash, playerInformation.Seed);
            var award = CalculateAward(boutInformation.Amount, GetKindFromHash(usefulHash));
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

            return new BoolValue {Value = true};
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

        public override Empty Quit(Empty input)
        {
            var playerInformation = State.PlayerInformation[Context.Sender];
            Assert(playerInformation != null, "Not registered.");
            State.PlayerInformation[Context.Sender] = new PlayerInformation();

            var balance = State.TokenContract.GetBalance.Call(new GetBalanceInput
            {
                Symbol = BingoGameContractConstants.CardSymbol,
                Owner = Context.Sender
            }).Balance;
            if (balance > BingoGameContractConstants.InitialCards)
            {
                State.TokenContract.Transfer.Send(new TransferInput
                {
                    Symbol = Context.Variables.NativeSymbol,
                    To = Context.Sender,
                    Amount = balance - BingoGameContractConstants.InitialCards,
                    Memo = "Give elf tokens back."
                });
            }

            State.TokenContract.TransferFrom.Send(new TransferFromInput
            {
                Symbol = BingoGameContractConstants.CardSymbol,
                From = Context.Sender,
                To = Context.Self,
                Amount = balance,
                Memo = "Return cards back."
            });
            return new Empty();
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