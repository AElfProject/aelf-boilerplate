using System;
using System.Linq;
using System.Threading;
using Acs0;
using AElf.Contracts.Genesis;
using AElf.Contracts.MultiToken;
using AElf.CSharp.Core;
using AElf.Sdk.CSharp;
using AElf.Types;
using Google.Protobuf;
using Google.Protobuf.WellKnownTypes;

namespace AElf.Contracts.FinanceContract
{
    public partial class FinanceContract : FinanceContractContainer.FinanceContractBase
    {
        public override Empty Initialize(InitializeInput input)
        {
            Assert(State.TokenContract.Value == null, "Already initialized.");
            State.GenesisContract.Value = Context.GetZeroSmartContractAddress();
            State.Admin.Value =
                State.GenesisContract.GetContractInfo.Call(Context.Self).Author;
            Assert(Context.Sender == State.Admin.Value, "Only Admin may initialize the market");
            State.TokenContract.Value =
                Context.GetContractAddressByName(SmartContractConstants.TokenContractSystemName);
            Assert( input.CloseFactor > MinCloseFactor &&  input.CloseFactor < MaxCloseFactor,
                "Invalid CloseFactor");
            Assert(
                input.LiquidationIncentive >= MinLiquidationIncentive &&
                input.LiquidationIncentive <= MaxLiquidationIncentive, "Invalid LiquidationIncentive");
            Assert(input.MaxAssets > 0, "MaxAssets must greater than 0");
            State.CloseFactor.Value = input.CloseFactor;
            State.LiquidationIncentive.Value = input.LiquidationIncentive;
            State.MaxAssets.Value = input.MaxAssets;
            State.SeizeGuardianPaused.Value = false;
            return new Empty();
        }

        /// <summary>
        /// Applies accrued interest to total borrows and reserves
        /// </summary>
        /// <param name="stringValue">token name</param>
        /// <returns></returns>
        public override Empty AccrueInterest(StringValue input)
        {
            AccrueInterest(input.Value);
            return new Empty();
        }

        //Action Method
        public override Empty Mint(MintInput mintInput)
        {
            AccrueInterest(mintInput.Symbol);
            Assert(!State.MintGuardianPaused[mintInput.Symbol], "Mint is paused");
            Assert(State.Markets[mintInput.Symbol].IsListed, "Market is not listed");
            var accrualBlockNumberPrior = State.AccrualBlockNumbers[mintInput.Symbol];
            Assert(accrualBlockNumberPrior == Context.CurrentHeight,
                "Market's block number should equals current block number");
            var exchangeRate = ExchangeRateStoredInternal(mintInput.Symbol).ToDecimal();
            var actualMintAmount = mintInput.Amount;
            DoTransferIn(Context.Sender, mintInput.Amount, mintInput.Symbol);
            //  mintTokens = actualMintAmount / exchangeRate
            var mintTokens = decimal.ToInt64(actualMintAmount / exchangeRate);
            // totalSupplyNew = totalSupply + mintTokens
            var totalSupplyNew = State.TotalSupply[mintInput.Symbol].Add(mintTokens);
            //accountTokensNew = accountTokens[minter] + mintTokens
            var accountTokensNew = State.AccountTokens[mintInput.Symbol][Context.Sender].Add(mintTokens);
            //write previously calculated values into storage
            State.TotalSupply[mintInput.Symbol] = totalSupplyNew;
            State.AccountTokens[mintInput.Symbol][Context.Sender] = accountTokensNew;
            Context.Fire(new Mint()
            {
                Address = Context.Sender,
                Amount = mintInput.Amount,
                CTokenAmount = mintTokens,
                Symbol = mintInput.Symbol
            });
            return new Empty();
        }

