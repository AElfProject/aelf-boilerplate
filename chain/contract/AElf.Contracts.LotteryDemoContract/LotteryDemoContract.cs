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
    public partial class LotteryDemoContract : LotteryDemoContractContainer.LotteryDemoContractBase
    {
        private const long Decimals = 100_000_000;
        private const int IntervalTime = 60; // seconds

        public override GetStateOutput GetState (Empty input)
        {
            
            return new GetStateOutput
            {
                CurrentPeriod = State.CurrentPeriod.Value,
                CurrentTimeStamp = State.LastCreateTime.Value,
                TokenSymbol = State.TokenSymbol.Value,
                ParentCasino = State.ParentCasino.Value,
                IntervalTime = IntervalTime,
                RandomHash = State.RandomHash.Value,
                LotteryId = State.CurrentLotteryId.Value
            };
        }

        public override Empty Initialize(InitializeInput input)
        {
            Assert( State.TokenSymbol.Value == null, "Already initialized");
            
            State.ParentCasino.Value = input.ParentCasino;  
            State.TokenSymbol.Value = input.TokenSymbol;
            State.CurrentLotteryId.Value = 0;
            State.CurrentCheckedLotteryId.Value = 0;
            State.SalersBonus[Context.Self] = 0;  //后期需要删掉

            State.LastCreateTime.Value = Context.CurrentBlockTime;

            InitializeOdds();

            // 初始化，建议从第0期开始。
            State.CurrentPeriod.Value = input.StartPeriod;
            // 不让直接赋值true false也是醉了。默认传入true。
            
            State.TokenContract.Value = Context.GetContractAddressByName(SmartContractConstants.TokenContractSystemName);
            State.RandomNumberGenerationContract.Value = Context.GetContractAddressByName(SmartContractConstants.ConsensusContractSystemName);
            //State.TokenConverterContract.Value = Context.GetContractAddressByName(SmartContractConstants.TokenConverterContractSystemName);
            

            //给母合约授权
            State.TokenContract.Approve.Send(new ApproveInput
            {
                Spender = State.ParentCasino.Value,   
                Symbol = State.TokenSymbol.Value,
                Amount = 100000000_00000000
            });






            return new Empty();
        }






        //领奖 用lotteryid
        public override Empty TakeReward(TakeRewardInput input)
        {
            Assert(Context.Sender == State.Lotteries2[input.LotteryId].Owner, "不能替别人领");
            var tokenSymbol = State.TokenSymbol.Value ?? Context.Variables.NativeSymbol;
            var lotteryId = input.LotteryId;
            var reward = State.Lotteries2[lotteryId].HaveReward;

            

            //var reward = CalculateReward2(lottery);

            //领过奖了
            if(State.Lotteries2[lotteryId].Drawed == true)  return new Empty();

            if(reward > 0)
            {
                //有奖金,从该合约转出给彩票owner，放入DoneLotteries
                State.TokenContract.Transfer.Send(new TransferInput
                {
                    To = State.Lotteries2[lotteryId].Owner,
                    Symbol = tokenSymbol,
                    // TODO: 这里可能会导致精度问题，后续需要看一下安全范围。
                    Amount = reward
                });

                
                //标记已领奖并放入DoneLotteries
                State.Lotteries2[lotteryId].Drawed = true;

                InitializeLotteriesList(State.Lotteries2[lotteryId].Owner);

                State.UnDoneLotteries[State.Lotteries2[lotteryId].Owner].Lotteries.Remove(lotteryId);
                State.DoneLotteries[State.Lotteries2[lotteryId].Owner].Lotteries.Add(lotteryId);

            } else
            {
                //未中奖无奖金 直接放入DoneLotteries，还是在别处自动把未中奖lottery放入吧

            }

            return new Empty();
        }





        public override Empty RequestNewPeriod(NewPeriodInput2 input)
        {
            var randomNumberTokens = input.Tokens;
            // 链内写拿不到token
            // var randomNumberToken = State.RandomNumberGenerationContract.RequestRandomNumber.Send();
            var lastPeriod = State.CurrentPeriod.Value;
            var blockTime = Context.CurrentBlockTime;

            Assert((blockTime.Seconds - State.LastCreateTime.Value.Seconds) > IntervalTime, "It is not time to next period.");
            


            // 当前期完成 新建下一期
            if(lastPeriod == 0 || State.Periods[lastPeriod].RandomHash != Hash.Empty){
                var randomStatus = CheckRandomToken(randomNumberTokens[0], "13");
                Assert(randomStatus, "wrong token, existed or not found");
                var newPeriod = new PeriodBody{
                    Period = lastPeriod + 1,
                    RandomHash = Hash.Empty,
                    RandomTokens = {randomNumberTokens},
                    CreateTime = blockTime
                };
                State.Periods[lastPeriod + 1] = newPeriod;
                State.CurrentPeriod.Value = lastPeriod + 1;
                State.LastCreateTime.Value = blockTime;

                //Event emit 现在JSSDK还TM不能subscribe event
                Context.Fire(new PeriodAdded{
                    PeriodNumber = State.CurrentPeriod.Value,
                    RandomToken = randomNumberTokens[0],
                    AddedTime = blockTime,
                    });
            }
            else{
                Assert(false, "New Period Added Failed");
            }
            
            //可以在这自动开奖?
            

            
            return new Empty();
        }



        public override PeriodBody GetPeriod(GetPeriodInput input)
        {

            return State.Periods[input.Period];
        }
        //批量获取Periods
        public override PeriodsOutput GetPeriods(GetPeriodsInput input)
        {
            
            var currentPeriodNumber = State.CurrentPeriod.Value;
            Assert(currentPeriodNumber >= 0, "No record now.");

            var periods = new List<PeriodBody>();
            var offset = input.Offset;
            var limit = input.Limit;

            var currentOffset = currentPeriodNumber - offset;
            var endOffset = (currentOffset - limit) < 0 ? 0 : (currentOffset - limit) ;

            while (currentOffset > endOffset)
            {
                periods.Add(State.Periods[currentOffset]);
                currentOffset--;
            }

            return new PeriodsOutput
            {
                Periods = {periods}
            };
        }

        public override PeriodBody GetLatestShownPeriod(Empty input)
        {
            var latestPeriod = State.CurrentPeriod.Value;
            latestPeriod = State.Periods[latestPeriod].FinishTime != null ? latestPeriod : latestPeriod - 1;

            return State.Periods[latestPeriod];
        }




        public override Empty UpdateRandom(Empty input)
        {
            Assert(State.CurrentPeriod.Value > 0, "0 period is not ok, please call NewPeriod after Initialize.");
            var lastPeriodValue = State.CurrentPeriod.Value;
            Assert(State.Periods[lastPeriodValue].FinishTime == null, "Already Updated");

            var currentRandomTokens = State.Periods[lastPeriodValue].RandomTokens;
            var randomHash = Hash.Empty;

            foreach(Hash randomToken in currentRandomTokens)
            {
                randomHash = State.RandomNumberGenerationContract.GetRandomNumber.Call(randomToken);
                var randomStatus = CheckRandomToken(randomToken, "1234");// | CheckRandomToken(randomToken, "2");
                //randomStatus = randomStatus | CheckRandomToken(randomToken, "3") | CheckRandomToken(randomToken, "4");
                if(randomStatus)    continue;
                else{
                    //成功开奖
                    State.Periods[lastPeriodValue].RandomHash = randomHash;
                    State.Periods[lastPeriodValue].LuckyNumber = Math.Abs(randomHash.ToInt64() % 100000);
                    State.Periods[lastPeriodValue].FinishTime = Context.CurrentBlockTime;
                    //加一期,能不能直接在这新建Newperiod？？
                    //++State.CurrentPeriod.Value;

                    //更新未开奖彩票状态
                    UpdateRewardOfLotteries();
        

                }
            }

            //判断开奖失败丢弃当前期


            return new Empty();
        }



        public override Empty NewLottery(LotteryInput input)
        {
            var bets = input.Bets;
            var rule = input.Rule;
            var saler = input.Saler;
            var rate = input.Rate;
            var tokenSymbol = State.TokenSymbol.Value ?? Context.Variables.NativeSymbol;
            var blockTime = Context.CurrentBlockTime;


            //初始化用户彩票池
            InitializeLotteriesList(Context.Sender);


            //获得可买期 检查当前期是否已经开奖
            var buyablePeriod = GetBuyablePeriod(new Empty()).PeriodNumber;


            var cost = rate.Mul(bets.Count).Mul(2).Mul(Decimals);
            var balance = State.TokenContract.GetBalance.Call(new GetBalanceInput{
                Symbol = tokenSymbol,
                Owner = Context.Sender
                }).Balance;
            //转账
            // 问: 余额不足，不让下注. 不能查txResult怎么判断？,发交易会直接throw出来这个问题。
            //检查余额不足
            Assert(balance.CompareTo(cost) >= 0,"No enough balance");

            //分销商不存在的话要初始化
            if (State.SalersBonus[saler] == null) State.SalersBonus[saler] = (long)10;

            var bonus = State.SalersBonus[saler];



            bonus = bonus.Mul(bets.Count).Mul(Decimals.Mul(2)).Mul(rate).Div(100);

            State.TokenContract.TransferToContract.Send(new TransferToContractInput
            {
                Symbol = tokenSymbol,
                // TODO: 这里可能会导致精度问题，后续需要看一下安全范围。
                Amount = cost//.Sub(bonus) //ELF的位数？？
            });
            // // 给分销人的钱
            // if (State.SalersBonus[saler] > 0)
            // {
            //     State.TokenContract.TransferFrom.Send(new TransferFromInput
            //     {
            //         From = Context.Sender, 
            //         To = saler,
            //         Symbol = tokenSymbol,
            //         Amount = bonus,
            //     });
            // }



            //发行彩票
            //LotteryBody abs;

            
            State.Lotteries2[State.CurrentLotteryId.Value]= new LotteryBody{
                Id = State.CurrentLotteryId.Value,
                Owner = Context.Sender,
                Period = buyablePeriod,
                Rule = rule,
                Bets = {bets},
                Drawed = false,
                Saler = saler,
                Bonus = State.SalersBonus[saler],
                HaveReward = -1,
                Rate = rate,
                AddedTime = blockTime
            };

            State.UnDoneLotteries[Context.Sender].Lotteries.Add(State.CurrentLotteryId.Value);
            

            //Event emit 现在JSSDK还TM不能subscribe event
            Context.Fire(new LotteryAdded{
                LotteryId = State.CurrentLotteryId.Value,
                PeriodNumber = State.CurrentPeriod.Value,
                Rule = rule,
                Owner = Context.Sender,
                AddedTime = blockTime,
                });



            //
            State.CurrentLotteryId.Value++;


            return new Empty();

        }

        //获取指定id彩票
        public override GetLotteryOutput GetLottery(GetLotteryInput input)
        {
            return new GetLotteryOutput{
                Lottery = State.Lotteries2[input.LotteryId],
            };
        }

        //获取发送者彩票
        public override GetLotteriesOutput GetLotteries(Empty input)
        {

            Assert(State.DoneLotteries[Context.Sender].Lotteries.Count != 0, "fucking 0!!!!!!!!");

            var res0 = new List<LotteryBody>();
            foreach(var l in State.DoneLotteries[Context.Sender].Lotteries ){
                res0.Add(State.Lotteries2[l]);
            }
            //ID降序 不让用
            //res0.Sort((x, y) => y.Id.CompareTo(x.Id));
            res0 = res0.OrderByDescending(d=>d.Id).ToList();

            var res = new GetLotteriesOutput{
                Lotteries = { res0 }
            };
            return res;
        }

        //带判断是否中奖的获取发送者彩票
        public override GetLotteriesOutput GetRewardedLotteries (GetLotteriesInput input)
        {

            Assert(State.UnDoneLotteries[Context.Sender].Lotteries.Count + State.DoneLotteries[Context.Sender].Lotteries.Count != 0, "fucking 0!!!!!!!!");

            var res0 = new List<LotteryBody>();
            foreach(var l in State.UnDoneLotteries[Context.Sender].Lotteries ){
                if (State.Lotteries2[l].HaveReward > 0 )
                {
                    res0.Add(State.Lotteries2[l]);
                }
                
            }
            //ID降序 不让用
            //res0.Sort((x, y) => y.Id.CompareTo(x.Id));
            res0 = res0.OrderByDescending(d=>d.Id).ToList();

            var res = new GetLotteriesOutput{
                Lotteries = { res0.Skip(input.Offset).Take(input.Limit) },
                TotalPages = res0.Count() / input.Limit
            };
            return res;
        }

        //
        public override GetLotteriesOutput GetAllLotteries (GetLotteriesInput input)
        {

            Assert(State.UnDoneLotteries[Context.Sender].Lotteries.Count + State.DoneLotteries[Context.Sender].Lotteries.Count != 0, "fucking 0!!!!!!!!");



            var res0 = new List<LotteryBody>();
            foreach(var l in State.UnDoneLotteries[Context.Sender].Lotteries ){
                res0.Add(State.Lotteries2[l]);
            }
            foreach(var l in State.DoneLotteries[Context.Sender].Lotteries ){
                res0.Add(State.Lotteries2[l]);
            }
            //ID降序 不让用
            //res0.Sort((x,y) => y.Id.CompareTo(x.Id) );
            res0 = res0.OrderByDescending(d=>d.Id).ToList();

            var res = new GetLotteriesOutput{
                Lotteries = { res0.Skip(input.Offset).Take(input.Limit) },
                TotalPages = res0.Count()/input.Limit
            };
            return res;
        }


        // public override TestOutput RequestNewRandom(Empty input)
        // {
            
        //     var txid = Context.TransactionId;
        //     var b = State.RandomNumberGenerationContract.RequestRandomNumber.Call(new Empty());
        //     //var b = Context.TransactionId;
        //     //State.RandomHash.Value = b;

        //     return new TestOutput
        //     {
        //         A = txid,
        //         B = b.TokenHash
        //     };
        // }


        //获取可买期
        public override BuyablePeriodOutput GetBuyablePeriod(Empty input)
        {
            var buyablePeriod = State.CurrentPeriod.Value;
            var randomStatus = CheckRandomToken(State.Periods[buyablePeriod].RandomTokens[0], "143");// | CheckRandomToken(State.Periods[buyablePeriod].RandomTokens[0], "1");
            var randomStatus2 = randomStatus | CheckRandomToken(State.Periods[buyablePeriod].RandomTokens[0], "2");// | CheckRandomToken(State.Periods[buyablePeriod].RandomTokens[0], "4");
            
            buyablePeriod = randomStatus ? buyablePeriod : buyablePeriod + 1 ;  //2的话可能这期废了 需要退钱

            //如果出随机数了就更新
            //if(!randomStatus2)   UpdateRandom(new Empty());

            return new BuyablePeriodOutput{
                PeriodNumber = buyablePeriod,
            } ;
        }

        //获取指定Token的随机数
        public override RandomOutput GetRandomNumberByToken(RandomByTokenInput input)
        {

            var hash = State.RandomNumberGenerationContract.GetRandomNumber.Call(input.Token);
            return new RandomOutput{

                RandomHash = hash,
                PeriodNumber = Math.Abs(hash.ToInt64() % 100000)
            };
        }



        //获取上一期已开数据
        public override RandomOutput GetRandomNumber(Empty input)
        {

            var current = State.CurrentPeriod.Value;
            //var hash = State.RandomNumbers[0];

            return new RandomOutput
            {
                PeriodNumber = current,
                RandomHash = State.RandomNumberGenerationContract.GetRandomNumber.Call(State.Periods[current].RandomTokens[0])
            };


        }

        //批量获取Random和对应period
        public override RandomsOutput GetRandomNumbers(RandomsInput input)
        {
            
            var currentPeriodNumber = State.CurrentPeriod.Value;
            Assert(currentPeriodNumber >= 0, "No record now.");

            var periodRandomNumbers = new List<RandomOutput>();
            var offset = input.Offset;
            var limit = input.Limit;

            var currentOffset = currentPeriodNumber - offset;
            var endOffset = (currentOffset - limit) < 0 ? 0 : (currentOffset - limit) ;

            while (currentOffset >= endOffset)
            {
                periodRandomNumbers.Add(new RandomOutput{
                    PeriodNumber = currentOffset,
                    RandomHash = State.RandomNumbers[currentOffset]
                });
                currentOffset--;
            }

            return new RandomsOutput
            {
                Offset = currentPeriodNumber - offset,
                Limit = endOffset,
                CurrentPeriod = currentPeriodNumber,
                Records = {periodRandomNumbers}
            };
        }

        /*public override Empty SetAdmin(Address input)
        {

            State.Admin.Value = input;

            return new Empty();

        }*/


        // public override Empty SetSaler(SetSalerInput input)
        // {
        //     IsAdmin();
        //     var address = input.Address;
        //     var bonus = input.Bonus;

        //     State.SalersBonus[address] = bonus;

        //     return new Empty();

        // }


        public override Empty SetRandom(Empty input)
        {

            State.RandomHash.Value = Hash.Empty;

            return new Empty();

        }

        //#####################################UTIL###############################################
        //取十进制数字最低几位
        private static long PickDigit(long origin, int n)
        {
            long result = long.MinValue;



            return result;
        }


        /*private Empty IsAdmin()
        {
            Assert( Context.Sender == State.Admin.Value, "fuck you!");

            return new Empty();
        }*/

        private long CalculateReward(LotteryBody lottery)
        {
            var bets = lottery.Bets;
            var odds = State.RuleOdds[lottery.Rule] != null ? State.RuleOdds[lottery.Rule] : Decimals.Mul(1);
            var random = State.Periods[lottery.Period].RandomHash;
            var rate = lottery.Rate != null ? lottery.Rate : Decimals.Mul(1);
            var lucky = State.Periods[lottery.Period].LuckyNumber;
            long reward = 0;

            //玩法按rule的二进制串中1出现的次数划分 0次大小单双 1次为直选   2次为组三/组六包号(11/110)    3次为组三和值/组六和值(111,1110) 4次二星组选(目前写法可能有漏洞)  5次二星直选和值(11111) 6次五星通选.
            var type = lottery.Rule.ToString().PadLeft(6,'0').Replace("0","").Length;
            var pos = lottery.Rule.ToString().PadLeft(5,'0').IndexOf("1");

            switch (type)
            {   
                //只有一个1为直选
                case 1:
                    reward = DigitMatch(random, bets.ToList(), pos) ? odds : 0;
                    reward = reward.Mul(rate);
                    break;
                case 2:
                    reward = ( lottery.Rule.ToString().Length==bets.ToString().Length && IsGroupNumber(lucky.ToString(), bets.ToList()) ) ? odds : 0;
                    reward = reward.Mul(rate);  
                    break;
                case 3:
                    reward = ( DigitSum(lucky,bets.ToList(),3 ) && IsGroupNumber(lucky.ToString()) == lottery.Rule) ? odds : 0;
                    reward = reward.Mul(rate);
                    break;
                case 4:
                    reward = bets.Any(b => b.Bet.Length==2 && b.Bet.ToList().GroupBy(x => x).All(g => g.Count() == 1) && b.Bet.ToList().All(n => lucky.ToString().PadLeft(5,'0').Substring(3, 2).ToList().Any(l => n == l))) ? odds : 0;
                    reward = reward.Mul(rate);
                    break;
                case 5:
                    reward = (DigitSum(lucky, bets.ToList(), 2) ) ? odds : 0;
                    reward = reward.Mul(rate);
                    break;

                case 0:
                    reward = DealRule0(lucky.ToString(), bets.ToList()) * odds;
                    reward = reward.Mul(rate);
                    break;
                case 6:
                    reward = DealGeneral5(lucky.ToString(), bets.ToList()) ;
                    reward = reward.Mul(rate);
                    break;
                default:
                        // nothing
                        break;
            }

            
            return reward;
        }



        //开奖后检查是否有未更新彩票
        private void UpdateRewardOfLotteries()
        {
            long from = State.CurrentCheckedLotteryId.Value;
            long to = State.CurrentLotteryId.Value;


            //这里有个问题 会不会出现靠后的id买到了考前的period？？？会导致from出错
            for(long i = from ; i < to ; i++ )
            {
                //Assert(State.Lotteries2[i].HaveReward.Equals(-1), "Something wrong");
                if( State.Lotteries2[i].Period >= State.CurrentPeriod.Value )   continue;
                State.Lotteries2[i].HaveReward = CalculateReward(State.Lotteries2[i]);

                //没中奖直接放入Done里
                if(State.Lotteries2[i].HaveReward == 0)    DealWithNoRewardLottery(State.Lotteries2[i].Id);
                from++;
            }

            State.CurrentCheckedLotteryId.Value = from;

        }

        //处理垃圾未中奖彩票
        private void DealWithNoRewardLottery(long id)
        {
            var owner = State.Lotteries2[id].Owner;
            InitializeLotteriesList(owner);

            State.DoneLotteries[owner].Lotteries.Add(id);


            //从UnDone里删掉
            State.UnDoneLotteries[owner].Lotteries.Remove(id);
            
        }

        private void InitializeOdds()
        {   
            State.RuleOdds[1] = Decimals.Mul(10); 
            State.RuleOdds[10] = Decimals.Mul(100); 
            State.RuleOdds[100] = Decimals.Mul(1000); 
            State.RuleOdds[1000] = Decimals.Mul(10000); 
            State.RuleOdds[10000] = Decimals.Mul(100000);

            State.RuleOdds[11] = Decimals.Mul(320);
            State.RuleOdds[110] = Decimals.Mul(160);

            State.RuleOdds[111] = Decimals.Mul(320);
            State.RuleOdds[1110] = Decimals.Mul(160);

            State.RuleOdds[1111] = Decimals.Mul(50);
            
            State.RuleOdds[11111] = Decimals.Mul(100);
            //大小单双
            State.RuleOdds[0] = Decimals.Mul(4);

        }

        private void InitializeLotteriesList(Address addr)
        {
            if(State.DoneLotteries[addr] == null) 
                State.DoneLotteries[addr] = new LotteriesList();
            if(State.UnDoneLotteries[addr] == null) 
                State.UnDoneLotteries[addr] = new LotteriesList();
        }

        private bool CheckRandomToken(Hash token, String errs)
        {

            // Error Code:
            // 0 - Exception
            // 1 - "6b86b273ff34fce19d6b804eff5a3f5747ada4eaa22f1d49c01e52ddb7875b4b" - Random Number Information Not Found
            // 2 - "d4735e3a265e16eee03f59718b9b5d03019c07d8b6c51f90da3a666eec13ab35" - Target Round Number is 0 (which is incorrect)
            // 3 - "4e07408562bedb8b60ce05c1decfe3ad16b72230967de01f640b7e4729b49fce" - Expected block height not reached
            // 4 - "4b227777d4dd1fc61c6f884f48641d02b4d121d3fd328cb08b5531fcacdabf8a" - Failed to get valid round information.
            //请求随机数后err的变化是 1->4->3

            //Assert(State.RandomNumberGenerationContract.GetRandomNumber.Call(randomToken) == Hash.FromString(err.ToString()), "RandomToken wrong!");
            var randomStatus = State.RandomNumberGenerationContract.GetRandomNumber.Call(token) == Hash.Empty;
            /*foreach(char err in errs)
            {   
                randomStatus |= (State.RandomNumberGenerationContract.GetRandomNumber.Call(token) == Hash.FromString(err.ToString()));
            }*/

            randomStatus |= errs.Any(err => State.RandomNumberGenerationContract.GetRandomNumber.Call(token) == Hash.FromString(err.ToString()));

            return randomStatus;
        }

        //调整Saler参数
        /*private void AdjustSalerBonus()
        {

        }*/



        private static bool DigitMatch(Hash random, List<BetBody> bets, int start, int length = 5)
        {
            //return true;
            length = start + length > 5 ? 5 - start : length;       //方便取后n位
            var lucky = Math.Abs(random.ToInt64() % 100000).ToString().PadLeft(5, '0').Substring(start, length);
            bool result = false;

            //foreach (BetBody bet in bets)
            //{
            //    result |= (lucky == bet.Bet.ToString().PadLeft(length, '0'));
            //}
            result = bets.Any(b => b.Bet.PadLeft(length, '0') == lucky);
            //用字符串的方式慢，但是简单
            return result;

        }




        //后n位求和
        private static bool DigitSum(long lucky, List<BetBody> bets, int n = 3)
        {
            long sum = 0;
            //bool result = false;


            while (n > 0)
            {
                sum += lucky % 10;
                lucky /= 10;
                n--;
            }

            // foreach(BetBody bet in bets)
            // {
            //     if (bet.Bet == sum) result = true;
            // }


            return bets.Any(bet => bet.Bet == sum.ToString());
        }


        private static bool IsGroupNumber(String lucky, List<BetBody> bets)
        {
            bool result = false;
            lucky = lucky.PadLeft(5,'0');
            var start = lucky.ToString().Length - 3;


            foreach (BetBody betBody in bets)
            {
                var bet = betBody.Bet;   //

                if (bet.Length != 0 && bet.Length != 2 && bet.Length != 3) continue;    //无效投注
                //只考虑组三或组六
                //Assert(bet.Length == 0 || bet.Length == 2 || bet.Length == 3, "not 3 or 6 number");
                

                //组三组六包号
                if (bet.Length != 0 && bet.ToCharArray().All(n => lucky.Substring(start, 3).ToCharArray().Any(l => n == l)))
                {
                    //组六号
                    if (bet.Length == 3 && !lucky.Substring(start, 3).ToCharArray().GroupBy(x => x)
                      .Any(g => g.Count() > 1)) result = true;

                    //组三号
                    if (bet.Length == 2 && lucky.Substring(start, 3).ToCharArray().GroupBy(x => x)
                      .Any(g => g.Count() == 2)) result = true;

                }
            }
            
            return result;

        }


        //只判断是否为组3或组6号
        private static int IsGroupNumber(String lucky)
        {
            int result = 0;
            lucky = lucky.PadLeft(5,'0');
            var start = lucky.ToString().Length - 3;
            //组三
            if (lucky.Substring(start, 3).ToCharArray().GroupBy(x => x)
              .Any(g => g.Count() == 2)) result = 111;


            //组六
            if (!lucky.Substring(start, 3).ToCharArray().GroupBy(x => x)
              .All(g => g.Count() == 1)) result = 1110;

            return result;
        }


        //处理大小单双
        private static int DealRule0(String lucky, List<BetBody> bets)
        {
            String[] result = new String[4];

            lucky = lucky.PadLeft(5, '0');

/*          result[0] = result[1] = lucky[3] > '4' ? "1" : "2";
            result[2] = result[3] = lucky[3] % 2 == 1 ? "3" : "4";
            result[0] = result[1] = lucky[3] > '4' ? "1" : "2";
            result[2] = result[3] = lucky[3] % 2 == 1 ? "3" : "4";
*/
            result[0] = String.Format("{0}{1}", (lucky[3] > '4' ? "1" : "2") , (lucky[4] > '4' ? "1" : "2"));
            result[1] = String.Format("{0}{1}", (lucky[3] > '4' ? "1" : "2"), (lucky[4] % 2 == 1 ? "3" : "4"));
            result[2] = String.Format("{0}{1}", (lucky[3] % 2 == 1 ? "3" : "4"), (lucky[4] > '4' ? "1" : "2"));
            result[3] = String.Format("{0}{1}", (lucky[3] % 2 == 1 ? "3" : "4"), (lucky[4] % 2 == 1 ? "3" : "4"));




            return bets.Count(bet => 1 == result.Count(res => res == bet.Bet));
        }


        private static long DealGeneral5(String lucky, List<BetBody> bets)
        {   
            long reward = 0;
            lucky = lucky.PadLeft(5, '0');


            reward += bets.Any(bet => bet.Bet == lucky) ? 20000L.Mul(Decimals) : 0 ;

            reward += bets.Any(bet => bet.Bet.Substring(0, 3) == lucky.Substring(0, 3)) ? 200L.Mul(Decimals) : 0;

            reward += bets.Any(bet => bet.Bet.Substring(2, 3) == lucky.Substring(2, 3)) ? 200L.Mul(Decimals) : 0;

            reward += bets.Any(bet => bet.Bet.Substring(0, 2) == lucky.Substring(0, 2)) ? 20L.Mul(Decimals) : 0;

            reward += bets.Any(bet => bet.Bet.Substring(3, 2) == lucky.Substring(3, 2)) ? 20L.Mul(Decimals) : 0;


            return reward;
        }


        // private void CallInline()
        // {
        //     var tokenContractAddress = Context.GetContractAddressByName(SmartContractConstants.TokenContractSystemName);
        //     Context.SendInline(tokenContractAddress, "Transfer", new TransferInput
        //     {
        //         To = ,
        //         Symbol = Context.Variables.NativeSymbol,// You will get "ELF" if this contract is deployed in AElf main chain.
        //         Amount = 100_000_00000000,// 100000 ELF tokens.
        //         Memo = "Gift."// Optional
        //     });
        // }

    }
}