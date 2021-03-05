using AElf.Sdk.CSharp.State;
using AElf.Types;

namespace AElf.Contracts.OracleContract
{
    public partial class OracleContractState : ContractState
    {
        public SingletonState<long> ExpirationTime { get; set; }

        public SingletonState<int> ThresholdToUpdateData { get; set; }

        //合约治理地址
        public SingletonState<Address> Controller { get; set; }


        //最少从多少个节点获取数据
        public SingletonState<int> MinimumResponses { get; set; }

        // 是否为有效节点
        public MappedState<Address, bool> AuthorizedNodes { get; set; }

        // 有哪些节点
        public SingletonState<AvailableNodes> AvailableNodes { get; set; }

        // key为request id， value为查询信息生成的hash值
        public MappedState<Hash, Commitment> Commitments { get; set; }

        // 记录answer的轮数
        public MappedState<Hash, long> AnswerCounter { get; set; }

        // 记录每一轮数据的信息
        public MappedState<Hash, RoundAnswerDetailInfo> DetailAnswers { get; set; }

        // 记录每一轮的最终结果
        public MappedState<Hash, RoundLastUpdateAnswer> RoundLastAnswersInfo { get; set; }

    }
}