        public override Empty Borrow(BorrowInput input)
        {
            AccrueInterest(input.Symbol);
            Assert(!State.BorrowGuardianPaused[input.Symbol], "Borrow is paused");
            //  Assert(State.Markets[input.Symbol].IsListed, "Market is not listed");
            if (!State.Markets[input.Symbol].AccountMembership
                .TryGetValue(Context.Sender.ToString(), out var isExist) || !isExist)
            {
                AddToMarketInternal(input.Symbol, Context.Sender);
            }

            Assert(UnderlyingPriceVerify(input.Symbol), "Error price");
            var shortfall = GetHypotheticalAccountLiquidityInternal(Context.Sender, input.Symbol, 0, input.Amount);
            Assert(shortfall <= 0, "Insufficient liquidity");
            var accrualBlockNumberPrior = State.AccrualBlockNumbers[input.Symbol];
            Assert(accrualBlockNumberPrior == Context.CurrentHeight,
                "Market's block number should equals current block number");
            Assert(GetCashPrior(input.Symbol) >= input.Amount, "Borrow cash not available");
            /*
          * We calculate the new borrower and total borrow balances, failing on overflow:
          *  accountBorrowsNew = accountBorrows + borrowAmount
          *  totalBorrowsNew = totalBorrows + borrowAmount
          */
            var accountBorrows =
                BorrowBalanceStoredInternal(new Account() {Address = Context.Sender, Symbol = input.Symbol});
            var accountBorrowsNew = accountBorrows.Add(input.Amount);
            var totalBorrowsNew = State.TotalBorrows[input.Symbol].Add(input.Amount);
            DoTransferOut(Context.Sender, input.Amount, input.Symbol);
            //We write the previously calculated values into storage 
            var borrowSnapshot = State.AccountBorrows[input.Symbol][Context.Sender];
            if (borrowSnapshot == null)
            {
                State.AccountBorrows[input.Symbol][Context.Sender] = new BorrowSnapshot();
            }

            State.AccountBorrows[input.Symbol][Context.Sender].Principal = accountBorrowsNew;
            State.AccountBorrows[input.Symbol][Context.Sender].InterestIndex = State.BorrowIndex[input.Symbol];
            State.TotalBorrows[input.Symbol] = totalBorrowsNew;
            Context.Fire(new Borrow()
            {
                Address = Context.Sender,
                Amount = input.Amount,
                BorrowBalance = accountBorrowsNew,
                TotalBorrows = totalBorrowsNew,
                Symbol = input.Symbol
            });
            return new Empty();
        }

        public override Empty RepayBorrow(RepayBorrowInput input)
        {
            AccrueInterest(input.Symbol);
            RepayBorrowFresh(Context.Sender, Context.Sender, input.Amount, input.Symbol);
            return new Empty();
        }

        public override Empty RepayBorrowBehalf(RepayBorrowBehalfInput input)
        {
            AccrueInterest(input.Symbol);
            RepayBorrowFresh(Context.Sender, input.Borrower, input.Amount, input.Symbol);
            return new Empty();
        }

        public override Empty LiquidateBorrow(LiquidateBorrowInput input)
        {
            AccrueInterest(input.BorrowSymbol);
            AccrueInterest(input.CollateralSymbol);
            //Checks if the liquidation should be allowed to occur
            Assert(State.Markets[input.BorrowSymbol].IsListed && State.Markets[input.CollateralSymbol].IsListed,
                "MARKET_NOT_LISTED");
            var shortfall = GetHypotheticalAccountLiquidityInternal(input.Borrower, input.BorrowSymbol, 0, 0);
            Assert(shortfall > 0, "Insufficient shortfall");
            var borrowBalance = BorrowBalanceStoredInternal(new Account()
            {
                Address = input.Borrower,
                Symbol = input.BorrowSymbol
            });
            var maxClose = State.CloseFactor.Value.ToDecimal() * borrowBalance;
            Assert(input.RepayAmount <= maxClose, "Too much repay");
            var accrualBorrowSymbolBlockNumberPrior = State.AccrualBlockNumbers[input.BorrowSymbol];
            Assert(accrualBorrowSymbolBlockNumberPrior == Context.CurrentHeight,
                "Market's block number should equals current block number");
            var accrualCollateralSymbolBlockNumberPrior = State.AccrualBlockNumbers[input.CollateralSymbol];
            Assert(accrualCollateralSymbolBlockNumberPrior == Context.CurrentHeight,
                "Market's block number should equals current block number");
            Assert(input.Borrower != Context.Sender, "Liquidator is borrower");
            Assert(input.RepayAmount != 0 && input.RepayAmount != -1, "Invalid close amount request");
            var actualRepayAmount =
                RepayBorrowFresh(Context.Sender, input.Borrower, input.RepayAmount, input.BorrowSymbol);
            var seizeTokens =
                LiquidateCalculateSeizeTokens(input.BorrowSymbol, input.CollateralSymbol, actualRepayAmount);
            Assert(State.AccountTokens[input.CollateralSymbol][input.Borrower] > seizeTokens,
                "Liquidate size too much");
            SeizeInternal(Context.Sender, input.Borrower, seizeTokens, input.CollateralSymbol);
            Context.Fire(new LiquidateBorrow()
            {
                Liquidator = Context.Sender,
                Borrower = input.Borrower,
                RepayAmount = actualRepayAmount,
                RepaySymbol = input.BorrowSymbol,
                SeizeSymbol = input.CollateralSymbol,
                SeizeTokenAmount = seizeTokens
            });
            return new Empty();
        }

