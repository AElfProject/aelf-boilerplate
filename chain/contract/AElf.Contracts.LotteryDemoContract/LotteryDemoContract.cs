using System;
using System.Collections.Generic;
using System.Linq;
using AElf.Contracts.MultiToken;
using AElf.Sdk.CSharp;
using AElf.Types;
using Google.Protobuf.WellKnownTypes;

// 
namespace AElf.Contracts.LotteryDemoContract
{
    public class LotteryDemoContract : LotteryDemoContractContainer.LotteryDemoContractBase
    {
        private const int BasicMultiple = 100_000_000;
        private const int OneStarReward = 10;
//        private const int IntervalTime = 60 * 10; // seconds
//        private const int IntervalTime = 20; // seconds
        private const int IntervalTime = 10; // seconds

        public override GetStateOutput GetState (Empty input)
        {
            return new GetStateOutput
            {
                CurrentPeriod = State.CurrentPeriod.Value,
                CurrentTimeStamp = State.CurrentTimeStamp.Value,
                LastPeriodLuckyNumberShown = State.LastPeriodLuckyNumberShown.Value,
                TokenSymbol = State.TokenSymbol.Value,
                Sponsor = State.Sponsor.Value,
                IntervalTime = IntervalTime
            };
        }

        public override Empty Initialize(InitializeInput input)
        {
            Assert( State.TokenSymbol.Value == null, "Already initialize");
            
            State.TokenSymbol.Value = input.TokenSymbol;
            State.Sponsor.Value = input.Sponsor;
            
            // 初始化，建议从第0期开始。
            State.CurrentPeriod.Value = input.StartPeriod;
            // 不让直接赋值true false也是醉了。默认传入true。
            State.LastPeriodLuckyNumberShown.Value = input.Ready;
            State.CurrentTimeStamp.Value = input.StartTimestamp;
            State.PeriodRandomNumberTokens[input.StartPeriod] = new PeriodRandomNumberToken
            {
                RandomNumberToken = Context.TransactionId,
                Timestamp = input.StartTimestamp,
                LotteryTime = null,
                LuckyNumber = -1,
                Period = input.StartPeriod,
            };
            
            State.TokenContract.Value =
                Context.GetContractAddressByName(SmartContractConstants.TokenContractSystemName);
            State.RandomNumberGenerationContract.Value =
                Context.GetContractAddressByName(SmartContractConstants.ConsensusContractSystemName);
            return new Empty();
        }

        // 在开启新的一期的同时，插入老的一期的随机数，准备给老一期的开奖
        public override Empty NewPeriod(NewPeriodInput input)
        {
            // TODO: 如果BP节点没有打包这个交易，那么需要有机制重新插入新的随机数。现在没法 getTxResult.
            var randomNumberToken = input.RandomNumberToken;
            // 链内写拿不到token
            // var randomNumberToken = State.RandomNumberGenerationContract.RequestRandomNumber.Send();
            var lastPeriod = State.CurrentPeriod.Value;
            var currentPeriod = lastPeriod + 1;

            var unixTimestamp = Context.CurrentBlockTime;
            
            // TODO: 不能使用assert的方式返回，改成错误码 + 错误信息的方式返回
            Assert(Context.Sender == State.Sponsor.Value, "Invalid admin account.");
            Assert(State.RandomNumberTokens[randomNumberToken] != 1, "Existed random token.");
            Assert(State.LastPeriodLuckyNumberShown.Value, "It is not ready to next period.");
            Assert((unixTimestamp.Seconds - State.CurrentTimeStamp.Value.Seconds) > IntervalTime, "It is not time to next period.");

            // update
            State.CurrentPeriod.Value = currentPeriod;
            State.CurrentTimeStamp.Value = unixTimestamp;
            
            // Update random number token.
            State.RandomNumberTokens[randomNumberToken] = 1;
            State.PeriodRandomNumberTokens[lastPeriod] = new PeriodRandomNumberToken
            {
                RandomNumberToken = randomNumberToken,
                Timestamp = unixTimestamp,
                LotteryTime = null,
                LuckyNumber = -1,
                Period = lastPeriod,
            };
            // Initial next period
            State.PeriodRandomNumberTokens[currentPeriod] = new PeriodRandomNumberToken
            {
                RandomNumberToken = Context.TransactionId,
                Timestamp = unixTimestamp,
                LotteryTime = null,
                LuckyNumber = -1,
                Period = currentPeriod,
            };
            // State
            // TODO：必须判断这个交易在pending状态时插入。不然能够作弊？
            // TODO: 这里有风险，链上需要新加方法。
//            var randomHash = State.RandomNumberGenerationContract.GetRandomNumber.Call(input.RandomNumberToken);

            State.LastPeriodLuckyNumberShown.Value = false;
            return new Empty();
        }

