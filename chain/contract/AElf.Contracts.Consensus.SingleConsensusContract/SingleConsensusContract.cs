using System.Linq;
using Acs4;
using AElf.Sdk.CSharp;
using AElf.Types;
using Google.Protobuf;
using Google.Protobuf.WellKnownTypes;

namespace AElf.Contracts.Consensus.SingleConsensusContract
{
    public class SingleConsensusContract : SingleConsensusContractContainer.SingleConsensusContractBase
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