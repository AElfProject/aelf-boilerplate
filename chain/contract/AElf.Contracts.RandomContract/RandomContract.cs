using System;
using System.Collections;
using AElf.Types;
using AElf.Sdk.CSharp;
using Google.Protobuf.WellKnownTypes;

namespace AElf.Contracts.RandomContract
{
    /// <summary>
    /// The C# implementation of the contract defined in random_contract.proto that is located in the "protobuf"
    /// folder.
    /// Notice that it inherits from the protobuf generated code. 
    /// </summary>
    public class RandomContract : RandomContractContainer.RandomContractBase
    {
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

        public override Hash GetRandomHash(Empty input)
        {
            var randomHash = State.AEDPoSContract.GetRandomHash.Call(new Int64Value
            {
                Value = Context.CurrentHeight - 1
            });
            
            return randomHash;
        }
        
        public override GetRandomNumberOutput GetRandomNumber(GetRandomInput input)
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