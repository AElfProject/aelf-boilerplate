using System;
using System.Collections.Generic;
using System.Linq;
using AElf.Contracts.MultiToken;
using AElf.Sdk.CSharp;
using AElf.Types;
using Google.Protobuf.WellKnownTypes;

namespace AElf.Contracts.LotteryDemoContract
{
    public partial class LotteryDemoContract : LotteryDemoContractContainer.LotteryDemoContractBase
    {
        private const long Decimals = 100_000_000;
        private const int Price = 100;
        private const long lag = 80;

        public override Empty InitializeLotteryDemoContract(InitializeLotteryDemoContractInput input)
        {
            Assert(State.TokenSymbol.Value == null, "Already initialized");
            State.TokenSymbol.Value = input.TokenSymbol;
            State.CurrentLotteryId.Value = 0;
            State.CurrentPeriod.Value = 0;
            State.Admin.Value = Context.Sender;
            State.TokenContract.Value = Context.GetContractAddressByName(SmartContractConstants.TokenContractSystemName);
            State.AEDPoSContract.Value = Context.GetContractAddressByName(SmartContractConstants.ConsensusContractSystemName);

            return new Empty();
        }

        public override Empty Buy(BuyInput input)
        {
            Assert(input.Amount <100, "̫jb����");
            Assert(input.Amount > 0, "????");

            //��ʼ��
            State.OwnerToLotteries[Context.Sender] = State.OwnerToLotteries[Context.Sender] ?? new LotteryList { Ids = { } };

            State.TokenContract.TransferToContract.Send(new TransferToContractInput
            {
                Symbol = State.TokenSymbol.Value,
                Amount = Decimals.Mul(Price).Mul(input.Amount)
            }); ;

            var lottery = new Lottery();
            var hash = Hash.Empty;
            for (int i = 0; i < input.Amount; i++)
            {
                hash = GetHashToken();
                lottery = new Lottery
                {
                    Id = State.CurrentLotteryId.Value,
                    RandomHash = hash,
                    Owner = Context.Sender,
                    Level = 0,
                };
                State.Lotteries[State.CurrentLotteryId.Value] = lottery;
                State.LotteryToId[hash] = State.CurrentLotteryId.Value;
                State.OwnerToLotteries[Context.Sender].Ids.Add(State.CurrentLotteryId.Value);
                State.LotteryToOwner[hash] = Context.Sender;
                State.CurrentLotteryId.Value += 1;

            }


            return new Empty();
        }

        public override Empty Draw(DrawInput input)
        {
            Assert(Context.Sender == State.Admin.Value, "must be admin!");
            Assert(State.Periods[State.CurrentPeriod.Value].RandomHash == Hash.Empty, "latest already drawn");
      

            var randomHash = State.AEDPoSContract.GetRandomHash.Call(new SInt64Value
            {
                Value = State.Periods[State.CurrentPeriod.Value].BlockNumber,
            });

            State.Periods[State.CurrentPeriod.Value].RandomHash = randomHash;


            //��������������Ʊ
            DealWithLotteries(input);



            return new Empty();
        }

        public override Empty PrepareDraw(Empty input)
        {
            Assert(Context.Sender == State.Admin.Value, "must be admin!");
            //���û��δ���Ľ�
            Assert(State.Periods[State.CurrentPeriod.Value].RandomHash != Hash.Empty, "last draw doesn't finished");

            State.CurrentPeriod.Value += 1;
            State.Periods[State.CurrentPeriod.Value] = new PeriodBody
            {
                Id = State.CurrentPeriod.Value,
                BlockNumber = Context.CurrentHeight + lag,
                RandomHash = Hash.Empty
            };

            //��ʼ��
            State.PeriodToResultsList[State.CurrentPeriod.Value] = new RewardResultsList
            {
                RewardResults = { }
            };

            return new Empty();
        }

        public override Empty TakeReward(TakeRewardInput input)
        {
            Assert(State.LotteryToOwner[input.RandomHash] == Context.Sender, "You can only take your own lottert");
            Assert(State.Lotteries[State.LotteryToId[input.RandomHash]].Level != 0, "no reward");
            Assert(State.LotteryToData[input.RandomHash] == null, "Already Took");
            
            State.LotteryToData[input.RandomHash].Value = input.Data;


            return new Empty();
        }


        public override GetRewardResultOutput GetRewardResult(GetRewardResultInput input)
        {
            RewardResultsList results = State.PeriodToResultsList[input.Period];
            var randomHash = State.Periods[input.Period].RandomHash;
            var lotteries = new List<Lottery>();

            foreach (var result in results.RewardResults)
            {
                lotteries.Add(State.Lotteries[result.LotteryId]);
            }


            return new GetRewardResultOutput
            {
                Period = input.Period,
                RandomHash = randomHash,
                RewardLotteries = { lotteries }
            };
        }

        public override GetLotteriesOutput GetLotteries(Empty input)
        {
            var ids = State.OwnerToLotteries[Context.Sender].Ids;
            var res0 = new List<Lottery>();

            ids.All(id => {
                res0.Add(State.Lotteries[id]);
                return true;
            });


            return new GetLotteriesOutput
            {
                Lotteries = {res0},
            };
        }


        private void DealWithLotteries(DrawInput input)
        {
            var pool = new List<ulong>();
            int luckyIndex = 0;
            ulong luckyId = 0;
            ulong category = 1;   //categoryΪ��Ʒ   ����LevelsCount=[2,0,3,6,0] category��1��5  categoryΪ1�Ľ�Ʒ��Ϊ2��2�Ľ�Ʒ��Ϊ0���Դ�����
            var randomHash = State.Periods[State.CurrentPeriod.Value].RandomHash;


            //��δ�н���lottery����pool
            for (ulong i = 0; i < State.CurrentLotteryId.Value; i++)
            {
                if (State.Lotteries[i].Level == 0)
                    pool.Add(i);
            }

            Assert(pool.Count() > 0, "no available lottery");

            //��level���г齱���в��ٱ���ǿ��ת�����а�ȫ����
            foreach (var count in input.LevelsCount)
            {
                ulong i = count;
                while (i > 0)
                {
                    luckyIndex =  (int) randomHash.ToInt64() % pool.Count();
                    luckyId = pool.Skip(luckyIndex).Take(1).First();
                    State.Lotteries[luckyId].Level = category;
                    State.PeriodToResultsList[State.CurrentPeriod.Value].RewardResults.Add(new RewardResult
                    {
                        LotteryId = luckyId,
                        //RandomHash = State.Lotteries[luckyId].RandomHash
                    });

                    pool.Remove(luckyId);
                    //���϶��Լ�hash�����������
                    randomHash = Hash.FromByteArray(randomHash.ToByteArray());

                    i--;
                }
                category++;
            }

        }
        private Hash GetHashToken()
        {
            var hash = Hash.Empty;
            ulong index = 0;

            do
            {
                Hash.FromString(Context.Sender.ToString()+index++.ToString());
            } while (State.LotteryToOwner[hash] == null);

            return hash;
        }



    }
}