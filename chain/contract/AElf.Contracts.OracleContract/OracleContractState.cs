using System.Collections.Generic;
using AElf.Sdk.CSharp.State;
using AElf.Types;

namespace AElf.Contracts.OracleContract
{
    /// <summary>
    /// The state class of the contract, it inherits from the AElf.Sdk.CSharp.State.ContractState type. 
    /// </summary>
    public class OracleContractState : ContractState
    {
        // state definitions go here.
        
        public SingletonState<long> ExpirationTime { get; set; }
        
        public SingletonState<int>  MinimumHashData { get; set; }
        
        public SingletonState<int>  MinimumDataWithSalt { get; set; }
        
        //合约治理地址
        public SingletonState<Address> Controller { get; set; }
        
        
        //最少从多少个节点获取数据
        public SingletonState<int> MinimumResponses { get; set; }
        
        //最多从多少个节点获取数据
        public SingletonState<int> MaxResponses { get; set; }
        
        //一次request的过期时间
        public SingletonState<int> ExpireTime { get; set; }
        
        //发送解密数据的阈值
        public SingletonState<int> ReceiveDataWithSaltThreshold { get; set; }
        
        //聚合数据所需要的数据量
        public SingletonState<int> ResponseThreshold{ get; set; }
        
        // 是否为有效节点
        public MappedState<Address, bool> AuthorizedNodes { get; set; }
        
        // 有哪些节点
        public SingletonState<AvailableNodes> AvailableNodes { get; set; }
        
        // key为request id， value为查询信息生成的hash值
        public MappedState<Hash, Commitment> Commitments { get; set; }
        
        // 记录每次request，各个节点发送的经过hash后的data。
        public MappedState<Hash, Address, Hash> HashData { get; set; }
        
        // 记录answer的轮数
        public MappedState<Hash, long> AnswerCounter { get; set; }
        
        //记录每一轮数据的信息
        public MappedState<Hash, long, Answer> Answers { get; set; }
        
        //key 为request id， value为当前answer的轮数
        public MappedState<Hash, long> RequestAnswers { get; set; }
        
        //记录每一轮的最终结果
        public MappedState<Hash, long, AnswerInfo> CurrentAnswersInfo { get; set; }
        
    }
}