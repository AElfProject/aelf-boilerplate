using System.Linq;
using AElf.Standards.ACS4;
using AElf.CSharp.Core.Extension;
using AElf.Types;
using Google.Protobuf;
using Google.Protobuf.WellKnownTypes;

namespace AElf.Contracts.ACS4DemoContract
{
    /// <summary>
    /// Implement ACS4 if you want to customize a consensus mechanism.
    /// </summary>
    public class ACS4DemoContract : ACS4DemoContractContainer.ACS4DemoContractBase
    {
        public override ValidationResult ValidateConsensusBeforeExecution(BytesValue input)
        {
            return new ValidationResult
            {
                Success = true
            };
        }

        public override ValidationResult ValidateConsensusAfterExecution(BytesValue input)
        {
            return new ValidationResult
            {
                Success = true
            };
        }

        public override TransactionList GenerateConsensusTransactions(BytesValue input)
        {
            return new TransactionList
            {
                Transactions =
                {
                    GenerateTransaction(nameof(Record), new Empty())
                }
            };
        }

        public override BytesValue GetConsensusExtraData(BytesValue input)
        {
            return Context.Sender.ToBytesValue();
        }

        public override ConsensusCommand GetConsensusCommand(BytesValue input)
        {
            return new ConsensusCommand
            {
                ArrangedMiningTime = Context.CurrentBlockTime.AddMilliseconds(1000),
                LimitMillisecondsOfMiningBlock = 1000,
                MiningDueTime = Context.CurrentBlockTime.AddMilliseconds(3000)
            };
        }

        public override Empty Record(Empty input)
        {
            State.Miners[Context.CurrentHeight] = Context.Sender;
            return new Empty();
        }
        
        private Transaction GenerateTransaction(string methodName, IMessage parameter) => new Transaction
        {
            From = Context.Sender,
            To = Context.Self,
            MethodName = methodName,
            Params = parameter.ToByteString(),
            RefBlockNumber = Context.CurrentHeight,
            RefBlockPrefix = ByteString.CopyFrom(Context.PreviousBlockHash.Value.Take(4).ToArray())
        };
    }
}