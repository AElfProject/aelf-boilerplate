using AElf.Sdk.CSharp.State;
using AElf.Types;

namespace AElf.Contracts.OracleContract
{
    /// <summary>
    /// The state class of the contract, it inherits from the AElf.Sdk.CSharp.State.ContractState type. 
    /// </summary>
    public partial class OracleContractState : ContractState
    {
        public SingletonState<bool> Initialized { get; set; }

        // request过期时间，默认为300s(单位秒)
        public SingletonState<long> ExpirationSeconds { get; set; }

        //合约治理地址
        public SingletonState<Address> Controller { get; set; }

        //最少需要多少个相同的数据
        public SingletonState<int> AgreeThreshold { get; set; }

        //最少需要从多少个节点获取数据
        public SingletonState<int> ConfirmThreshold { get; set; }

        // 是否为有效节点
        public MappedState<Address, bool> AuthorizedNodes { get; set; }

        // 节点是否被质疑
        public MappedState<Address, bool> QuestionableNodes { get; set; }

        // 有哪些节点
        public SingletonState<AvailableNodes> AvailableNodes { get; set; }

        public SingletonState<long> MinimumDesignatedNodeCount { get; set; }

        public SingletonState<bool> IsAvailableNodesEnough { get; set; }

        public MappedState<Address, NodeInfo> NodeInfo { get; set; }

        public MappedState<Address, StatisticInfo> NodeStatistic { get; set; }

        public SingletonState<long> MinimumEscrow { get; set; }

        public SingletonState<long> ClearRedundantRevenue { get; set; }

        public SingletonState<long> FundPoolToRevenue { get; set; }


        // key为request id， value为查询信息生成的hash值
        public MappedState<Hash, Commitment> Commitments { get; set; }

        public MappedState<Hash, Address> CommitmentsOwner { get; set; }

        // 记录answer的轮数
        public MappedState<Hash, long> AnswerCounter { get; set; }

        //记录每一轮数据的信息
        public MappedState<Hash, RoundAnswerDetailInfo> DetailAnswers { get; set; }

        //记录每一轮的最终结果
        public MappedState<Hash, RoundLastUpdateAnswer> RoundLastAnswersInfo { get; set; }

        // manage questionable query
        public MappedState<Hash, RequestQuestionableQueryInfo> QuestionableInfo { get; set; }

        public MappedState<Hash, QueryRecord> QueryRecords { get; set; }

        public MappedState<Hash, Address> UserAddresses { get; set; }

        public MappedState<Hash, int> ResponseCount { get; set; }

        public MappedState<Hash, Address, Hash> CommitmentMap { get; set; }

        public MappedState<Hash, ResultList> ResultListMap { get; set; }

        public MappedState<Hash, AddressList> HelpfulNodeListMap { get; set; }
    }
}