        public override Empty AddReserves(AddReservesInput input)
        {
            AccrueInterest(input.Symbol);
            //  Assert(Context.Sender==State.Admin.Value,"only admin can add Reserves");
            var accrualBorrowSymbolBlockNumberPrior = State.AccrualBlockNumbers[input.Symbol];
            Assert(accrualBorrowSymbolBlockNumberPrior == Context.CurrentHeight,
                "Market's block number should equals current block number");
            var actualAddAmount = input.Amount;
            DoTransferIn(Context.Sender, input.Amount, input.Symbol);
            var totalReservesNew = State.TotalReserves[input.Symbol].Add(actualAddAmount);
            Assert(totalReservesNew >= State.TotalReserves[input.Symbol], "Add reserves unexpected overflow");
            State.TotalReserves[input.Symbol] = totalReservesNew;
            Context.Fire(new ReservesAdded()
            {
                Address = Context.Sender,
                Amount = actualAddAmount,
                Symbol = input.Symbol,
                TotalReserves = totalReservesNew
            });
            return new Empty();
        }

        public override Empty ReduceReserves(ReduceReservesInput input)
        {
            AccrueInterest(input.Symbol);
            //  Assert(Context.Sender==State.Admin.Value,"only admin can add Reserves");
            var accrualBorrowSymbolBlockNumberPrior = State.AccrualBlockNumbers[input.Symbol];
            Assert(accrualBorrowSymbolBlockNumberPrior == Context.CurrentHeight,
                "Market's block number should equals current block number");
            Assert(Context.Sender == State.Admin.Value, "Unauthorized");
            Assert(GetCashPrior(input.Symbol) >= input.Amount, "Token insufficient cash");
            var totalReserves = State.TotalReserves[input.Symbol];
            Assert(totalReserves > input.Amount, "Invalid reserves"); //RESERVES_VALIDATION
            var totalReservesNew = totalReserves.Sub(input.Amount);
            Assert(totalReservesNew <= totalReserves, "Reduce reserves unexpected underflow");
            State.TotalReserves[input.Symbol] = totalReservesNew;
            DoTransferOut(State.Admin.Value, input.Amount, input.Symbol);
            Context.Fire(new ReservesReduced()
            {
                Address = Context.Sender,
                Amount = input.Amount,
                Symbol = input.Symbol,
                TotalReserves = totalReservesNew
            });
            return new Empty();
        }

        //MarketListed
        public override Empty SupportMarket(SupportMarketInput input)
        {
            Assert(Context.Sender == State.Admin.Value, "Unauthorized");
            var market = State.Markets[input.Symbol];
            if (market != null)
            {
                Assert(!market.IsListed, "Support market exists"); //
            }

            // check to make sure its really a Token
            var tokenInfo = State.TokenContract.GetTokenInfo.Call(Context.Sender, new GetTokenInfoInput()
            {
                Symbol = input.Symbol
            });
            Assert(tokenInfo.Symbol != "", "Invalid Symbol");
            //if valid    set the decimal state
            State.Decimals[input.Symbol] = (uint) tokenInfo.Decimals;

            State.Markets[input.Symbol] = new Market()
            {
                IsListed = true
            };
            Assert(
                input.ReserveFactor >= 0 &&
                input.ReserveFactor <= MaxReserveFactor, "Invalid ReserveFactor");
            Assert(input.InitialExchangeRate > 0, "Invalid InitialExchangeRate");
            Assert(input.MultiplierPerBlock >= 0, "Invalid MultiplierPerBlock");
            Assert(input.BaseRatePerBlock >= 0, "Invalid BaseRatePerBlock");
            Assert(
                input.MultiplierPerBlock + input.BaseRatePerBlock <
                MaxBorrowRate, "Invalid interestRate model");
            State.ReserveFactor[input.Symbol] = input.ReserveFactor;
            State.InitialExchangeRate[input.Symbol] = input.InitialExchangeRate;
            State.MultiplierPerBlock[input.Symbol] = input.MultiplierPerBlock;
            State.BaseRatePerBlock[input.Symbol] = input.BaseRatePerBlock;
            var list = State.AllMarkets.Value;
            var symbolList = new SymbolList();
            if (list != null)
            {
                // Assert(!State.AllMarkets.Value.Symbols.Contains(input.Symbol), "market already added");
                symbolList = State.AllMarkets.Value;
            }

            symbolList.Symbols.Add(input.Symbol);
            State.AllMarkets.Value = symbolList;
            // Initialize block number and borrow index
            State.AccrualBlockNumbers[input.Symbol] = Context.CurrentHeight;
            State.BorrowIndex[input.Symbol] = InitialBorrowIndex;
            State.MintGuardianPaused[input.Symbol] = false;
            State.BorrowGuardianPaused[input.Symbol] = false;
            State.TotalBorrows[input.Symbol] = 0;
            State.TotalSupply[input.Symbol] = 0;
            State.TotalReserves[input.Symbol] = 0;
            Context.Fire(new MarketListed()
            {
                Symbol = input.Symbol,
                BaseRatePerBlock = input.BaseRatePerBlock,
                MultiplierPerBlock = input.MultiplierPerBlock,
                ReserveFactor = input.ReserveFactor
            });
            return new Empty();
        }


