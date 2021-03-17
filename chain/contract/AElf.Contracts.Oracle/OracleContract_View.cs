using System.Linq;
using AElf.CSharp.Core;
using AElf.Standards.ACS13;
using AElf.Types;
using Google.Protobuf.WellKnownTypes;

namespace AElf.Contracts.Oracle
{
    public partial class OracleContract
    {
        private LastUpdateAnswer GetLastAnswer(GetLastAnswerInput input)
        {
            var lastRoundCount = State.AnswerCounter[input.RequestId];
            if (lastRoundCount == 0)
            {
                return new LastUpdateAnswer();
            }

            var commitment = State.Commitments[input.RequestId];
            if (commitment == null)
                return State.RoundLastAnswersInfo[input.RequestId].RoundAnswers[lastRoundCount] ??
                       new LastUpdateAnswer();
            if (lastRoundCount == 1)
            {
                return new LastUpdateAnswer();
            }

            lastRoundCount = lastRoundCount.Sub(1);

            return State.RoundLastAnswersInfo[input.RequestId].RoundAnswers[lastRoundCount] ?? new LastUpdateAnswer();
        }

        private LastUpdateAnswer GetAnswerByRound(GetAnswerByRoundInput input)
        {
            return State.RoundLastAnswersInfo[input.RequestId].RoundAnswers[input.RoundId]?? new LastUpdateAnswer();
        }

        public override QuestionableQueryInfo GetQuestionableQuery(GetQuestionableQueryInput input)
        {
            return State.QuestionableInfo[input.RequestId].QuestionableQueryInformation[input.RoundId];
        }

        public override Address GetController(Empty input)
        {
            return State.Controller.Value;
        }

        public override AllNodeStatisticInfo GetNodeStatistic(Empty input)
        {
            var ret = new AllNodeStatisticInfo();
            var allNodes = State.AvailableNodes.Value.NodeList;
            ret.AllNodeStatisticInfo_.AddRange(allNodes.Select(x => new NodeStatistic
            {
                Node = x,
                StatisticInfo = State.NodeStatistic[x]
            }));
            return ret;
        }

        public override WorkNodes GetAvailableAndQuestionableNode(Empty input)
        {
            var allNodes = State.AvailableNodes.Value.NodeList;
            var ret = new WorkNodes();
            foreach (var node in allNodes)
            {
                if (State.QuestionableNodes[node])
                {
                    ret.QuestionableNodes.Add(node);
                    continue;
                }
                ret.AvailableNodes.Add(node);
            }

            return ret;
        }
    }
}