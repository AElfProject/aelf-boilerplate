using System;
using System.Collections.Generic;
using System.Linq;
using AElf.CSharp.Core;
using AElf.Sdk.CSharp;
using AElf.Standards.ACS13;
using AElf.Types;
using Google.Protobuf;
using Google.Protobuf.WellKnownTypes;

namespace AElf.Contracts.OracleContract
{
    public partial class OracleContract
    {
        private void VerifyRequest(Hash requestId, long payment, Address callbackAddress, string methodName,
            Timestamp expiration)
        {
            var commitment = State.Commitments[requestId];
            if (commitment == null)
                throw new AssertionException($"Request id {requestId} does not exist");
            var paramsHash = GenerateParamHash(payment, callbackAddress, methodName, expiration);
            Assert(commitment.ParamsHash == paramsHash, "Params do not match request ID");
        }

        private void VerifyNode(Hash requestId, Address sender)
        {
            var commitment = State.Commitments[requestId];
            Assert(!State.QuestionableNodes[sender], "questionable node");
            Assert(State.AuthorizedNodes[sender], "Invalid node");
            if(commitment.DesignatedNodes == null)
                return;
            var nodeList = commitment.DesignatedNodes.NodeList;
            if (nodeList.Any())
            {
                Assert(nodeList.Contains(sender), "Sender is not authorized");
            }
        }

        private Hash GenerateParamHash(long payment, Address callbackAddress, string methodName,
            Timestamp expiration)
        {
            var paramsHash = HashHelper.ComputeFrom(payment);
            if (!string.IsNullOrEmpty(methodName))
            {
                var callbackHash = HashHelper.ComputeFrom(callbackAddress);
                paramsHash = HashHelper.ConcatAndCompute(paramsHash, callbackHash);
                var methodNameHash = HashHelper.ComputeFrom(methodName);
                paramsHash = HashHelper.ConcatAndCompute(paramsHash, methodNameHash);
            }
            var expirationHash = HashHelper.ComputeFrom(expiration.ToBytesValue());
            paramsHash = HashHelper.ConcatAndCompute(paramsHash, expirationHash);
            return paramsHash;
        }

        private Hash ComputeQueryHash(CallbackInfo callbackInfo, params string[] queryParameters)
        {
            var queryHash = HashHelper.ComputeFrom(callbackInfo);
            foreach (var parameter in queryParameters)
            {
                var parameterHash = HashHelper.ComputeFrom(parameter);
                queryHash = HashHelper.ConcatAndCompute(queryHash, parameterHash);
            }

            return queryHash;
        }

        private int GetCommitStageNodeCountThreshold(int nodeCount)
        {
            return Math.Max(nodeCount.Mul(2).Div(3).Add(1), State.ConfirmThreshold.Value);
        }
        
        private int GetRevealStageNodeCountThreshold(int nodeCount)
        {
            return Math.Max(nodeCount.Div(3).Add(1), State.AgreeThreshold.Value);
        }

        private void VerifyHashDataWithSalt(Hash savedHash, ByteString rawData, string salt)
        {
            var saltHash = HashHelper.ComputeFrom(salt);
            var dataHash = HashHelper.ComputeFrom(rawData.ToByteArray());
            dataHash = HashHelper.ConcatAndCompute(dataHash, saltHash);
            Assert(savedHash == dataHash, "Wrong real data or salt");
        }

        private AggregateInput TransferToAggregateInput(Hash requestId, long round, IEnumerable<NodeWithDetailData> nodeList)
        {
            var aggregateInput = new AggregateInput
            {
                RequestId = requestId,
                RoundId = round
            };
            var responses = nodeList.Select(x => new NodeWithData
            {
                Node = x.Node,
                RealData = x.RealData
            }).ToList();
            aggregateInput.Responses.AddRange(responses);
            return aggregateInput;
        }

        private void UpdateIsAvailableNodesEnoughState()
        {
            var availableNodes = State.AvailableNodes.Value;
            var currentAvailableNodeCount = availableNodes.NodeList.Count(x => !State.QuestionableNodes[x]);
            State.IsAvailableNodesEnough.Value = currentAvailableNodeCount >= State.MinimumDesignatedNodeCount.Value;
        }
    }
}