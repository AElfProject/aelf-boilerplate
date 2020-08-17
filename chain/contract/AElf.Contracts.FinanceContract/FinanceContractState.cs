using AElf.Contracts.Genesis;
using AElf.Contracts.MultiToken;
using AElf.Sdk.CSharp.State;
using AElf.Types;

namespace AElf.Contracts.FinanceContract
{
    public class FinanceContractState : ContractState
    {
        internal TokenContractContainer.TokenContractReferenceState TokenContract { get; set; }

        internal BasicContractZeroContainer.BasicContractZeroReferenceState GenesisContract { get; set; }

        /// <summary>
        /// Contract administrator
        /// </summary>
        public SingletonState<Address> Admin { get; set; }

        /// <summary>
        /// Contract pending administrator
        /// </summary>
        public SingletonState<Address> PendingAdmin { get; set; }

        /// <summary>
        /// Market administrator
        /// </summary>
        public MappedState<string, Address> Admins { get; set; }

        /// <summary>
        /// Pending administrator
        /// </summary>
        public MappedState<string, Address> PendingAdmins { get; set; }

        /// <summary>
        /// Block number that interest was last accrued at
        /// </summary>
        public MappedState<string, long> AccrualBlockNumbers { get; set; }

        /// <summary>
        /// Total amount of outstanding borrows of the underlying in this market
        /// </summary>
        public MappedState<string, long> TotalBorrows { get; set; }

        /// <summary>
        /// Total amount of reserves of the underlying held in this market
        /// </summary>
        public MappedState<string, long> TotalReserves { get; set; }

        /// <summary>
        /// Total number of tokens in circulation(CToken)
        /// </summary>
        public MappedState<string, long> TotalSupply { get; set; }

        /// <summary>
        /// Accumulator of the total earned interest rate since the opening of the market
        /// </summary>
        public MappedState<string, string> BorrowIndex { get; set; }

        /// <summary>
        /// Mapping of account addresses to outstanding borrow balances
        /// </summary>
        public MappedState<string, Address, BorrowSnapshot> AccountBorrows { get; set; }

        /// <summary>
        /// Initial exchange rate used when minting the first CTokens (used when totalSupply = 0)
        /// </summary>
        /// <returns></returns>
        public MappedState<string, string> InitialExchangeRate { get; set; }

        /// <summary>
        /// Fraction of interest currently set aside for reserves
        /// </summary>
        public MappedState<string, string> ReserveFactor { get; set; }

        /// <summary>
        /// Token balances for each account(CToken)
        /// </summary>
        public MappedState<string, Address, long> AccountTokens { get; set; }

        /// <summary>
        /// Market metadata
        /// </summary>
        public MappedState<string, Market> Markets { get; set; }

        /// <summary>
        /// Per-account mapping of "assets you are in", capped by maxAssets
        /// </summary>
        public MappedState<Address, AssetList> AccountAssets { get; set; }


        /// <summary>
        /// Multiplier used to calculate the maximum repayAmount when liquidating a borrow
        /// </summary>
        /// <returns></returns>
        public StringState CloseFactor { get; set; }

        /// <summary>
        /// Multiplier representing the discount on collateral that a liquidator receives
        /// </summary>
        /// <returns></returns>
        public StringState LiquidationIncentive { get; set; }

        /// <summary>
        /// Max number of assets a single account can participate in (borrow or use as collateral)
        /// </summary>
        /// <returns></returns>
        public Int32State MaxAssets { get; set; }

        /// <summary>
        /// A list of all markets
        /// </summary>
        public SingletonState<SymbolList> AllMarkets { get; set; }

        /**
        *  The Pause Guardian can pause certain actions as a safety mechanism.
        *  Actions which allow users to remove their own assets cannot be paused.
        *  Liquidation / seizing / transfer can only be paused globally, not by market.
        */
        public SingletonState<Address> PauseGuardian { get; set; }

        public BoolState TransferGuardianPaused { get; set; }

        public BoolState SeizeGuardianPaused { get; set; }

        public MappedState<string, bool> MintGuardianPaused { get; set; }

        public MappedState<string, bool> BorrowGuardianPaused { get; set; }

        public MappedState<string, string> Prices { get; set; }

        /// <summary>
        /// The base interest rate which is the y-intercept when utilization rate is 0
        /// </summary>
        public MappedState<string, string> BaseRatePerBlock { get; set; }

        /// <summary>
        /// The multiplier of utilization rate that gives the slope of the interest rate
        /// </summary>
        public MappedState<string, string> MultiplierPerBlock { get; set; }
        
        public MappedState<string, int> DecimalState { get; set; }
    }
}