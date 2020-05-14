using System.Linq;
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
            // The input will be treated as a commitment of the sender.
            State.Commitments[Context.Sender] = input;
            var requestSlot = GetCurrentSlotInformation();
            State.RequestSlots[Context.Sender] = requestSlot;
            return new RandomNumberOrder
            {
                TokenHash = input,
                BlockHeight = requestSlot.BlockHeight.Add(ACS6DemoContractConstants.WaitBlockHeight)
            };
        }

        public override Hash GetRandomNumber(Hash input)
        {
            var requestSlot = State.RequestSlots[Context.Sender];
            Assert(
                requestSlot != null && requestSlot.BlockHeight.Add(ACS6DemoContractConstants.WaitBlockHeight) <=
                Context.CurrentHeight, "Incorrect request slot.");
            var userCommitment = State.Commitments[Context.Sender];
            Assert(HashHelper.ComputeFrom(input) == userCommitment, "Incorrect commitment.");
            var properInValue = GetNextInValueOfSlot(State.RequestSlots[Context.Sender]);
            return HashHelper.ConcatAndCompute(input, properInValue);
        }

        private Hash GetNextInValueOfSlot(RequestSlot requestSlot)
        {
            var round = State.ConsensusContract.GetRoundInformation.Call(new Int64Value
            {
                Value = requestSlot.RoundNumber
            });
            if (requestSlot.Order < round.RealTimeMinersInformation.Count)
            {
                return round.RealTimeMinersInformation.Values
                    .FirstOrDefault(i => i.Order > requestSlot.Order && i.PreviousInValue != null)
                    ?.PreviousInValue;
            }

            var nextRound = State.ConsensusContract.GetRoundInformation.Call(new Int64Value
            {
                Value = requestSlot.RoundNumber.Add(1)
            });
            return nextRound.RealTimeMinersInformation.Values
                .FirstOrDefault(i => i.PreviousInValue != null)
                ?.PreviousInValue;
        }

        /// <summary>
        /// Get Latest Out Value from AEDPoS Contract.
        /// </summary>
        /// <returns></returns>
        private RequestSlot GetCurrentSlotInformation()
        {
            var round = State.ConsensusContract.GetCurrentRoundInformation.Call(new Empty());
            var lastMinedMiner = round.RealTimeMinersInformation.Values.Where(i => i.OutValue != null)
                .OrderByDescending(i => i.Order).FirstOrDefault();

            return new RequestSlot
            {
                Order = lastMinedMiner?.Order ?? 0,
                RoundNumber = round.RoundNumber,
                BlockHeight = Context.CurrentHeight
            };
        }
    }
}