        // TODO：getLuckyNumber失败的逻辑
        // 1.获取随机数的交易被回滚了，这时候需要重新获取随机数。
        // 2.公开随机数时，已经是LIB了，这时候就没有问题了。
        public override GetLuckyNumberOutput GetLuckyNumber(Empty input)
        {
            Assert(State.CurrentPeriod.Value > 0, "0 period is not ok, please call NewPeriod after Initialize.");
            var lastPeriodValue = State.CurrentPeriod.Value - 1;
            var periodRandomNumberToken = State.PeriodRandomNumberTokens[lastPeriodValue];
            var currentRandomNumberToken = periodRandomNumberToken.RandomNumberToken;
            
            // TODO: 如果随机数变成无法获取，需要有机制对这期重新开奖？
            var randomHash = State.RandomNumberGenerationContract.GetRandomNumber.Call(currentRandomNumberToken);
            Assert(randomHash != null && randomHash.Value.Any(), "Random Number not Ready");
            
            var luckyNumber = ConvertToInteger(randomHash);
            var unixTimestamp = Context.CurrentBlockTime;
            State.PeriodRandomNumberTokens[lastPeriodValue] = new PeriodRandomNumberToken
            {
                RandomNumberToken = periodRandomNumberToken.RandomNumberToken,
                Timestamp = periodRandomNumberToken.Timestamp,
                LotteryTime = unixTimestamp,
                LuckyNumber = luckyNumber, // 该值仅记录供参考
                Period = periodRandomNumberToken.Period
            };
            State.LastPeriodLuckyNumberShown.Value = true;

            return new GetLuckyNumberOutput
            {
                RandomHash = randomHash,
                PeriodNumber = lastPeriodValue,
                RandomNumberToken = currentRandomNumberToken,
                LuckyNumber = luckyNumber,
                LotteryTime = unixTimestamp
            };
        }

