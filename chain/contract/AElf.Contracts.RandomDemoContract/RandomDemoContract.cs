using System.Collections.Generic;
using AElf.Sdk.CSharp;
using AElf.Types;
using System.Collections;
using Google.Protobuf.WellKnownTypes;
using Google.Protobuf;
using System;

namespace AElf.Contracts.RandomDemoContract
{
    public partial class RandomDemoContract : RandomDemoContractContainer.RandomDemoContractBase
    {

        public override RequestRandomOutput RequestRandomList(RequestRandomParam input)
        {
            if (State.ACS6Contract.Value == null)
            {
                State.ACS6Contract.Value = Context.GetContractAddressByName(SmartContractConstants.ConsensusContractSystemName);
            }

            var requestInput = new Acs6.RequestRandomNumberInput{
                MinimumBlockHeight = State.Nonce.Value.Add(1)
            };

            State.Nonce.Value = State.Nonce.Value.Add(1);
            State.ACS6Contract.RequestRandomNumber.Send(requestInput);

            var tx = new Transaction{
                From = Context.Self,
                To = State.ACS6Contract.Value,
                MethodName = "RequestRandomNumber",
                Params = ByteString.CopyFrom(requestInput.ToByteArray())
            };

            State.RequestP.Value = new RequestRandomParam{
                List = {input.List},
                Number = input.Number
            };
            
            return new RequestRandomOutput
                {
                    TokenHash = tx.GetHash()
                };
        }

        public override RandomList GetRandomList(Hash tokenHash)
        {
            Assert(tokenHash != null && tokenHash != Hash.Empty, "Invalid input.");

            if (State.ACS6Contract.Value == null)
            {
                State.ACS6Contract.Value = Context.GetContractAddressByName(SmartContractConstants.ConsensusContractSystemName);
            }

            if (State.RequestP.Value == null)
            {
                Assert(false, "RequestP is null.");
            }

            int number = (int)State.RequestP.Value.Number;
            
            var randomSeed = State.ACS6Contract.GetRandomNumber.Call(tokenHash);

            var originList =  State.RequestP.Value.List;
            int listLength = originList.Count;

            if(number >= listLength){
                return new RandomList{
                    List =  {State.RequestP.Value.List} 
                };
            }

            var indexArr = new List<int>(); // number个index
            int intType;
            int i = 0;
            int count = 1;

            while(i < number){
                intType = (int)ConvertHashToLong(randomSeed,count)%listLength;

                if(intType < 0)
                    intType = intType + listLength;
                
                if(!indexArr.Contains(intType)){
                    indexArr.Add(intType);
                    i++;
                }
                count++;
            }

            

            var returnList = new List<listArrayData>();
            for (i = 0; i < number; i++)
            {
                returnList.Add(originList[indexArr[i]]);
            }

            return new RandomList{
                List =  {returnList}
            };
        }

        private long ConvertHashToLong(Hash hash,int except)
        {
            var bitArray = new BitArray(hash.Value.ToByteArray());
            var value = 0L;
            for (var i = 0; i < bitArray.Count; i++)
            {
                if(i == except)
                    continue;

                if (bitArray[i])
                    value += i.Mul(i).Mul(i);
            }

            return value;
        }
    }
}