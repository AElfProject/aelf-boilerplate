using System;
using System.Collections;
using System.Linq;
using AElf.Types;
using AElf.Sdk.CSharp;
using Google.Protobuf.WellKnownTypes;
using Org.BouncyCastle.Crypto.Engines;

namespace AElf.Contracts.RandomContract
{
    /// <summary>
    /// The C# implementation of the contract defined in random_contract.proto that is located in the "protobuf"
    /// folder.
    /// Notice that it inherits from the protobuf generated code. 
    /// </summary>
    public class RandomContract : RandomContractContainer.RandomContractBase
    {
        private const int HistoryLimit = 50;
        private const int RequestLimit = 30;
        private const int BlockInterval = 16;
        /// <summary>
        /// The implementation of the Hello method. It takes no parameters and returns on of the custom data types
        /// defined in the protobuf definition file.
        /// </summary>
        /// <param name="input">Empty message (from Protobuf)</param>
        /// <returns>a HelloReturn</returns>
        public override HelloReturn Hello(Empty input)
        {
            State.AEDPoSContract.Value =
                Context.GetContractAddressByName(SmartContractConstants.ConsensusContractSystemName);
            return new HelloReturn {Value = "Hello World!"};
        }
        
        public override RequestRandomInformation RequestRandom(RequestRandomInput input)
        {
            Assert(input.BlockHeight > Context.CurrentHeight + BlockInterval, 
                "Suggested to request random data after 8 blocks");
            var requestRandomInformationList = RegisterOrGetRandomInformation(Context.Sender);
            
            Assert(requestRandomInformationList.List.Count < RequestLimit,
                $"User {Context.Sender} request to much random data at the same time");
            var information = new RequestRandomInformation
            {
                Random = 0,
                RandomBlockHeight = input.BlockHeight,
                CurrentBlockHeight = -1,
                RequestBlockHeight = Context.CurrentHeight,
                Min = input.Min,
                Max = input.Max,
                Hash = null,
                PlayId = Context.TransactionId,
            };
            
            requestRandomInformationList.List.Add(information);
            
            State.RequestRandomInformationList[Context.Sender] = requestRandomInformationList;
            return information;
        }
        
        public override RequestRandomInformation GetRandom(Hash input)
        {
            var randomInformationList = GetRandomInformation(Context.Sender);
            Assert(randomInformationList.List.Count > 0, 
                "No valid request, please request random data at first");
            
            var randomInformation = randomInformationList.List.FirstOrDefault(i => i.PlayId == input);
            Assert(randomInformation != null, "Invalid request transaction id");
            
            Assert(Context.CurrentHeight > randomInformation.RandomBlockHeight, 
                $"Please wait {randomInformation.RandomBlockHeight - Context.CurrentHeight} blocks");
            
            var randomHash = State.AEDPoSContract.GetRandomHash.Call(new Int64Value
            {
                Value = randomInformation.RandomBlockHeight
            });
            
            var convertHashToInt64Input = new ConvertHashToInt64Input
            {
                Min = randomInformation.Min,
                Max = randomInformation.Max,
                Hash = randomHash
            };
            
            var randomNumber = UtilConvertHashToInt64(convertHashToInt64Input);

            randomInformation.Hash = randomHash;
            randomInformation.Random = randomNumber.Value;
            randomInformation.CurrentBlockHeight = Context.CurrentHeight;

            State.RequestRandomInformationList[Context.Sender].List.Remove(randomInformation);

            if (State.RequestRandomInformationListCompleted[Context.Sender] == null)
            {
                State.RequestRandomInformationListCompleted[Context.Sender] = new RequestRandomInformationList
                {
                    List = { randomInformation}
                };
            }
            else
            {
                State.RequestRandomInformationListCompleted[Context.Sender].List.Add(randomInformation);   
            }
            
            if (State.RequestRandomInformationListCompleted[Context.Sender].List.Count > HistoryLimit)
            {
                State.RequestRandomInformationListCompleted[Context.Sender].List.RemoveAt(0);
            }
            
            return randomInformation;
        }

        private RequestRandomInformationList RegisterOrGetRandomInformation(Address input)
        {
            if (State.RequestRandomInformationList[input] == null)
            {
                State.RequestRandomInformationList[input] = new RequestRandomInformationList();
            }

            if (State.RequestRandomInformationList[input] == null)
            {
                State.RequestRandomInformationListCompleted[input] = new RequestRandomInformationList();
            }
            return State.RequestRandomInformationList[input];
        }

        public override RequestRandomInformationList GetRandomInformation(Address input)
        {
            var informationList = State.RequestRandomInformationList[input];
            Assert(informationList != null, $"User {input} never request random data.");
            return informationList;
        }
        
        public override RequestRandomInformationList GetRandomInformationCompleted(Address input)
        {
            var informationList = State.RequestRandomInformationListCompleted[input];
            Assert(informationList != null, $"User {input} never got random data.");
            return informationList;
        }
        

        public override GetRandomNumberOutput GetRandomNumber(GetRandomNumberInput input)
        {
            // Assert(Context.CurrentHeight >= input.BlockHeight, "Block height not enough.");
            Assert(input.Max > input.Min, "Max > min is expected.");
            var randomHash = State.AEDPoSContract.GetRandomHash.Call(new Int64Value
            {
                Value = Context.CurrentHeight - 1
            });
            
            var convertHashToInt64Input = new ConvertHashToInt64Input
            {
                Min = input.Min,
                Max = input.Max,
                Hash = randomHash
            };

            var randomNumber = UtilConvertHashToInt64(convertHashToInt64Input);

            return new GetRandomNumberOutput
            {
                Random = randomNumber.Value,
                Hash = randomHash,
                BlockHeight = Context.CurrentHeight - 1
            };
        }

        public override Int64Value ConvertHashToInt64(ConvertHashToInt64Input input)
        {
            return UtilConvertHashToInt64(input);
        }

        private Int64Value UtilConvertHashToInt64(ConvertHashToInt64Input input)
        {
            // Todo: Replace, use convertHashToInt64();
            var luckNumber = (int) Math.Abs(input.Hash.ToInt64() % (input.Max - input.Min));
            
            return new Int64Value
            {
                Value = luckNumber + input.Min
            };
        }
    }
}