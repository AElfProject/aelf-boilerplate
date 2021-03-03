using AElf.Sdk.CSharp.State;
using AElf.Types;

namespace AElf.Contracts.OracleContract
{
    /// <summary>
    /// The state class of the contract, it inherits from the AElf.Sdk.CSharp.State.ContractState type. 
    /// </summary>
    public partial class OracleContractState : ContractState
    {
        // request过期时间，默认为300s(单位秒)
        public SingletonState<long> ExpirationTime { get; set; }
        
        //合约治理地址
        public SingletonState<Address> Controller { get; set; }
        
        //最少需要多少个相同的数据
        public SingletonState<int>  ThresholdToUpdateData { get; set; }

        //最少需要从多少个节点获取数据
        public SingletonState<int> ThresholdResponses { get; set; }

        // 是否为有效节点
        public MappedState<Address, bool> AuthorizedNodes { get; set; }
        
        // 有哪些节点
        public SingletonState<AvailableNodes> AvailableNodes { get; set; }
        
        public MappedState<Address, NodeInfo> NodeInfo { get; set; }
        
        public MappedState<Address, NodeStatistic> NodeStatistic { get; set; }
        
        public SingletonState<long> MinimumEscrow { get; set; }
        
        
        // key为request id， value为查询信息生成的hash值
        public MappedState<Hash, Commitment> Commitments { get; set; }

        // 记录answer的轮数
        public MappedState<Hash, long> AnswerCounter { get; set; }
        
        //记录每一轮数据的信息
        public MappedState<Hash, RoundAnswerDetailInfo> DetailAnswers { get; set; }
        
        //记录每一轮的最终结果
        public MappedState<Hash, RoundLastUpdateAnswer> RoundLastAnswersInfo { get; set; }
        
    }
}