using System.Collections.Generic;
using System.Linq;
using AElf.Contracts.MultiToken;
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
                    designatedNodesCount > State.ThresholdResponses.Value,
                    "Invalid count of designated nodes");
            }

            State.Commitments[requestId] = new Commitment
            {
                ParamsHash = paramsHash,
                DesignatedNodes = designatedNodes,
                Aggregator = input.Aggregator
            };
            if (State.CommitmentsOwner[requestId] == null)
            {
                State.CommitmentsOwner[requestId] = Context.Sender;
            }
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
            int thresholdResponses = State.ThresholdResponses.Value;
            Assert(answer.HashDataResponses < thresholdResponses,
                $"Enough hash data for request {requestId}");
            VerifyNode(requestId, Context.Sender);
            var nodeInfo = answer.Responses.SingleOrDefault(x => x.Node == Context.Sender) ?? new NodeWithDetailData
            {
                Node = Context.Sender
            };

            bool isHashDataExisted = nodeInfo.HashData != null;
            nodeInfo.HashData = input.HashData;
            if (isHashDataExisted)
            {
                State.DetailAnswers[requestId].RoundAnswers[currentRoundCount] = answer;
                return new Empty();
            }

            answer.Responses.Add(nodeInfo);
            answer.HashDataResponses = answer.HashDataResponses.Add(1);
            State.DetailAnswers[requestId].RoundAnswers[currentRoundCount] = answer;
            if (answer.HashDataResponses == thresholdResponses)
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
            Assert(answers.HashDataResponses == State.ThresholdResponses.Value,
                $"Not enough hash data received for request {requestId}");
            Assert(answers.DataWithSaltResponses < State.ThresholdResponses.Value,
                $"Enough real data received for request {requestId}");
            VerifyNode(requestId, Context.Sender);
            var allNodeRealData = answers.Responses;
            var senderDataInfo = allNodeRealData.SingleOrDefault(x => x.Node == Context.Sender);
            Assert(senderDataInfo != null, "there is not hash data");
            VerifyHashDataWithSalt(senderDataInfo.HashData, input.RealData, input.Salt);
            senderDataInfo.RealData = input.RealData;
            answers.DataWithSaltResponses = answers.DataWithSaltResponses.Add(1);
            State.DetailAnswers[requestId].RoundAnswers[currentRoundCount] = answers;
            
            // pay to node
            PayToNode(requestId, input.Payment, Context.Sender);
            
            // update statistic information
            AddQueryCount(Context.Sender);
            
            if (answers.DataWithSaltResponses != State.ThresholdResponses.Value) return new Empty();
            var aggregatorAddress = State.Commitments[requestId].Aggregator;
            if (aggregatorAddress != null)
            {
                var aggregatorInput = TransferToAggregateInput(requestId, currentRoundCount, allNodeRealData);
                aggregatorInput.CallbackAddress = input.CallbackAddress;
                aggregatorInput.MethodName = input.MethodName;
                Context.SendInline(aggregatorAddress,
                    nameof(OracleAggregatorContractContainer.OracleAggregatorContractReferenceState.Aggregate),
                    aggregatorInput);
                ClearRequestInfo(requestId);
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
                ClearRequestInfo(requestId);
                return new Empty();
            }

            DealQuestionableQuery(requestId, currentRoundCount, allNodeRealData);
            ClearRequestInfo(requestId);
            Context.Fire(new QuestionableQueryFound
            {
                RequestId = requestId,
                RoundId = currentRoundCount
            });
            return new Empty();
        }
        
        public override Empty RemoveQuestionableQueryInfo(RemoveQuestionableQueryInfoInput input)
        {
            var owner = State.CommitmentsOwner[input.RequestId];
            Assert(owner != null && Context.Sender == owner, "Not authorized");
            var requestQuestionableInfo = State.QuestionableInfo[input.RequestId];
            requestQuestionableInfo.QuestionableQueryInformation.Remove(input.RoundId);
            State.QuestionableInfo[input.RequestId] = requestQuestionableInfo;
            return new Empty();
        }

        public override Empty RemoveRedundantRoundData(RemoveRedundantRoundDataInput input)
        {
            var owner = State.CommitmentsOwner[input.RequestId];
            Assert(owner != null && Context.Sender == owner, "Not authorized");
            State.RoundLastAnswersInfo.Remove(input.RequestId);
            if (State.Commitments[input.RequestId] == null)
            {
                State.CommitmentsOwner.Remove(input.RequestId);
            }
            return new Empty();  
        }

        private void PayToNode(Hash requestId, long payment, Address node)
        {
            var user = State.CommitmentsOwner[requestId];
            State.TokenContract.TransferFrom.Send(new TransferFromInput
            {
                Symbol = TokenSymbol,
                From = user,
                To = Context.Self,
                Amount = payment
            });
            var nodeInfo = State.NodeInfo[node];
            nodeInfo.Withdrawable = nodeInfo.Withdrawable.Add(payment);
            State.NodeInfo[node] = nodeInfo;
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

        private void DealQuestionableQuery(Hash requestId, long roundId, IEnumerable<NodeWithDetailData> allData)
        {
            var questionableInfo = State.QuestionableInfo[requestId];
            questionableInfo.QuestionableQueryInformation[roundId] = new QuestionableQueryInfo
            {
                UpdateTime = Context.CurrentBlockTime
            };
            questionableInfo.QuestionableQueryInformation[roundId].AllQuestionableNodes.AddRange(allData.Select(x =>
                new QuestionableNodeInfo
                {
                    Node = x.Node,
                    RealValue = x.RealData
                }));
            State.QuestionableInfo[requestId] = questionableInfo;
        }

        private void UpdateRoundData(Hash requestId, long currentRoundCount, ByteString updateValue)
        {
            State.RoundLastAnswersInfo[requestId].RoundAnswers[currentRoundCount] = new LastUpdateAnswer
            {
                LastValue = updateValue,
                UpdatedTimestamps = Context.CurrentBlockTime
            };
        }

        private void ClearRequestInfo(Hash requestId)
        {
            State.DetailAnswers.Remove(requestId);
            State.Commitments.Remove(requestId);
        }

        private void AddQueryCount(Address node)
        {
            var statisticInfo = State.NodeStatistic[node]?? new NodeStatistic();
            statisticInfo.QueryCount = statisticInfo.QueryCount.Add(1);
        }
    }
}