using AElf.Contracts.MultiToken;
using AElf.Sdk.CSharp.State;
using AElf.Types;
using AElf.Contracts.Consensus.AEDPoS;

namespace AElf.Contracts.LotteryContract
{
    public class LotteryContractState : ContractState
    {
        // ReSharper disable once InconsistentNaming
        internal AEDPoSContractContainer.AEDPoSContractReferenceState AEDPoSContract { get; set; }
        internal TokenContractImplContainer.TokenContractImplReferenceState TokenContract { get; set; }

        /// <summary>
        /// 该合约中，用户购买所支持的Token Symbol
        /// </summary>
        public StringState TokenSymbol { get; set; }

        /// <summary>
        /// 单价
        /// </summary>
        public SingletonState<long> Price { get; set; }

        /// <summary>
        /// 一次购买行为能购买彩票数量的上限
        /// </summary>
        public SingletonState<long> MaximumAmount { get; set; }

        /// <summary>
        /// 开奖延后区块数
        /// </summary>
        public SingletonState<long> DrawingLag { get; set; }

        /// <summary>
        /// 彩票业务最高权限地址
        /// </summary>
        public SingletonState<Address> Admin { get; set; }

        /// <summary>
        /// 当前开奖届数，从0开始
        /// </summary>
        public SingletonState<long> CurrentPeriod { get; set; }

        /// <summary>
        /// 每售出一笔彩票，自增1
        /// </summary>
        public SingletonState<long> SelfIncreasingIdForLottery { get; set; }

        /// <summary>
        /// 每一届的基本信息
        /// </summary>
        public MappedState<long, PeriodBody> Periods { get; set; }

        /// <summary>
        /// 彩票自增Id -> 彩票详情
        /// </summary>
        public MappedState<long, Lottery> Lotteries { get; set; }

        /// <summary>
        /// 用户地址 -> 届数 -> 已购彩票列表
        /// </summary>
        public MappedState<Address, long, LotteryList> OwnerToLotteries { get; set; }

        public SingletonState<long> RewardCount { get; set; }

        public MappedState<string, string> RewardMap { get; set; }

        public SingletonState<StringList> RewardCodeList { get; set; }

        public MappedState<Address, long> BoughtLotteriesCount { get; set; }

        public BoolState IsSuspend { get; set; }

        public Int64State AllRewardsCount { get; set; }
    }
}