        /// <summary>
        /// User redeems cTokens in exchange for the underlying asset
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        public override Empty Redeem(RedeemInput input)
        {
            AccrueInterest(input.Symbol);
            var exchangeRate = ExchangeRateStoredInternal(input.Symbol).ToDecimal();
            //redeemTokens = redeemTokensIn
            //redeemAmount = redeemTokensIn x exchangeRateCurrent
            var redeemTokens = input.Amount;
            var redeemAmount = decimal.ToInt64(input.Amount * exchangeRate);
            Redeem(Context.Sender, input.Symbol, redeemTokens, redeemAmount);
            return new Empty();
        }

        public override Empty RedeemUnderlying(RedeemUnderlyingInput input)
        {
            AccrueInterest(input.Symbol);
            var exchangeRate = ExchangeRateStoredInternal(input.Symbol).ToDecimal();
            //  redeemTokens = redeemAmountIn / exchangeRate
            //  redeemAmount = redeemAmountIn
            var redeemTokens = decimal.ToInt64(input.Amount / exchangeRate);
            var redeemAmount = input.Amount;
            Redeem(Context.Sender, input.Symbol, redeemTokens, redeemAmount);
            return new Empty();
        }

        public override Empty EnterMarket(EnterMarketInput input)
        {
            AddToMarketInternal(input.Symbol, Context.Sender);
            return new Empty();
        }

        public override Empty ExitMarket(StringValue input)
        {
            MarketVerify(input.Value);
            var result = GetAccountSnapshot(Context.Sender, input.Value);
            Assert(result.BorrowBalance == 0, "Nonzero borrow balance");
            if (!State.Markets[input.Value].AccountMembership.TryGetValue(Context.Sender.ToString(), out var isExist) ||
                !isExist)
            {
                return new Empty();
            }

            var shortfall =
                GetHypotheticalAccountLiquidityInternal(Context.Sender, input.Value, result.CTokenBalance, 0);
            Assert(shortfall <= 0, "Insufficient liquidity"); //INSUFFICIENT_LIQUIDITY
            State.Markets[input.Value].AccountMembership[Context.Sender.ToString()] = false;
            //Delete cToken from the account’s list of assets
            var userAssetList = State.AccountAssets[Context.Sender];
            userAssetList.Assets.Remove(input.Value);
            Context.Fire(new MarketExited()
            {
                Address = Context.Sender,
                Symbol = input.Value
            });
            return new Empty();
        }

        /*** Admin Functions ***/

        public override Empty AcceptAdmin(Empty input)
        {
            Assert(Context.Sender == State.PendingAdmin.Value, "Unauthorized");
            //Store admin with value pendingAdmin
            var oldAdmin = State.Admin.Value;
            var oldPenDingAdmin = State.PendingAdmin.Value;
            State.Admin.Value = State.PendingAdmin.Value;
            State.PendingAdmin.Value = new Address();
            Context.Fire(new AdminChanged()
            {
                OldAdmin = oldAdmin,
                NewAdmin = State.Admin.Value
            });
            Context.Fire(new PendingAdminChanged()
            {
                OldPendingAdmin = oldPenDingAdmin,
                NewPendingAdmin = State.PendingAdmin.Value
            });
            return new Empty();
        }

