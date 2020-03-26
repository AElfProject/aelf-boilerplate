using System;
using System.Linq;
using AElf.Contracts.MultiToken;
using AElf.CSharp.Core;
using AElf.Sdk.CSharp;
using AElf.Types;
using Google.Protobuf.WellKnownTypes;

namespace AElf.Contracts.LotteryDemoContract
{
    public class LotteryDemoContract : LotteryDemoContractContainer.LotteryDemoContractBase
    {
        public override Empty InitializeLotteryDemoContract(InitializeLotteryDemoContractInput input)
        {
            State.TokenSymbol.Value = input.TokenSymbol;
            return new Empty();
        }

        public override Empty NewPeriod(NewPeriodInput input)
        {
            // TODO: Check the sender's address

            Assert(State.CurrentPeriod.Value.Add(1) == input.PeriodNumber, "Incorrect period number.");

            // Update current period.
            State.CurrentPeriod.Value = input.PeriodNumber;

            // Update random number token.
            State.RandomNumberTokens[input.PeriodNumber] = input.RandomNumberToken;

            return new Empty();
        }

        /// <summary>
        /// Sender needs to send a tx to give allowance to this contract before calling this.
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        public override Empty Bet(Lotteries input)
        {
            // TODO: More basic checks.
            Assert(input.TargetPeriod == State.CurrentPeriod.Value, "Unmatched period number.");

            var tokenSymbol = State.TokenSymbol.Value ?? Context.Variables.NativeSymbol;
            // Charge from Context.Sender
            State.TokenContract.TransferFrom.Send(new TransferFromInput
            {
                From = Context.Sender,
                To = Context.Self,
                Symbol = tokenSymbol,
                Amount = 1000_0000 // TODO: Prize
            });

            // Update lotteries detail for this tx id.
            State.Lotteries[Context.TransactionId] = input;

            return new Empty();
        }

        public override Empty TakeReward(Hash input)
        {
            // Fetch lotteries detail.
            var lotteries = State.Lotteries[input];

            Assert(lotteries.Lottery.Any(), "Invalid lotteries or lotteries not found.");
            Assert(lotteries.SenderAddress == Context.Sender, "No permission.");

            // Query random number.
            var randomNumberToken = State.RandomNumberTokens[lotteries.TargetPeriod];
            Assert(randomNumberToken.Any(), "Invalid random number token.");
            var randomHash = State.RandomNumberGenerationContract.GetRandomNumber.Call(randomNumberToken);
            // TODO: hash -> number of length 5.
            var randomNumber = ConvertToInteger(randomHash);
            // TODO: Calculate reward via given data.
            var reward = CalculateReward();

            var tokenSymbol = State.TokenSymbol.Value ?? Context.Variables.NativeSymbol;
            // Transfer reward to sender's address.
            State.TokenContract.Transfer.Send(new TransferInput
            {
                Symbol = tokenSymbol,
                Amount = reward,
                To = Context.Sender
            });

            return new Empty();
        }

        private int ConvertToInteger(Hash hash)
        {
            throw new NotImplementedException();
        }

        private long CalculateReward()
        {
            throw new NotImplementedException();
        }
    }
}