        public override RecordOutput GetRecord(RecordInput input)
        {
            var currentPeriodNumber = State.CurrentPeriod.Value;
            Assert(currentPeriodNumber >= 0, "No record now.");

            var periodRandomNumberTokenRecords = new List<PeriodRandomNumberToken>();
            var offset = input.Offset;
            var limit = input.Limit;

            var currentOffset = currentPeriodNumber - offset;
            var endOffset = currentOffset - limit;
            endOffset = endOffset >= 0 ? endOffset : 0;
            while (currentOffset >= endOffset)
            {
                periodRandomNumberTokenRecords.Add(State.PeriodRandomNumberTokens[currentOffset]);
                currentOffset--;
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
            Assert(input.ProportionSale <= 15 && input.ProportionSale >=0, "ProportionSale belongs to [0, 15]");
            Assert(input.ProportionBonus <= 5 && input.ProportionBonus >=0, "ProportionBonus belongs to [0, 5]");
    
            var tokenSymbol = State.TokenSymbol.Value ?? Context.Variables.NativeSymbol;
            var length = input.Lottery.Count;
            // Charge from Context.Sender
            // 问: 余额不足，不让下注. 不能查txResult怎么判断？,发交易会直接throw出来这个问题。
            State.TokenContract.TransferFrom.Send(new TransferFromInput
            {
                From = Context.Sender, // 可以给别人买，所有有这个功能
                To = Context.Self,
                Symbol = tokenSymbol,
                // TODO: 这里可能会导致精度问题，后续需要看一下安全范围。
                Amount = length * (100 - input.ProportionSale) * (BasicMultiple / 100 * 2)
            });
            // 给分销人的钱
            if (input.ProportionSale > 0)
            {
                State.TokenContract.TransferFrom.Send(new TransferFromInput
                {
                    From = Context.Sender, // 可以给别人买
                    To = input.SalerAddress,
                    Symbol = tokenSymbol,
                    Amount = length * input.ProportionSale * (BasicMultiple / 100 * 2) 
                });
            }
            // Update lotteries detail for this tx id.
            State.Lotteries[Context.TransactionId] = input;

            return new Empty();
        }

        public override Empty TakeReward(Hash input)
        {
            // Fetch lotteries detail.
            var lotteries = State.Lotteries[input];

            Assert( lotteries != null && lotteries.Lottery.Any(), "Invalid lotteries or lotteries not found.");
            Assert(lotteries.SenderAddress == Context.Sender, "No permission.");
            Assert(lotteries.ProportionBonus <= 5 && lotteries.ProportionBonus >=0, "Something wrong!!! proportionBonus belongs to [0, 5]");

            // Query random number.
            var periodRandomNumberToken = State.PeriodRandomNumberTokens[lotteries.TargetPeriod];
            Assert(periodRandomNumberToken.RandomNumberToken.Any(), "Invalid random number token.");
            var randomHash =
                State.RandomNumberGenerationContract.GetRandomNumber.Call(periodRandomNumberToken.RandomNumberToken);
            Assert(randomHash != null && randomHash.Value.Any(), "Random Number not Ready");
            // TODO: hash -> number of length 5.
            var luckyNumber = ConvertToInteger(randomHash);
            // TODO: Calculate reward via given data.
            var reward = CalculateReward(lotteries, luckyNumber);

            Assert(reward != 0, "Thanks for your participation.");
            
            var tokenSymbol = State.TokenSymbol.Value ?? Context.Variables.NativeSymbol;
            // Transfer reward to sender's address.
            var proportionBonus = lotteries.ProportionBonus;
            State.TokenContract.Transfer.Send(new TransferInput
            {
                Symbol = tokenSymbol,
                Amount = reward * (100 - proportionBonus) * (BasicMultiple / 100),
                To = Context.Sender
            });
            // 给分销人的钱
            if (proportionBonus > 0)
            {
                State.TokenContract.Transfer.Send(new TransferInput
                {
                    Symbol = tokenSymbol,
                    Amount = reward * proportionBonus * (BasicMultiple / 100),
                    To = lotteries.SalerAddress
                });
            }

            // TODO: 交易成功后，remove掉这值？所以我应该怎么在合约判断交易成功了？
            // 所以还是不能直接用remove，得过期后清除？
            State.Lotteries.Remove(input);

            // TODO: 返回更详细的中奖信息
            return new Empty();
        }

        private static long ConvertToInteger(Hash hash)
        {
            var luckyNumber = Math.Abs(hash.ToInt64() % 100000);
            return luckyNumber;
        }

        // TODO: 待补充其它中奖情况。
        private static long CalculateReward(Lotteries lotteries, long luckyNumber)
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
                        if (numbers[4] == luckyNumber % 10)
                        {
                            reward += OneStarReward;
                        }
                        break;
                    default:
                        // nothing
                        break;
                }
            }

            return reward;
        }
        
        // TODO: 待补充过期未领奖的删除操作
        public override Empty RemoveExpiredBet(Empty input)
        {
            return base.RemoveExpiredBet(input);
        }
    }
}