        public override Empty SetPendingAdmin(Address input)
        {
            Assert(Context.Sender == State.Admin.Value, "Unauthorized");
            // Store pendingAdmin with value newPendingAdmin
            State.PendingAdmin.Value = input;
            var oldPenDingAdmin = new Address();
            Context.Fire(new PendingAdminChanged()
            {
                OldPendingAdmin = oldPenDingAdmin,
                NewPendingAdmin = State.PendingAdmin.Value
            });
            return new Empty();
        }

        public override BoolValue SetBorrowPaused(SetPausedInput input)
        {
            MarketVerify(input.Symbol);
            Assert(Context.Sender == State.PauseGuardian.Value || Context.Sender == State.Admin.Value,
                "Only pause guardian and admin can pause");
            Assert(Context.Sender == State.Admin.Value || input.State, "Only admin can unpause");
            State.BorrowGuardianPaused[input.Symbol] = input.State;
            return new BoolValue()
            {
                Value = input.State
            };
        }

        public override Empty SetCloseFactor(Int32Value input)
        {
            var oldCloseFactor = State.CloseFactor.Value;
            var newCloseFactor = input.Value;
            Assert(Context.Sender == State.Admin.Value, "Unauthorized");
            Assert(newCloseFactor > MinCloseFactor && newCloseFactor < MaxCloseFactor,
                "Invalid CloseFactor"); //INVALID_CLOSE_FACTOR
            State.CloseFactor.Value = input.Value;
            Context.Fire(new CloseFactorChanged()
            {
                OldCloseFactor = oldCloseFactor,
                NewCloseFactor = input.Value
            });
            return new Empty();
        }

        public override BoolValue SetSeizePaused(SetPausedInput input)
        {
            MarketVerify(input.Symbol);
            Assert(Context.Sender == State.PauseGuardian.Value || Context.Sender == State.Admin.Value,
                "Only pause guardian and admin can pause");
            Assert(Context.Sender == State.Admin.Value || input.State, "Only admin can unpause");
            State.SeizeGuardianPaused.Value = input.State;
            return new BoolValue()
            {
                Value = input.State
            };
        }

        public override Empty SetCollateralFactor(SetCollateralFactorInput input)
        {
            Assert(Context.Sender == State.Admin.Value, "Unauthorized");
            MarketVerify(input.Symbol);
            var market = State.Markets[input.Symbol];
            var oldCollateralFactor = market.CollateralFactor;
            var newCollateralFactor = input.CollateralFactor;
            Assert(newCollateralFactor <= MaxCollateralFactor && newCollateralFactor >= 0,
                "Invalid CloseFactor");
            if (newCollateralFactor > 0 && GetUnderlyingPrice(input.Symbol) == 0)
            {
                throw new AssertionException("Error Price");
            }

            market.CollateralFactor = input.CollateralFactor;
            Context.Fire(new CollateralFactorChanged()
            {
                OldCollateralFactor = oldCollateralFactor,
                NewCollateralFactor = market.CollateralFactor,
                Symbol = input.Symbol
            });
            return new Empty();
        }

        public override Empty SetInterestRate(SetInterestRateInput input)
        {
            AccrueInterest(input.Symbol);
            Assert(Context.Sender == State.Admin.Value, "Unauthorized");
            var accrualBlockNumberPrior = State.AccrualBlockNumbers[input.Symbol];
            Assert(accrualBlockNumberPrior == Context.CurrentHeight,
                "Market's block number should equals current block number");
            Assert(input.MultiplierPerBlock >= 0, "Invalid MultiplierPerBlock");
            Assert(input.BaseRatePerBlock >= 0, "Invalid BaseRatePerBlock");
            Assert(
                input.MultiplierPerBlock.Add(input.BaseRatePerBlock) <
                MaxBorrowRate, "Invalid interestRate model");
            State.MultiplierPerBlock[input.Symbol] = input.MultiplierPerBlock;
            State.BaseRatePerBlock[input.Symbol] = input.BaseRatePerBlock;
            Context.Fire(new InterestRateChanged()
            {
                BaseRatePerBlock = input.BaseRatePerBlock,
                MultiplierPerBlock = input.MultiplierPerBlock,
                Symbol = input.Symbol
            });
            return new Empty();
        }

