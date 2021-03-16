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
        public override Empty Initialize(InitializeInput input)
        {
            Assert(!State.Initialized.Value, "Already initialized.");
            InitializeContractReferences();

            // Controller will be the sender by default.
            State.Controller.Value = Context.Sender;

            CreateToken();

            input.DefaultMinimumAvailableNodesCount = input.DefaultMinimumAvailableNodesCount == 0
                ? DefaultMinimumAvailableNodesCount
                : input.DefaultMinimumAvailableNodesCount;
            input.DefaultThresholdResponses = input.DefaultThresholdResponses == 0
                ? DefaultThresholdResponses
                : input.DefaultThresholdResponses;
            input.DefaultThresholdToUpdateData = input.DefaultThresholdToUpdateData == 0
                ? DefaultThresholdToUpdateData
                : input.DefaultThresholdToUpdateData;

            Assert(input.DefaultMinimumAvailableNodesCount >= input.DefaultThresholdResponses,
                "DefaultMinimumAvailableNodesCount should be greater than DefaultThresholdResponses");
            Assert(input.DefaultThresholdResponses > input.DefaultThresholdToUpdateData,
                "DefaultThresholdResponses should be greater than DefaultThresholdToUpdateData");
            Assert(input.DefaultThresholdToUpdateData > 0, "Invalid DefaultThresholdToUpdateData");

            State.ExpirationSeconds.Value =
                input.ExpirationSeconds == 0 ? DefaultExpirationSeconds : input.ExpirationSeconds;
            State.ConfirmThreshold.Value = input.DefaultThresholdResponses;
            State.AgreeThreshold.Value = input.DefaultThresholdToUpdateData;
            State.MinimumDesignatedNodeCount.Value = input.DefaultMinimumAvailableNodesCount;
            State.MinimumEscrow.Value = input.MinimumEscrow == 0 ? DefaultMinimumEscrow : input.MinimumEscrow;
            State.ClearRedundantRevenue.Value = input.ClearRedundantRevenue == 0
                ? DefaultClearRedundantRevenue
                : input.ClearRedundantRevenue;
            State.AvailableNodes.Value = new AvailableNodes();
            State.Initialized.Value = true;
            return new Empty();
        }

        public override Empty Query(QueryInput input)
        {
            var queryId = Context.GenerateId(Context.TransactionId);
            var expirationTimestamp = Context.CurrentBlockTime.AddSeconds(State.ExpirationSeconds.Value);

            // Transfer tokens to Oracle Contract.
            State.TokenContract.TransferFrom.Send(new TransferFromInput
            {
                From = Context.Sender,
                To = Context.ConvertVirtualAddressToContractAddress(queryId),
                Amount = input.Payment,
                Symbol = TokenSymbol
            });

            Assert(State.QueryRecords[queryId] == null, "Query already exists.");

            var designatedNodeListCount = GetDesignatedNodeListCount(input.DesignatedNodeList);
            Assert(designatedNodeListCount > State.MinimumDesignatedNodeCount.Value, "Invalid designated nodes count.");

            State.QueryRecords[queryId] = new QueryRecord
            {
                QueryHash = ComputeQueryHash(input.CallbackInfo, input.UrlToQuery, input.AttributeToFetch),
                AggregatorContractAddress = input.AggregatorContractAddress,
                DesignatedNodeList = input.DesignatedNodeList,
                ExpirationTimestamp = expirationTimestamp
            };

            State.UserAddresses[queryId] = Context.Sender;

            return new Empty();
        }

        private int GetDesignatedNodeListCount(AddressList inputDesignatedNodeList)
        {
            var designatedNodeListCount = inputDesignatedNodeList.Value.Count;
            if (designatedNodeListCount == 1)
            {
                var organization =
                    State.AssociationContract.GetOrganization.Call(inputDesignatedNodeList.Value.First());
                designatedNodeListCount = organization.OrganizationMemberList.OrganizationMembers.Count;
            }

            return designatedNodeListCount;
        }

        public override Empty Commit(CommitInput input)
        {
            var queryRecord = State.QueryRecords[input.QueryId];

            // Confirm this query is in stage Commit.
            Assert(!queryRecord.IsSufficientCommitmentsCollected,
                "This query already collected sufficient commitments.");

            // Permission check.
            var designatedNodeListCount = queryRecord.DesignatedNodeList.Value.Count;
            bool isSenderInDesignatedNodeList;
            int actualNodeListCount; // Will use this variable later.
            if (designatedNodeListCount != 1)
            {
                isSenderInDesignatedNodeList = queryRecord.DesignatedNodeList.Value.Contains(Context.Sender);
                actualNodeListCount = queryRecord.DesignatedNodeList.Value.Count;
            }
            else
            {
                var organization =
                    State.AssociationContract.GetOrganization.Call(queryRecord.DesignatedNodeList.Value.First());
                isSenderInDesignatedNodeList =
                    organization.OrganizationMemberList.OrganizationMembers.Contains(Context.Sender);
                actualNodeListCount = organization.OrganizationMemberList.OrganizationMembers.Count;
            }

            Assert(isSenderInDesignatedNodeList, "No permission to commit for this query.");
            Assert(actualNodeListCount > State.MinimumDesignatedNodeCount.Value, "Invalid designated nodes count.");

            var updatedResponseCount = State.ResponseCount[input.QueryId].Add(1);
            State.CommitmentMap[input.QueryId][Context.Sender] = input.Commitment;

            if (updatedResponseCount >= GetCommitStageNodeCountThreshold(actualNodeListCount))
            {
                // Move to next stage: Reveal
                queryRecord.IsSufficientCommitmentsCollected = true;
                State.ResponseCount[input.QueryId] = 0;
                State.QueryRecords[input.QueryId] = queryRecord;

                Context.Fire(new SufficientCommitmentsCollected
                {
                    QueryId = input.QueryId
                });
            }
            else
            {
                State.ResponseCount[input.QueryId] = updatedResponseCount;
            }

            return new Empty();
        }

        public override Empty Reveal(RevealInput input)
        {
            var queryRecord = State.QueryRecords[input.QueryId];

            // Confirm this query is in stage Commit.
            Assert(queryRecord.IsSufficientCommitmentsCollected && !queryRecord.IsSufficientDataCollected,
                "This query already collected sufficient results.");

            // Permission check.
            var commitment = State.CommitmentMap[input.QueryId][Context.Sender];
            if (commitment == null)
            {
                throw new AssertionException(
                    "No permission to reveal for this query. Sender hasn't submit commitment.");
            }

            var helpfulNodeList = State.HelpfulNodeListMap[input.QueryId] ?? new AddressList();
            Assert(!helpfulNodeList.Value.Contains(Context.Sender), "Sender already revealed commitment.");
            helpfulNodeList.Value.Add(Context.Sender);
            State.HelpfulNodeListMap[input.QueryId] = helpfulNodeList;

            // Check commitment.
            var dataHash = HashHelper.ComputeFrom(input.Data.ToArray());
            Assert(HashHelper.ConcatAndCompute(dataHash, input.Salt) == commitment, "Incorrect commitment.");

            // Record data to result list.
            var resultList = State.ResultListMap[input.QueryId] ?? new ResultList();
            if (resultList.Results.Contains(input.Data))
            {
                var index = resultList.Results.IndexOf(input.Data);
                resultList.Frequencies[index] = resultList.Frequencies[index].Add(1);
            }
            else
            {
                resultList.Results.Add(input.Data);
                resultList.Frequencies.Add(0);
            }

            var designatedNodeListCount = GetDesignatedNodeListCount(queryRecord.DesignatedNodeList);
            var helpfulNodeListCount = helpfulNodeList.Value.Count;
            if (helpfulNodeListCount < GetRevealStageNodeCountThreshold(designatedNodeListCount)) return new Empty();

            // Move to next stage: Aggregator.
            queryRecord.IsSufficientDataCollected = true;
            State.ResponseCount.Remove(input.QueryId);

            // Distributed rewards to helpful oracle nodes.
            foreach (var helpfulNode in helpfulNodeList.Value)
            {
                var paymentToEachNode = queryRecord.Payment.Div(helpfulNodeListCount);
                Context.SendVirtualInline(input.QueryId, State.TokenContract.Value,
                    nameof(State.TokenContract.Transfer), new TransferInput
                    {
                        To = helpfulNode,
                        Symbol = TokenSymbol,
                        Amount = paymentToEachNode
                    });
            }

            // Call Aggregator plugin contract.
            State.OracleAggregatorContract.Value = queryRecord.AggregatorContractAddress;
            var finalResult = State.OracleAggregatorContract.Aggregate.Call(new AggregateInput
            {
                Results = {resultList.Results},
                Frequencies = {resultList.Frequencies}
            });
            queryRecord.FinalResult = finalResult.Value;

            State.QueryRecords[input.QueryId] = queryRecord;

            // Callback User Contract
            var callbackInfo = queryRecord.CallbackInfo;
            Context.SendInline(callbackInfo.ContractAddress, callbackInfo.MethodName, finalResult);

            Context.Fire(new QueryCompleted
            {
                QueryId = input.QueryId,
                Result = finalResult.Value
            });

            return new Empty();
        }

        public override Empty CreateRequest(CreateRequestInput input)
        {
            var requestId = Context.GenerateId(Context.TransactionId);
            var expirationTimestamp = Context.CurrentBlockTime.AddSeconds(State.ExpirationSeconds.Value);
            var payment = input.Payment;
            var callbackAddress = input.CallbackAddress;
            var methodName = input.MethodName;
            var aggregator = input.AggregatorAddress;
            var paramsHash = GenerateParamHash(payment, callbackAddress, methodName, expirationTimestamp);
            Assert(State.Commitments[requestId] == null, "Request already exists.");
            var designatedNodes = input.DesignatedNodes;
            if (designatedNodes != null)
            {
                var designatedNodesCount = designatedNodes.NodeList.Count;
                if (designatedNodesCount > 0)
                {
                    Assert(
                        designatedNodesCount > State.ConfirmThreshold.Value,
                        "Invalid count of designated nodes");
                }
            }

            State.Commitments[requestId] = new Commitment
            {
                ParamsHash = paramsHash,
                DesignatedNodes = designatedNodes,
                Aggregator = input.AggregatorAddress,
                CancelExpiration = expirationTimestamp
            };
            if (State.CommitmentsOwner[requestId] == null)
            {
                State.CommitmentsOwner[requestId] = Context.Sender;
            }

            var roundCount = State.AnswerCounter[requestId];
            roundCount = roundCount.Add(1);
            State.AnswerCounter[requestId] = roundCount;
            var roundAnswers = State.DetailAnswers[requestId] ?? new RoundAnswerDetailInfo();
            roundAnswers.RoundAnswers[roundCount] = new AnswerDetail();
            State.DetailAnswers[requestId] = roundAnswers;
            Context.Fire(new RequestCreated
            {
                Requester = Context.Sender,
                RoundId = roundCount,
                RequestId = requestId,
                Payment = payment,
                CallbackAddress = callbackAddress,
                MethodName = methodName,
                CancelExpiration = expirationTimestamp,
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
            int thresholdResponses = State.ConfirmThreshold.Value;
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
                Context.Fire(new SufficientDataCollected
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
            Assert(answers.HashDataResponses == State.ConfirmThreshold.Value,
                $"Not enough hash data received for request {requestId}");
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

            if (answers.DataWithSaltResponses != State.ConfirmThreshold.Value) return new Empty();
            var aggregatorAddress = State.Commitments[requestId].Aggregator;
            if (aggregatorAddress != null)
            {
                var aggregatorInput = TransferToAggregateInput(requestId, currentRoundCount, allNodeRealData);
                aggregatorInput.Requester = State.CommitmentsOwner[requestId];
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
                if (!string.IsNullOrEmpty(input.MethodName))
                {
                    Context.SendInline(input.CallbackAddress, input.MethodName, chooseData);
                }

                UpdateRoundData(requestId, currentRoundCount, chooseData);
                ClearRequestInfo(requestId);
                return new Empty();
            }

            DealQuestionableQuery(requestId, currentRoundCount, allNodeRealData);
            ClearRequestInfo(requestId);
            return new Empty();
        }

        public override Empty CancelRequest(CancelRequestInput input)
        {
            var commitment = State.Commitments[input.RequestId];
            Assert(commitment != null, "commitment does not exist");
            var commitmentOwner = State.CommitmentsOwner[input.RequestId];
            Assert(commitmentOwner == Context.Sender, "Sender is not authorized");
            Assert(commitment.CancelExpiration < Context.CurrentBlockTime, "It is not expired, can't cancel request");
            ClearRequestInfo(input.RequestId);
            return new Empty();
        }

        public override Empty RemoveQuestionableQueryInfo(RemoveQuestionableQueryInfoInput input)
        {
            var owner = State.CommitmentsOwner[input.RequestId];
            Assert(owner != null && Context.Sender == owner, "Not authorized");
            State.QuestionableInfo.Remove(input.RequestId);
            return new Empty();
        }

        public override Empty RemoveRedundantRoundData(RemoveRedundantRoundDataInput input)
        {
            var owner = State.CommitmentsOwner[input.RequestId];
            Assert(owner != null && Context.Sender == owner || Context.Sender == State.Controller.Value,
                "Not authorized");
            Assert(State.RoundLastAnswersInfo[input.RequestId] != null, "invalid operation");
            State.RoundLastAnswersInfo.Remove(input.RequestId);
            if (State.Commitments[input.RequestId] == null && State.QuestionableInfo[input.RequestId] == null)
            {
                State.CommitmentsOwner.Remove(input.RequestId);
            }

            PayToCleanDataRedundant(owner);
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
            if (maxCount < State.AgreeThreshold.Value)
            {
                chooseData = null;
                return false;
            }

            var chooseGroup = groupData.First(x => x.Count() == maxCount);
            chooseData = chooseGroup.Key;
            foreach (var chooseNode in chooseGroup)
            {
                var statisticInfo = State.NodeStatistic[chooseNode.Node];
                statisticInfo.ValidCount = statisticInfo.ValidCount.Add(1);
                State.NodeStatistic[chooseNode.Node] = statisticInfo;
            }

            return true;
        }

        private void DealQuestionableQuery(Hash requestId, long roundId, IList<NodeWithDetailData> allDataList)
        {
            var requestQuestionableInfo = State.QuestionableInfo[requestId] ?? new RequestQuestionableQueryInfo();
            requestQuestionableInfo.QuestionableQueryInformation[roundId] = new QuestionableQueryInfo
            {
                UpdateTime = Context.CurrentBlockTime
            };
            requestQuestionableInfo.QuestionableQueryInformation[roundId].AllQuestionableNodes.AddRange(
                allDataList.Select(x =>
                    new QuestionableNodeInfo
                    {
                        Node = x.Node,
                        RealValue = x.RealData
                    }));
            State.QuestionableInfo[requestId] = requestQuestionableInfo;
            var questionableInfo = new NodesInfo();
            questionableInfo.NodeList.AddRange(allDataList.Select(x =>
                new NodeWithData
                {
                    Node = x.Node,
                    RealData = x.RealData
                }));
            Context.Fire(new QuestionableQueryFound
            {
                RequestId = requestId,
                RoundId = roundId,
                NodesInfo = questionableInfo
            });
        }

        private void UpdateRoundData(Hash requestId, long currentRoundCount, ByteString updateValue)
        {
            var roundLastAnswer = State.RoundLastAnswersInfo[requestId] ?? new RoundLastUpdateAnswer();
            roundLastAnswer.RoundAnswers[currentRoundCount] = new LastUpdateAnswer
            {
                LastValue = updateValue,
                UpdatedTimestamps = Context.CurrentBlockTime
            };
            State.RoundLastAnswersInfo[requestId] = roundLastAnswer;
        }

        private void ClearRequestInfo(Hash requestId)
        {
            State.DetailAnswers.Remove(requestId);
            State.Commitments.Remove(requestId);
        }

        private void AddQueryCount(Address node)
        {
            var statisticInfo = State.NodeStatistic[node] ?? new StatisticInfo();
            statisticInfo.QueryCount = statisticInfo.QueryCount.Add(1);
            State.NodeStatistic[node] = statisticInfo;
        }

        private void PayToCleanDataRedundant(Address user)
        {
            var revenue = State.ClearRedundantRevenue.Value;
            var totalFundPool = State.FundPoolToRevenue.Value;
            if (revenue > totalFundPool)
            {
                revenue = totalFundPool;
            }

            if (revenue == 0)
            {
                return;
            }

            State.TokenContract.Transfer.Send(new TransferInput
            {
                To = user,
                Symbol = TokenSymbol,
                Amount = revenue
            });
            totalFundPool = totalFundPool.Sub(revenue);
            State.FundPoolToRevenue.Value = totalFundPool;
        }

        private void InitializeContractReferences()
        {
            State.TokenContract.Value =
                Context.GetContractAddressByName(SmartContractConstants.TokenContractSystemName);
            State.ParliamentContract.Value =
                Context.GetContractAddressByName(SmartContractConstants.ParliamentContractSystemName);
            State.AssociationContract.Value =
                Context.GetContractAddressByName(SmartContractConstants.AssociationContractSystemName);
        }

        private void CreateToken()
        {
            var defaultParliament = State.ParliamentContract.GetDefaultOrganizationAddress.Call(new Empty());
            State.TokenContract.Create.Send(new CreateInput
            {
                Symbol = TokenSymbol,
                TokenName = TokenName,
                IsBurnable = true,
                Issuer = defaultParliament,
                TotalSupply = TotalSupply
            });
        }
    }
}