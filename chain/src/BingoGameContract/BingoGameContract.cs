using AElf;
using Google.Protobuf.WellKnownTypes;
using System;
using System.Linq;
using AElf.Contracts.Consensus.DPoS;
using AElf.Contracts.MultiToken.Messages;
using AElf.Sdk.CSharp;

namespace BingoGameContract
{
    public class BingoGameContract : BingoGameContractContainer.BingoGameContractBase
    {
        public override Empty InitialBingoGame(InitialBingoGameInput input)
        {
            Assert(!State.Initialized.Value, "Already initialized.");
            State.BasicContractZero.Value = Context.GetZeroSmartContractAddress();
            State.TokenContract.Value =
                State.BasicContractZero.GetContractAddressByName.Call(input.TokenContractSystemName);
            State.ConsensusContract.Value =
                State.BasicContractZero.GetContractAddressByName.Call(input.ConsensusContractSystemName);

            // Create and issue token of this contract.
            State.TokenContract.Create.Send(new CreateInput
            {
                Symbol = BingoGameContractConstants.CardSymbol,
                TokenName = "Bingo Card",
                Decimals = 2,
                Issuer = Context.Self,
                IsBurnable = true,
                TotalSupply = BingoGameContractConstants.TotalCards,
                LockWhiteList = {Context.Self}
            });
            State.Initialized.Value = true;
            return new Empty();
        }

        public override Empty Register(Empty input)
        {
            Assert(State.PlayerInformation[Context.Sender] == null, "Already registered.");
            var information = new PlayerInformation
            {
                Seed = Context.TransactionId
            };
            State.PlayerInformation[Context.Sender] = information;
            
            State.TokenContract.Issue.Send(new IssueInput
            {
                Symbol = BingoGameContractConstants.CardSymbol,
                Amount = BingoGameContractConstants.InitialCards,
                To = Context.Sender,
                Memo = "Initial Bingo cars to player."
            });
            
            return new Empty();
        }

        public override Empty Deposit(SInt64Value input)
        {
            var information = State.PlayerInformation[Context.Sender];
            Assert(information != null, "Not registered.");
            State.TokenContract.TransferFrom.Send(new TransferFromInput
            {
                Symbol = Context.Variables.NativeSymbol,
                Amount = input.Value,
                From = Context.Sender,
                // TODO: Created a profit item and To = ProfitItemVirtualAddress
                To = Context.Self,
                Memo = "Tx for recharging."
            });
            State.TokenContract.Issue.Send(new IssueInput
            {
                Symbol = BingoGameContractConstants.CardSymbol,
                Amount = input.Value,
                To = Context.Sender,
                Memo = "Now you are stronger."
            });

            return new Empty();
        }

        public override Empty Play(SInt64Value input)
        {
            var playerInformation = State.PlayerInformation[Context.Sender];
            Assert(playerInformation != null, "Not registered.");
            if (playerInformation == null)
            {
                return new Empty();
            }
            
            State.TokenContract.TransferFrom.Send(new TransferFromInput
            {
                From = Context.Self,
                To = Context.Sender,
                Amount = input.Value,
                Symbol = BingoGameContractConstants.CardSymbol,
                Memo = "Play the game."
            });

            playerInformation.BingoInfos.Add(new BingoInformation
            {
                PlayRoundNumber = State.ConsensusContract.GetCurrentRoundNumber.Call(new Empty()).Value,
                Amount = input.Value,
                PlayId = Context.TransactionId
            });
            return new Empty();
        }