        public override Empty SetLiquidationIncentive(Int32Value input)
        {
            Assert(Context.Sender == State.Admin.Value, "Unauthorized");
            var oldLiquidationIncentive = State.LiquidationIncentive.Value;
            var newLiquidationIncentive = input.Value;
            Assert(
                newLiquidationIncentive <= MaxLiquidationIncentive &&
                newLiquidationIncentive >= MinLiquidationIncentive,
                "Invalid LiquidationIncentive"); //INVALID_LIQUIDATION_INCENTIVE
            State.LiquidationIncentive.Value = input.Value;
            Context.Fire(new LiquidationIncentiveChanged()
            {
                OldLiquidationIncentive = oldLiquidationIncentive,
                NewLiquidationIncentive = input.Value
            });
            return new Empty();
        }

        public override Empty SetMaxAssets(Int32Value input)
        {
            Assert(Context.Sender == State.Admin.Value, "Unauthorized");
            var oldMaxAssets = State.MaxAssets.Value;
            Assert(input.Value > 0, "Invalid MaxAssets");
            State.MaxAssets.Value = input.Value;
            Context.Fire(new MaxAssetsChanged()
            {
                NewMaxAssets = State.MaxAssets.Value,
                OldMaxAssets = oldMaxAssets
            });
            return new Empty();
        }

        public override BoolValue SetMintPaused(SetPausedInput input)
        {
            MarketVerify(input.Symbol);
            Assert(Context.Sender == State.PauseGuardian.Value || Context.Sender == State.Admin.Value,
                "Only pause guardian and admin can pause");
            Assert(Context.Sender == State.Admin.Value || input.State, "Only admin can unpause");
            State.MintGuardianPaused[input.Symbol] = input.State;
            return new BoolValue()
            {
                Value = input.State
            };
        }

        public override Empty SetPauseGuardian(Address input)
        {
            Assert(Context.Sender == State.Admin.Value, "Unauthorized");
            var oldPauseGuardian = State.PauseGuardian.Value;
            var newPauseGuardian = input;
            State.PauseGuardian.Value = newPauseGuardian;
            Context.Fire(new PauseGuardianChanged()
            {
                OldPauseGuardian = oldPauseGuardian,
                NewPauseGuardian = newPauseGuardian
            });
            return new Empty();
        }

        public override Empty SetReserveFactor(SetReserveFactorInput input)
        {
            AccrueInterest(input.Symbol);
            Assert(Context.Sender == State.Admin.Value, "Unauthorized");
            var accrualBlockNumberPrior = State.AccrualBlockNumbers[input.Symbol];
            Assert(accrualBlockNumberPrior == Context.CurrentHeight,
                "Market's block number should equals current block number");
            var oldReserveFactor = State.ReserveFactor[input.Symbol];
            var newReserveFactor = input.ReserveFactor;
            Assert(newReserveFactor <= MaxReserveFactor && newReserveFactor >= 0,
                "Invalid ReserveFactor");
            State.ReserveFactor[input.Symbol] = input.ReserveFactor;
            Context.Fire(new ReserveFactorChanged()
            {
                OldReserveFactor = oldReserveFactor,
                NewReserveFactor = input.ReserveFactor,
                Symbol = input.Symbol
            });
            return new Empty();
        }

        public override Empty SetUnderlyingPrice(SetUnderlyingPriceInput input)
        {
            AccrueInterest(input.Symbol);
            Assert(Context.Sender == State.Admin.Value, "Unauthorized");
            var accrualBlockNumberPrior = State.AccrualBlockNumbers[input.Symbol];
            Assert(accrualBlockNumberPrior == Context.CurrentHeight,
                "Market's block number should equals current block number");
            var previousPrice = State.Prices[input.Symbol];

            var priceNew = input.Price;
            Assert(priceNew >= 0, "Invalid Price");
            State.Prices[input.Symbol] = priceNew;
            Context.Fire(new PricePosted()
            {
                Symbol = input.Symbol,
                PreviousPrice = previousPrice,
                NewPrice = priceNew
            });
            return new Empty();
        }

        public override Int64Value LiquidateCalculateSeizeTokens(LiquidateCalculateSeizeTokensInput input)
        {
            var seizeTokens = LiquidateCalculateSeizeTokens(input.BorrowSymbol, input.CollateralSymbol,
                input.RepayAmount);
            return new Int64Value()
            {
                Value = seizeTokens
            };
        }
    }
}