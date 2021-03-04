using AElf.CSharp.Core;
using AElf.Types;
using Google.Protobuf.WellKnownTypes;

namespace AElf.Contracts.OracleContract
{
    public partial class OracleContract
    {
        public override LastUpdateAnswer GetLastAnswer(GetLastAnswerInput input)
        {
            var lastRoundCount = State.AnswerCounter[input.RequestId];
            var commitment = State.Commitments[input.RequestId];
            if (commitment == null) return State.RoundLastAnswersInfo[input.RequestId].RoundAnswers[lastRoundCount];
            if (lastRoundCount == 1)
            {
                return new LastUpdateAnswer();
            }

            lastRoundCount = lastRoundCount.Sub(1);

            return State.RoundLastAnswersInfo[input.RequestId].RoundAnswers[lastRoundCount];

        }

        public override LastUpdateAnswer GetAnswerByRound(GetAnswerByRoundInput input)
        {
            return State.RoundLastAnswersInfo[input.RequestId].RoundAnswers[input.RoundId];
        }

        public override QuestionableQueryInfo GetQuestionableQuery(GetQuestionableQueryInput input)
        {
            return State.QuestionableInfo[input.RequestId].QuestionableQueryInformation[input.RoundId];
        }

        public override Address GetController(Empty input)
        {
            return State.Controller.Value;
        }
    }
}