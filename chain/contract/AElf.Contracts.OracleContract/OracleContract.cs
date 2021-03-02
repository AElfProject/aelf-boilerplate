using AElf.CSharp.Core;
using AElf.CSharp.Core.Extension;
using AElf.Sdk.CSharp;
using Google.Protobuf.WellKnownTypes;

namespace AElf.Contracts.OracleContract
{
    public partial class OracleContract : OracleContractContainer.OracleContractBase
    {
        public override Empty CreateRequest(CreateRequestInput input)
        {
            var expiration = Context.CurrentBlockTime.AddSeconds(State.ExpirationTime.Value);
            var requestId = GenerateRequestId(Context.Sender, Context.TransactionId);
            long payment = input.Payment;
            var callbackAddress = input.CallbackAddress;
            var methodName = input.MethodName;
            var aggregator = input.Aggregator;
            var paramsHash = GenerateParamHash(payment, aggregator, callbackAddress, methodName, expiration);
            Assert(State.Commitments[requestId] == null, "repeated request");
            var designatedNodes = input.DesignatedNodes;
            var designatedNodesCount = designatedNodes.NodeList.Count;
            if (designatedNodesCount > 0)
            {
                Assert(
                    designatedNodesCount >= State.MinimumHashData.Value &&
                    designatedNodesCount <= State.AvailableNodes.Value.NodeList.Count,
                    "invalid count of designated nodes");
            }
            State.Commitments[requestId] = new Commitment
            {
                ParamsHash = paramsHash,
                DataVersion = input.DataVersion,
                DesignatedNodes = designatedNodes
            };
            var roundCount = State.AnswerCounter[requestId];
            roundCount = roundCount.Add(1);
            State.AnswerCounter[requestId] = roundCount;
            State.Answers[requestId][roundCount] = new Answer();
            Context.Fire(new NewRequest
            {
                Requester = Context.Sender,
                RequestId = requestId,
                Payment = payment,
                CallbackAddress = callbackAddress,
                MethodName = methodName,
                CancelExpiration = expiration,
                UrlToQuery = input.UrlToQuery,
                AttributeToFetch = input.AttributeToFetch,
                Aggregator = aggregator
            });

            return new Empty();
        }

        public override Empty SendHashData(SendHashDataInput input)
        {
            var requestId = input.RequestId;
            var commitment = State.Commitments[requestId];
            Assert(commitment != null, "repeated request");
            var currentRoundCount = State.AnswerCounter[requestId];
            var answer = State.Answers[requestId][currentRoundCount];
            Assert( answer.HashDataResponses < State.MinimumHashData.Value,
                $"enough hash data for request {requestId}");
            var nodeList = commitment.DesignatedNodes.NodeList;
            if (nodeList.Count > 0)
            {
                Assert(nodeList.Contains(Context.Sender), "sender is not authorized");
            }
            Assert(State.OracleHashData[requestId][Context.Sender] == null, $"{Context.Sender} has sent data hash");
            State.OracleHashData[requestId][Context.Sender] = input.HashData;
            answer.HashDataResponses = answer.HashDataResponses.Add(1);
            State.Answers[requestId][currentRoundCount] = answer;
            return new Empty();
        }

        public override Empty SendDataWithSalt(SendDataWithSaltInput input)
        {
            return base.SendDataWithSalt(input);
        }
    }
}