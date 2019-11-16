using System;
using System.Collections.Generic;
using System.Linq;
using AElf.Contracts.MultiToken;
using AElf.Sdk.CSharp;
using AElf.Types;
using Google.Protobuf.Collections;
using Google.Protobuf.WellKnownTypes;

namespace AElf.Contracts.LotteryDemoContract
{
    public class LotteryDemoContract : LotteryDemoContractContainer.LotteryDemoContractBase
    {
        private int BASIC_MULTIPLE = 10 ^ 8;
        private int ONE_STAR_REWARD = 10;
        private int INTERVERL_TIME = 60 * 10; // seconds
        public override Empty InitializeLotteryDemoContract(InitializeLotteryDemoContractInput input)
        {
            State.TokenSymbol.Value = input.TokenSymbol;
            
            // TODO: 加了这段就挂了。。。为何
            State.CurrentPeriod.Value = -1; // 初始化，第-1期，正式的从第0期开始。
            State.ReadyToNextPeriod.Value = true;
            State.CurrentTimeStamp.Value = 0;
            
            State.TokenContract.Value =
                Context.GetContractAddressByName(SmartContractConstants.TokenContractSystemName);
            State.RandomNumberGenerationContract.Value =
                Context.GetContractAddressByName(SmartContractConstants.ConsensusContractSystemName);
            return new Empty();
        }

        public override NewPeriodOutput NewPeriod(NewPeriodInput input)
        {
            // TODO: Check the sender's address
            var ownerAddress = Address.FromPublicKey(
                ByteArrayHelper.HexStringToByteArray(
                    "0484dc77d6b059d50156bc1a803203a2733dc591ae1358d7538c001565380b6c477b268a32baa6e609e41c0920b6b0eff3bee7ac3fc72148a3f89cb6579e256fa5")
            );
            var randomNumberToken = input.RandomNumberToken;

            Assert(Context.Sender == ownerAddress, "Invalid admin account.");
            Assert(State.CurrentPeriod.Value.Add(1) == input.PeriodNumber, "Incorrect period number.");
            Assert(State.RandomNumberTokens[input.RandomNumberToken] != 1, "Existed random token.");
            Assert(State.ReadyToNextPeriod.Value, "It is not ready to next period.");
            var unixTimestamp = (Int64)(DateTime.UtcNow.Subtract(new DateTime(1970, 1, 1))).TotalSeconds;
            Assert(State.CurrentTimeStamp.Value - unixTimestamp > INTERVERL_TIME, "It is not time to next period.");
            
            // update
            State.CurrentPeriod.Value = input.PeriodNumber;
            State.CurrentTimeStamp.Value = unixTimestamp;
            
            var periodRandomNumberToken = new PeriodRandomNumberToken
            {
                RandomNumberToken = randomNumberToken,
                Timestamp = unixTimestamp,
                WinningNumber = 0,
            };
            // Update random number token.
            State.PeriodRandomNumberTokens[input.PeriodNumber] = periodRandomNumberToken;
            State.RandomNumberTokens[input.RandomNumberToken] = 1;
            // State
            // TODO：必须判断这个交易在pending状态时插入。不然能够作弊？
            var randomHash = State.RandomNumberGenerationContract.GetRandomNumber.Call(input.RandomNumberToken);
            State.ReadyToNextPeriod.Value = false;
            return new NewPeriodOutput
            {
                RandomHash = randomHash,
                Timestamp = unixTimestamp,
            };
        }
        
        public override GetWinngNumberOutput GetWinngNumber(Empty input)
        {
            var currentPeriodValue = State.CurrentPeriod.Value;
            var periodRandomNumberToken = State.PeriodRandomNumberTokens[currentPeriodValue];
            var currentRandomNumberToken = periodRandomNumberToken.RandomNumberToken;
            
            var randomHash = State.RandomNumberGenerationContract.GetRandomNumber.Call(currentRandomNumberToken);
            Assert((randomHash != null) && (randomHash is Hash),"Random Number not Ready");
            // TODO：需要返回了正确的randomHash后
            var winngNumber = ConvertToInteger(randomHash);
            State.PeriodRandomNumberTokens[currentPeriodValue] = new PeriodRandomNumberToken
            {
                RandomNumberToken = periodRandomNumberToken.RandomNumberToken,
                Timestamp = periodRandomNumberToken.Timestamp,
                WinningNumber = winngNumber, // 该值仅供参考
            };
            State.ReadyToNextPeriod.Value = true;
            
            return new GetWinngNumberOutput
            {
                RandomHash = randomHash,
                PeriodNumber = currentPeriodValue,
                RandomNumberToken = currentRandomNumberToken,
                WinningNumber = winngNumber,
            };
        }
        
        public override RecordOutput GetRecord(RecordInput input)
        {
            var currentPeriodNumber = State.CurrentPeriod.Value;
            Assert(currentPeriodNumber >= 0, "No record now.");
            
            var periodRandomNumberTokenRecords = new List<PeriodRandomNumberToken>();

            while (currentPeriodNumber >= 0)
            {
                periodRandomNumberTokenRecords.Add(State.PeriodRandomNumberTokens[currentPeriodNumber]);
                currentPeriodNumber--;
            }

            return new RecordOutput
            {
                Offset = input.Offset,
                Limit = input.Limit,
                CurrentPeriod = currentPeriodNumber,
                Records = {periodRandomNumberTokenRecords}
            };
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
            var length = input.Lottery.Count;
            // Charge from Context.Sender
            State.TokenContract.TransferFrom.Send(new TransferFromInput
            {
                From = Context.Sender,
                To = Context.Self,
                Symbol = tokenSymbol,
                Amount = length * 2 * BASIC_MULTIPLE // TODO: Prize
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
            var periodRandomNumberToken = State.PeriodRandomNumberTokens[lotteries.TargetPeriod];
            Assert(periodRandomNumberToken.RandomNumberToken.Any(), "Invalid random number token.");
            var randomHash = State.RandomNumberGenerationContract.GetRandomNumber.Call(periodRandomNumberToken.RandomNumberToken);
            Assert((randomHash != null) && (randomHash is Hash),"Random Number not Ready");
            // TODO: hash -> number of length 5.
            var winningNumber = ConvertToInteger(randomHash);
            // TODO: Calculate reward via given data.
            var reward = CalculateReward(lotteries, winningNumber);

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

        private Int64 ConvertToInteger(Hash hash)
        {
            var winningNumber = hash.ToInt64() / 100000; // 这个hash的数字会不会太大了？截取一部分？
            return winningNumber;
            // throw new NotImplementedException();
        }

        private long CalculateReward(Lotteries lotteries, Int64 winningNumber)
        {
            var lotteryList = lotteries.Lottery;
            var length = lotteryList.Count;
            var reward = 0;
            for (var i = 0; i < length; i++)
            {
                var lottery = lotteryList[i];
                var numbers = lottery.Value;
                var type = lottery.Type;
                switch (type) 
                {
                    case 1:
                        if (numbers[4] == winningNumber % 10)
                        {
                            reward += ONE_STAR_REWARD;
                        }
                        break;
                    default:
                        // nothing
                        break;
                }
            }
            return reward * BASIC_MULTIPLE;
            // throw new NotImplementedException();
        }
    }
}