        public override BoolOutput Bingo(Hash input)
        {
            var playerInformation = State.PlayerInformation[Context.Sender];
            Assert(playerInformation != null, "Not registered.");
            if (playerInformation == null)
            {
                return new BoolOutput {BoolValue = false};
            }

            Assert(playerInformation.BingoInfos.Count > 0, "No play id.");

            var bingoInformation = input == Hash.Empty
                ? playerInformation.BingoInfos.First()
                : playerInformation.BingoInfos.FirstOrDefault(i => i.PlayId == input);

            Assert(bingoInformation != null, "Play id not found.");
            if (bingoInformation == null)
            {
                return new BoolOutput {BoolValue = false};
            }

            var currentRoundNumber = State.ConsensusContract.GetCurrentRoundNumber.Call(new Empty()).Value;
            var riskyNumber = currentRoundNumber - bingoInformation.PlayRoundNumber;
            Assert(riskyNumber > 2, "Still preparing your award :)");

            var previousRoundInformation =
                State.ConsensusContract.GetRoundInformation.Call(new SInt64Value {Value = currentRoundNumber - 1});
            var minersCount = previousRoundInformation.RealTimeMinersInformation.Count;
            var luckyHash = Hash.FromTwoHashes(playerInformation.Seed, bingoInformation.PlayId);
            var luckyNumber = ConvertHashToLong(luckyHash);
            var targetOrder = Math.Abs((int) luckyNumber % minersCount) + 1;
            var randomHash = previousRoundInformation.RealTimeMinersInformation.Values
                .First(i => i.Order == targetOrder).PreviousInValue;
            var randomNumber = ConvertHashToLong(randomHash);
            var characteristicHash = GetCharacteristicHash(previousRoundInformation);
            var characteristicNumber = ConvertHashToLong(characteristicHash);

            var result = (randomNumber - characteristicNumber) % 10 + 1;
            var award = bingoInformation.Amount;
            if (result > 0)
            {
                award = award.Mul(riskyNumber).Div(result);
            }

            if (result == 0)
            {
                award = award.Mul(riskyNumber);
            }

            if (result < 0)
            {
                award = award.Div(-result).Div(riskyNumber);
            }

            bingoInformation.Award = award;

            State.PlayerInformation[Context.Sender] = playerInformation;

            if (award > 0)
            {
                State.TokenContract.Transfer.Send(new TransferInput
                {
                    Symbol = BingoGameContractConstants.CardSymbol,
                    Amount = award,
                    To = Context.Sender,
                    Memo = "Well done."
                });
            }

            if (award < 0)
            {
                State.TokenContract.TransferFrom.Send(new TransferFromInput
                {
                    From = Context.Sender,
                    To = Context.Self,
                    Amount = -award,
                    Symbol = BingoGameContractConstants.CardSymbol,
                    Memo = "Thanks for your patronage."
                });
            }

            return new BoolOutput {BoolValue = result >= 0};
        }

        public override SInt64Value GetAward(Hash input)
        {
            var playerInformation = State.PlayerInformation[Context.Sender];
            Assert(playerInformation != null, "Not registered.");
            if (playerInformation == null)
            {
                return new SInt64Value {Value = 0};
            }
            
            var bingoInformation = playerInformation.BingoInfos.FirstOrDefault(i => i.PlayId == input);
            if (bingoInformation == null)
            {
                return new SInt64Value {Value = 0};
            }

            return new SInt64Value {Value = bingoInformation.Award};
        }

        public override Empty Quit(Empty input)
        {
            var playerInformation = State.PlayerInformation[Context.Sender];
            Assert(playerInformation != null, "Not registered.");
            // TODO: Set to null when support deleting state.
            State.PlayerInformation[Context.Sender] = new PlayerInformation();

            var balance = State.TokenContract.GetBalance.Call(new GetBalanceInput
            {
                Symbol = BingoGameContractConstants.CardSymbol,
                Owner = Context.Sender
            }).Balance;
            State.TokenContract.Transfer.Send(new TransferInput
            {
                Symbol = Context.Variables.NativeSymbol,
                To = Context.Sender,
                Amount = balance,
                Memo = "Give elf tokens back."
            });
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
        
        private Hash GetCharacteristicHash(Round round)
        {
            return round.RealTimeMinersInformation.Values.Where(m => m.OutValue != null).Aggregate(Hash.Empty,
                (current, minerInRound) => Hash.FromTwoHashes(current, minerInRound.OutValue));
        }

        private long ConvertHashToLong(Hash hash)
        {
            return BitConverter.ToInt64(
                BitConverter.IsLittleEndian ? hash.Value.Reverse().ToArray() : hash.Value.ToArray(), 0);
        }
        
    }
}