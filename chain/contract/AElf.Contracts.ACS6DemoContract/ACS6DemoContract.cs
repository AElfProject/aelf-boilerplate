using Acs6;
using AElf.CSharp.Core;
using AElf.Sdk.CSharp;
using AElf.Types;
using Google.Protobuf.WellKnownTypes;

namespace AElf.Contracts.ACS6DemoContract
{
    /// <summary>
    /// ACS6 can help developers implement a commit-reveal scheme random number generator.
    /// </summary>
    public class ACS6DemoContract : ACS6DemoContractContainer.ACS6DemoContractBase
    {
        public override Empty Initialize(Empty input)
        {
            State.ConsensusContract.Value =
                Context.GetContractAddressByName(SmartContractConstants.ConsensusContractSystemName);
            return new Empty();
        }

        public override RandomNumberOrder RequestRandomNumber(Hash input)
        {
            var currentHeight = Context.CurrentHeight;
            State.RequestHeights[Context.Sender] = currentHeight;
            State.Commitments[Context.Sender] = input;
            return new RandomNumberOrder
            {
                TokenHash = input,
                BlockHeight = currentHeight.Add(ACS6DemoContractConstants.WaitBlockHeight)
            };
        }

        public override Hash GetRandomNumber(Hash input)
        {
            var requestHeight = State.RequestHeights[Context.Sender];
            Assert(
                requestHeight != 0 && requestHeight.Add(ACS6DemoContractConstants.WaitBlockHeight) <=
                Context.CurrentHeight, "Incorrect request height.");
            var userCommitment = State.Commitments[Context.Sender];
            Assert(HashHelper.ComputeFrom(input) == userCommitment, "Incorrect commitment.");
            var properInValue = State.ConsensusContract.GetRandomHash.Call(new Int64Value {Value = requestHeight});
            // TODO: In test environment, we cannot get in value.
            if (properInValue == null)
            {
                // Just fake one.
                properInValue = Context.GenerateId(Context.Self, input);
            }

            return HashHelper.ConcatAndCompute(input, properInValue);
        }
    }
}