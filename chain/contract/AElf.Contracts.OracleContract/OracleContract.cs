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
            var requestId = GenerateRequestId(Context.Sender, input.Nonce);
            long payment = input.Payment;
            var callbackAddress = input.CallbackAddress;
            var methodName = input.MethodName;
            var aggregator = input.Aggregator;
            var paramsHash = GenerateParamHash(payment, callbackAddress, methodName, expiration);
            Assert(State.Commitments[requestId] == null, "Repeated request");
            var designatedNodes = input.DesignatedNodes;
            var designatedNodesCount = designatedNodes.NodeList.Count;
            if (designatedNodesCount > 0)
            {
                Assert(
                    designatedNodesCount >= State.MinimumHashData.Value &&
                    designatedNodesCount <= State.AvailableNodes.Value.NodeList.Count,
                    "Invalid count of designated nodes");
            }
            State.Commitments[requestId] = new Commitment
            {
                ParamsHash = paramsHash,
                DataVersion = input.DataVersion,
                DesignatedNodes = designatedNodes,
                Aggregator = input.Aggregator
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
            VerifyRequest(requestId, input.Payment, input.CallbackAddress, input.MethodName, input.CancelExpiration);
            var currentRoundCount = State.AnswerCounter[requestId];
            var answer = State.Answers[requestId][currentRoundCount];
            int minimumHashData = State.MinimumHashData.Value;
            Assert( answer.HashDataResponses < minimumHashData,
                $"Enough hash data for request {requestId}");
            VerifyNode(requestId, Context.Sender);
            Assert(State.HashData[requestId][Context.Sender] == null, $"{Context.Sender} has sent data hash");
            State.HashData[requestId][Context.Sender] = input.HashData;
            answer.HashDataResponses = answer.HashDataResponses.Add(1);
            State.Answers[requestId][currentRoundCount] = answer;
            if (answer.HashDataResponses == minimumHashData)
            {
                Context.Fire(new GetEnoughData
                {
                    RequestId = requestId
                });
            }
            return new Empty();
        }

        public override Empty SendDataWithSalt(SendDataWithSaltInput input)
        {
            var requestId = input.RequestId;
            VerifyRequest(requestId, input.Payment, input.CallbackAddress, input.MethodName, input.CancelExpiration);
            var currentRoundCount = State.AnswerCounter[requestId];
            var answer = State.Answers[requestId][currentRoundCount];
            Assert( answer.HashDataResponses == State.MinimumHashData.Value,
                $"Not enough hash data received for request {requestId}");
            VerifyNode(requestId, Context.Sender);
            
            
            
            return new Empty();
        }
    }
}