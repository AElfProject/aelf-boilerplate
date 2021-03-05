using System.Collections.Generic;
using System.Linq;
using AElf.CSharp.Core;
using AElf.CSharp.Core.Extension;
using AElf.Sdk.CSharp;
using AElf.Standards.ACS13;
using AElf.Types;
using Google.Protobuf;
using Google.Protobuf.WellKnownTypes;

namespace AElf.Contracts.OracleContract
{
    public partial class OracleContract : OracleContractContainer.OracleContractBase
    {
        public override Empty Initialize(Empty input)
        {
            State.TokenContract.Value =
                Context.GetContractAddressByName(SmartContractConstants.TokenContractSystemName);
            return new Empty();
        }

        public override Empty CreateRequest(CreateRequestInput input)
        {
            var expiration = Context.CurrentBlockTime.AddSeconds(State.ExpirationTime.Value);
            var requestId = GenerateRequestId(Context.Sender, input.Nonce);
            var payment = input.Payment;
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
                    designatedNodesCount >= State.MinimumResponses.Value &&
                    designatedNodesCount <= State.AvailableNodes.Value.NodeList.Count,
                    "Invalid count of designated nodes");
            }

            State.Commitments[requestId] = new Commitment
            {
                ParamsHash = paramsHash,
                DesignatedNodes = designatedNodes,
                Aggregator = input.Aggregator,
                Owner = Context.Sender,
                Payment = input.Payment
            };
            var roundCount = State.AnswerCounter[requestId];
            roundCount = roundCount.Add(1);
            State.AnswerCounter[requestId] = roundCount;
            State.DetailAnswers[requestId].RoundAnswers[roundCount] = new AnswerDetail();
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
            var answer = State.DetailAnswers[requestId].RoundAnswers[currentRoundCount];
            int minimumHashData = State.MinimumResponses.Value;
            Assert(answer.HashDataResponses < minimumHashData,
                $"Enough hash data for request {requestId}");
            VerifyNode(requestId, Context.Sender);
            var nodeInfo = answer.Responses.SingleOrDefault(x => x.Node == Context.Sender) ?? new NodeWithDetailData
            {
                Node = Context.Sender
            };

            var isHashDataExisted = nodeInfo.HashData != null;
            nodeInfo.HashData = input.HashData;
            if (isHashDataExisted)
            {
                State.DetailAnswers[requestId].RoundAnswers[currentRoundCount] = answer;
                return new Empty();
            }

            answer.Responses.Add(nodeInfo);
            answer.HashDataResponses = answer.HashDataResponses.Add(1);
            State.DetailAnswers[requestId].RoundAnswers[currentRoundCount] = answer;
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
            var answers = State.DetailAnswers[requestId].RoundAnswers[currentRoundCount];
            Assert(answers.HashDataResponses == State.MinimumResponses.Value,
                $"Not enough hash data received for request {requestId}");
            Assert(answers.DataWithSaltResponses < State.MinimumResponses.Value,
                $"Enough real data received for request {requestId}");
            VerifyNode(requestId, Context.Sender);
            var allNodeRealData = answers.Responses;
            var senderDataInfo = allNodeRealData.SingleOrDefault(x => x.Node == Context.Sender);
            Assert(senderDataInfo != null, "there is not hash data");
            VerifyHashDataWithSalt(senderDataInfo.HashData, input.RealData, input.Salt);
            senderDataInfo.RealData = input.RealData;
            answers.DataWithSaltResponses = answers.DataWithSaltResponses.Add(1);
            State.DetailAnswers[requestId].RoundAnswers[currentRoundCount] = answers;
            if (answers.DataWithSaltResponses != State.MinimumResponses.Value) return new Empty();
            var aggregatorAddress = State.Commitments[requestId].Aggregator;
            State.DetailAnswers.Remove(requestId);
            if (aggregatorAddress != null)
            {
                var aggregatorInput = TransferToAggregateInput(requestId, currentRoundCount, allNodeRealData);
                aggregatorInput.CallbackAddress = input.CallbackAddress;
                aggregatorInput.MethodName = input.MethodName;
                Context.SendInline(aggregatorAddress,
                    nameof(OracleAggregatorContractContainer.OracleAggregatorContractReferenceState.Aggregate),
                    aggregatorInput);
                return new Empty();
            }

            if (AggregateData(allNodeRealData, out var chooseData))
            {
                Context.Fire(new AnswerUpdated
                {
                    RequestId = requestId,
                    RoundId = currentRoundCount,
                    AgreedValue = chooseData
                });
                Context.SendInline(input.CallbackAddress, input.MethodName, chooseData);
                UpdateRoundData(requestId, currentRoundCount, chooseData);
                State.Commitments.Remove(requestId);
                return new Empty();
            }

            DealQuestionableNode(requestId, currentRoundCount, allNodeRealData);
            return new Empty();
        }

        private bool AggregateData(IEnumerable<NodeWithDetailData> allData, out ByteString chooseData)
        {
            var groupData = allData.GroupBy(x => x.RealData).ToList();
            var maxCount = groupData.Max(x => x.Count());
            if (maxCount < State.ThresholdToUpdateData.Value)
            {
                chooseData = null;
                return false;
            }

            chooseData = groupData.First(x => x.Count() == maxCount).Key;
            return true;
        }

        private void DealQuestionableNode(Hash requestId, long roundId, IEnumerable<NodeWithDetailData> allData)
        {
            State.Commitments.Remove(requestId);
        }

        private void UpdateRoundData(Hash requestId, long currentRoundCount, ByteString updateValue)
        {
            State.RoundLastAnswersInfo[requestId].RoundAnswers[currentRoundCount] = new LastUpdateAnswer
            {
                LastValue = updateValue,
                UpdatedTimestamps = Context.CurrentBlockTime
            };
        }
    }
}