using System;
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
        public override Empty Initialize(InitializeInput initializeInput)
        {  
            var address=Context.GetZeroSmartContractAddress();
            State.GenesisContract.Value=Context.GetZeroSmartContractAddress();
            State.TokenContract.Value =
                Context.GetContractAddressByName(SmartContractConstants.TokenContractSystemName);
            State.CloseFactor.Value = initializeInput.CloseFactor;
            State.LiquidationIncentive.Value = initializeInput.LiquidationIncentive;
            State.MaxAssets.Value = initializeInput.MaxAssets;
            State.Admin.Value =
                State.GenesisContract.GetContractInfo.Call(new Address() {Value = address.ToByteString()}).Author;
            Assert(Context.Sender== State.Admin.Value, "only admin may initialize the market");
            return new Empty();
        }
       /// <summary>
       /// Applies accrued interest to total borrows and reserves
       /// </summary>
       /// <param name="stringValue">token name</param>
       /// <returns></returns>
        public override Empty  AccrueInterest(StringValue input)
        {
            /* Remember the initial block number */
            long currentBlockNumber = Context.CurrentHeight;
            long accrualBlockNumberPrior = State.AccrualBlockNumbers[input.Value];
            if (accrualBlockNumberPrior == currentBlockNumber)
            {
                return new Empty();
            }
            /*
               * Calculate the interest accumulated into borrows and reserves and the new index:
               *  simpleInterestFactor = borrowRate * blockDelta
               *  interestAccumulated = simpleInterestFactor * totalBorrows
               *  totalBorrowsNew = interestAccumulated + totalBorrows
               *  totalReservesNew = interestAccumulated * reserveFactor + totalReserves
               *  borrowIndexNew = simpleInterestFactor * borrowIndex + borrowIndex
               */
              var cashPrior= GetCashPrior(input.Value);
              var borrowPrior = State.TotalBorrows[input.Value];
              var reservesPrior = State.TotalReserves[input.Value];
              var borrowIndexPrior = decimal.Parse(State.BorrowIndex[input.Value]);
              var supplyRate = GetSupplyRatePerBlock(input.Value);
              var borrowRate = GetBorrowRatePerBlock(input.Value);
              Assert(borrowRate<=decimal.Parse(MaxBorrowRate),"BorrowRate is higher than MaxBorrowRate");
              //Calculate the number of blocks elapsed since the last accrual 
            var blockDelta=  Context.CurrentHeight.Sub(State.AccrualBlockNumbers[input.Value]);
            var simpleInterestFactor = borrowRate * blockDelta;
            var interestAccumulated = simpleInterestFactor * borrowPrior;
            var totalBorrowsNew = interestAccumulated + borrowPrior;
            var totalReservesNew = decimal.Parse(State.ReserveFactor[input.Value]) * interestAccumulated +
                                   reservesPrior;
            var borrowIndexNew = simpleInterestFactor * borrowIndexPrior + borrowIndexPrior;
            State.AccrualBlockNumbers[input.Value] = currentBlockNumber;
            State.BorrowIndex[input.Value] = borrowIndexNew.ToInvariantString();
            State.TotalBorrows[input.Value] = decimal.ToInt64(totalBorrowsNew) ;
            State.TotalReserves[input.Value] = decimal.ToInt64(totalReservesNew) ;
            Context.Fire(new AccrueInterest()
            {
                Symbol = input.Value,
                Cash = cashPrior,
                InterestAccumulated = decimal.ToInt64(interestAccumulated),
                BorrowIndex = borrowIndexNew.ToInvariantString(),
                TotalBorrows =decimal.ToInt64(totalBorrowsNew),
                BorrowRatePerBlock = borrowRate.ToInvariantString(),
                SupplyRatePerBlock = supplyRate.ToInvariantString()
            });
            return new Empty();
        }
       //Action Method
       public override Empty Mint(MintInput mintInput)
       {
           AccrueInterest(new StringValue()
           {
               Value = mintInput.Symbol
           });
           Assert(!State.MintGuardianPaused[mintInput.Symbol],"Mint is paused");
           Assert(State.Markets[mintInput.Symbol].IsListed,"Market is not listed");
           long accrualBlockNumberPrior = State.AccrualBlockNumbers[mintInput.Symbol];
           Assert(accrualBlockNumberPrior == Context.CurrentHeight, "market's block number should equals current block number");
           var exchangeRate=ExchangeRateStoredInternal(mintInput.Symbol);
           var actualMintAmount = mintInput.Amount;
           DoTransferIn(Context.Sender,mintInput.Amount,mintInput.Symbol);
           //  mintTokens = actualMintAmount / exchangeRate
           var mintTokens = decimal.ToInt64(actualMintAmount / exchangeRate);
           // totalSupplyNew = totalSupply + mintTokens
           var totalSupplyNew = State.TotalSupply[mintInput.Symbol].Add(mintTokens) ;
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
           AccrueInterest(new StringValue()
           {
               Value = input.Symbol
           });
           Assert(!State.BorrowGuardianPaused[input.Symbol],"borrow is paused");
           Assert(State.Markets[input.Symbol].IsListed,"Market is not listed");
           if (!State.Markets[input.Symbol].AccountMembership[Context.Sender.Value.ToString()])
           {
               AddToMarketInternal(input.Symbol, Context.Sender);
           }
           Assert(UnderlyingPriceVerify(input.Symbol),"PRICE_ERROR");
           var  shortfall = GetHypotheticalAccountLiquidityInternal(Context.Sender, input.Symbol, 0, input.Amount);
           Assert(shortfall<=0,"INSUFFICIENT_LIQUIDITY");
           long accrualBlockNumberPrior = State.AccrualBlockNumbers[input.Symbol];
           Assert(accrualBlockNumberPrior == Context.CurrentHeight, "market's block number should equals current block number");
           Assert(GetCashPrior(input.Symbol) >= input.Amount, "BORROW_CASH_NOT_AVAILABLE");
           /*
         * We calculate the new borrower and total borrow balances, failing on overflow:
         *  accountBorrowsNew = accountBorrows + borrowAmount
         *  totalBorrowsNew = totalBorrows + borrowAmount
         */
           var accountBorrows =
               BorrowBalanceStoredInternal(new Account() {Address = Context.Sender, Symbol = input.Symbol});
           var accountBorrowsNew = accountBorrows.Add(input.Amount);
           var totalBorrowsNew = State.TotalBorrows[input.Symbol].Add(input.Amount);
           DoTransferOut(Context.Sender,input.Amount,input.Symbol);
           //We write the previously calculated values into storage 
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
           AccrueInterest(new StringValue()
           {
               Value = input.Symbol
           });
           RepayBorrowFresh(Context.Sender, Context.Sender, input.Amount, input.Symbol);
           return new Empty();
       }
        
       public override Empty RepayBorrowBehalf(RepayBorrowBehalfInput input)
       {
           AccrueInterest(new StringValue()
           {
               Value = input.Symbol
           });
           RepayBorrowFresh(Context.Sender, input.Borrower, input.Amount, input.Symbol);
           return new Empty();
       }

       public override Empty LiquidateBorrow(LiquidateBorrowInput input)
       {
           AccrueInterest(new StringValue()
           {
               Value = input.BorrowSymbol
           });
           AccrueInterest(new StringValue()
           {
               Value = input.CollateralSymbol
           });
           var accrualBorrowSymbolBlockNumberPrior = State.AccrualBlockNumbers[input.BorrowSymbol];
           Assert(accrualBorrowSymbolBlockNumberPrior == Context.CurrentHeight, "market's block number should equals current block number");
           var accrualCollateralSymbolBlockNumberPrior = State.AccrualBlockNumbers[input.CollateralSymbol];
           Assert(accrualCollateralSymbolBlockNumberPrior == Context.CurrentHeight, "market's block number should equals current block number");
           Assert(input.Borrower!=Context.Sender,"LIQUIDATE_LIQUIDATOR_IS_BORROWER");
           var borrowBalance = State.AccountBorrows[input.BorrowSymbol][input.Borrower].Principal;
           var maxClose = decimal.Parse(State.CloseFactor.Value) * borrowBalance;
           Assert(input.RepayAmount <= maxClose,"TOO_MUCH_REPAY");
           var actualRepayAmount=  RepayBorrowFresh(Context.Sender, input.Borrower, input.RepayAmount, input.BorrowSymbol);
           var liquidateCalculateSeizeTokensInput= new LiquidateCalculateSeizeTokensInput()
           {
              BorrowSymbol = input.BorrowSymbol,
              CollateralSymbol = input.CollateralSymbol,
              RepayAmount = input.RepayAmount.ToString()
           };
           var seizeTokens = LiquidateCalculateSeizeTokens(liquidateCalculateSeizeTokensInput);
           Assert(State.AccountTokens[input.CollateralSymbol][input.Borrower]>seizeTokens.Value,"LIQUIDATE_SEIZE_TOO_MUCH");
           SeizeInternal(Context.Sender, input.Borrower, seizeTokens.Value, input.CollateralSymbol);
           Context.Fire(new LiquidateBorrow()
           {
               Liquidator = Context.Sender,
               Borrower = input.Borrower,
               RepayAmount = actualRepayAmount,
               RepaySymbol = input.BorrowSymbol,
               SeizeSymbol = input.CollateralSymbol,
               SeizeTokenAmount = seizeTokens.Value
           });
           return base.LiquidateBorrow(input);
       }

       public override Empty AddReserves(AddReservesInput input)
       {
           AccrueInterest(new StringValue()
           {
               Value = input.Symbol
           });
         //  Assert(Context.Sender==State.Admin.Value,"only admin can add Reserves");
           var accrualBorrowSymbolBlockNumberPrior = State.AccrualBlockNumbers[input.Symbol];
           Assert(accrualBorrowSymbolBlockNumberPrior == Context.CurrentHeight, "market's block number should equals current block number");
           var actualAddAmount = input.Amount;
           DoTransferIn(Context.Sender, input.Amount, input.Symbol);
           var totalReservesNew = State.TotalReserves[input.Symbol].Add(actualAddAmount);
           Assert(totalReservesNew >= State.TotalReserves[input.Symbol],"add reserves unexpected overflow");
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
           AccrueInterest(new StringValue()
           {
               Value = input.Symbol
           });
           //  Assert(Context.Sender==State.Admin.Value,"only admin can add Reserves");
           var accrualBorrowSymbolBlockNumberPrior = State.AccrualBlockNumbers[input.Symbol];
           Assert(accrualBorrowSymbolBlockNumberPrior == Context.CurrentHeight, "market's block number should equals current block number");
           Assert(Context.Sender==State.Admin.Value,"UNAUTHORIZED");
           Assert(GetCashPrior(input.Symbol) >= input.Amount,"TOKEN_INSUFFICIENT_CASH");
           var totalReserves = State.TotalReserves[input.Symbol];
           Assert(totalReserves > input.Amount, "RESERVES_VALIDATION");
           var totalReservesNew = totalReserves.Sub(input.Amount);
           Assert(totalReservesNew <= totalReserves, "reduce reserves unexpected underflow");
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
           Assert(Context.Sender==State.Admin.Value,"UNAUTHORIZED");
           Assert(!State.Markets[input.Symbol].IsListed,"SUPPORT_MARKET_EXISTS");
          // check to make sure its really a CToken
          State.Markets[input.Symbol]=  new Market()
          {
              IsListed = true
          }; 
          State.ReserveFactor[input.Symbol] = input.ReserveFactor;
          State.InitialExchangeRate[input.Symbol]= input.InitialExchangeRate;
          State.MultiplierPerBlock[input.Symbol] = input.MultiplierPerBlock;
          State.BaseRatePerBlock[input.Symbol] = input.BaseRatePerBlock;
          for (int i = 0; i < State.AllMarkets.Value.Symbols.Count; i++)
          {
              Assert(State.AllMarkets.Value.Symbols[i]!=input.Symbol,"market already added");
          }
          State.AllMarkets.Value.Symbols.Add(input.Symbol);
          Context.Fire(new MarketListed()
          {
            Symbol = input.Symbol,
            BaseRatePerBlock = input.BaseRatePerBlock,
            MultiplierPerBlock = input.MultiplierPerBlock,
            ReserveFactor = input.ReserveFactor
          });
         return base.SupportMarket(input);
       }

     

    

       /// <summary>
       /// User redeems cTokens in exchange for the underlying asset
       /// </summary>
       /// <param name="input"></param>
       /// <returns></returns>
       public override Empty Redeem(RedeemInput input)
       {
           AccrueInterest(new StringValue()
           {
               Value = input.Symbol
           });
           var exchangeRate = ExchangeRateStoredInternal(input.Symbol);
           //redeemTokens = redeemTokensIn
           //redeemAmount = redeemTokensIn x exchangeRateCurrent
           var redeemTokens = input.Amount;
           var redeemAmount = decimal.ToInt64(input.Amount * exchangeRate);
           Redeem(Context.Sender, input.Symbol, redeemTokens, redeemAmount);
           return new Empty();
       }

       public override Empty RedeemUnderlying(RedeemUnderlyingInput input)
       {
           AccrueInterest(new StringValue()
           {
               Value = input.Symbol
           });
           var exchangeRate = ExchangeRateStoredInternal(input.Symbol);
           //  redeemTokens = redeemAmountIn / exchangeRate
           //  redeemAmount = redeemAmountIn
           var redeemTokens = decimal.ToInt64(input.Amount / exchangeRate);
           var redeemAmount = input.Amount;
           Redeem(Context.Sender, input.Symbol, redeemTokens, redeemAmount);
           return new Empty();
       }

       public override EnterMarketsOutput EnterMarkets(EnterMarketsInput input)
       {
           var len = input.Symbols.Count;
           var enterMarketsOutput = new EnterMarketsOutput();
           for (int i = 0; i < len; i++)
           {
               var isSuccess = true;
               try
               {
                   AddToMarketInternal(input.Symbols[i], Context.Sender);
               }
               catch (Exception e)
               {
                   isSuccess = false;
               }
               finally
               {
                   enterMarketsOutput.Results[i]=   new EnterMarketResult()
                   {
                       Symbol = input.Symbols[i],
                       Success = isSuccess
                   };
               }
           }
           return enterMarketsOutput;
       }

       public override Empty ExitMarket(StringValue input)
       {
           var result = GetAccountSnapshot(Context.Sender,input.Value);
           Assert(result.BorrowBalance==0,"NONZERO_BORROW_BALANCE");
           Assert(State.Markets[input.Value].IsListed,"Market is not listed");
           if (State.Markets[input.Value].AccountMembership[Context.Sender.Value.ToString()])
           {
               var shortfall= GetHypotheticalAccountLiquidityInternal(Context.Sender, input.Value, result.CTokenBalance, 0);
               Assert(shortfall<=0,"INSUFFICIENT_LIQUIDITY");
           }
           State.Markets[input.Value].AccountMembership[Context.Sender.Value.ToString()] = false;
           //Delete cToken from the account’s list of assets
           var userAssetList =State.AccountAssets[Context.Sender];
           var len = userAssetList.Assets.Count;
           var assetIndex = len;
           for (int i = 0; i < len; i++)
           {
               if (userAssetList.Assets[i] == input.Value)
               {
                   assetIndex = i;
                   break;
               }
           }
           Assert(assetIndex < len,"IndexOutOfBounds");
           userAssetList.Assets[assetIndex] = userAssetList.Assets[len - 1];
           userAssetList.Assets.RemoveAt(len - 1);
           Context.Fire(new MarketExited()
           {
               Address = Context.Sender,
               Symbol = input.Value
           });
           return new Empty() ;
       }
       /*** Admin Functions ***/ 
       
       public override Empty AcceptAdmin(Empty input)
       {
          Assert(Context.Sender==State.PendingAdmin.Value,"UNAUTHORIZED");  
          //Store admin with value pendingAdmin
          var oldAdmin = State.Admin.Value;
          var oldPenDingAdmin = State.PendingAdmin.Value;
          State.Admin = State.PendingAdmin;
          State.PendingAdmin.Value=new Address();
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
           Assert(Context.Sender==State.Admin.Value,"UNAUTHORIZED");  
           // Store pendingAdmin with value newPendingAdmin
           State.PendingAdmin.Value = input;
           var oldPenDingAdmin=new Address();
           Context.Fire(new PendingAdminChanged()
           {
               OldPendingAdmin = oldPenDingAdmin,
               NewPendingAdmin = State.PendingAdmin.Value
           });
           return new Empty();
       }

       public override BoolValue SetBorrowPaused(SetPausedInput input)
       {
           Assert(State.Markets[input.Symbol].IsListed,"cannot pause a market that is not listed");
           Assert(Context.Sender==State.PauseGuardian.Value || Context.Sender==State.Admin.Value,"only pause guardian and admin can pause");
           Assert(Context.Sender==State.Admin.Value|| input.State ,"only admin can unpause");
           State.BorrowGuardianPaused[input.Symbol] = input.State;
           return new BoolValue()
           {
               Value = input.State
           };
       }

       public override Empty SetCloseFactor(StringValue input)
       {
           var oldCloseFactor = State.CloseFactor.Value;
           var newCloseFactor = decimal.Parse(input.Value);
           Assert(Context.Sender==State.Admin.Value,"UNAUTHORIZED");  
           Assert(newCloseFactor>decimal.Parse(MinCloseFactor)&&newCloseFactor<decimal.Parse(MaxCloseFactor),"INVALID_CLOSE_FACTOR");
           State.CloseFactor.Value = input.Value;
           Context.Fire(new CloseFactorChanged()
           {
            OldCloseFactor  = oldCloseFactor,
            NewCloseFactor = input.Value
           });
           return new Empty();
       }

       public override BoolValue SetSeizePaused(SetPausedInput input)
       {
           Assert(Context.Sender==State.PauseGuardian.Value || Context.Sender==State.Admin.Value,"only pause guardian and admin can pause");
           Assert(Context.Sender==State.Admin.Value|| input.State ,"only admin can unpause");
           State.SeizeGuardianPaused.Value = input.State;
           return new BoolValue()
           {
               Value = input.State
           };
       }

       public override Empty SetCollateralFactor(SetCollateralFactorInput input)
       {
           Assert(Context.Sender==State.Admin.Value,"UNAUTHORIZED");
           var market = State.Markets[input.Symbol];
           var oldCollateralFactor = market.CollateralFactor;
           Assert(market.IsListed,"MARKET_NOT_LISTED");
           var newCollateralFactor = decimal.Parse(input.CollateralFactor);
           Assert(newCollateralFactor<=decimal.Parse(MaxCollateralFactor),"INVALID_CLOSE_FACTOR");
           Assert(newCollateralFactor!=0 && GetUnderlyingPrice(input.Symbol)==0,"Error.PRICE_ERROR");
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
           var symbol = new StringValue()
           {
               Value = input.Symbol
           };
           AccrueInterest(symbol);
           Assert(Context.Sender==State.Admin.Value,"UNAUTHORIZED");
           var accrualBlockNumberPrior = State.AccrualBlockNumbers[input.Symbol];
           Assert(accrualBlockNumberPrior == Context.CurrentHeight, "market's block number should equals current block number");
           State.MultiplierPerBlock[input.Symbol] = input.MultiplierPerBlock;
           State.BaseRatePerBlock[input.Symbol]=input.BaseRatePerBlock;
           Context.Fire(new InterestRateSet()
           {
               BaseRatePerBlock = input.BaseRatePerBlock,
               MultiplierPerBlock = input.MultiplierPerBlock,
               Symbol = input.Symbol
           });
           return new Empty();
       }

       public override Empty SetLiquidationIncentive(StringValue input)
       {
           Assert(Context.Sender==State.Admin.Value,"UNAUTHORIZED");
           var oldLiquidationIncentive = State.LiquidationIncentive.Value;
           var newLiquidationIncentive = decimal.Parse(input.Value); 
           Assert(newLiquidationIncentive<=decimal.Parse(MaxLiquidationIncentive)&&newLiquidationIncentive>=decimal.Parse(MinLiquidationIncentive),"INVALID_LIQUIDATION_INCENTIVE");
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
           Assert(Context.Sender==State.Admin.Value,"UNAUTHORIZED");
           var oldMaxAssets = State.MaxAssets.Value;
           State.MaxAssets.Value = input.Value;
           Context.Fire(new MaxAssetsChanged()
           {
               NewMaxAssets = State.MaxAssets.Value.ToString(),
               OldMaxAssets = oldMaxAssets.ToString()
           });
           return new Empty();
       }

       public override BoolValue SetMintPaused(SetPausedInput input)
       {
           var market = State.Markets[input.Symbol];
           Assert(market.IsListed,"MARKET_NOT_LISTED");
           Assert(Context.Sender==State.PauseGuardian.Value || Context.Sender==State.Admin.Value,"only pause guardian and admin can pause");
           Assert(Context.Sender==State.Admin.Value|| input.State ,"only admin can unpause");
           State.MintGuardianPaused[input.Symbol] = input.State;
           return new BoolValue()
           {
               Value = input.State
           };
       }

       public override Empty SetPauseGuardian(Address input)
       {
           Assert(Context.Sender==State.Admin.Value,"UNAUTHORIZED");
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
           var symbol = new StringValue()
           {
               Value = input.Symbol
           };
           AccrueInterest(symbol);
           Assert(Context.Sender==State.Admin.Value,"UNAUTHORIZED");
           var accrualBlockNumberPrior = State.AccrualBlockNumbers[input.Symbol];
           Assert(accrualBlockNumberPrior == Context.CurrentHeight, "market's block number should equals current block number");
           var oldReserveFactor = State.ReserveFactor[input.Symbol];
           var newReserveFactor = decimal.Parse(input.ReserveFactor);
           Assert(newReserveFactor <=decimal.Parse(MaxReserveFactor),"BAD_INPUT");
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
           var symbol = new StringValue()
           {
               Value = input.Symbol
           };
           AccrueInterest(symbol);
           Assert(Context.Sender==State.Admin.Value,"UNAUTHORIZED");
           var accrualBlockNumberPrior = State.AccrualBlockNumbers[input.Symbol];
           Assert(accrualBlockNumberPrior == Context.CurrentHeight,
               "market's block number should equals current block number");
           var previousPrice = State.Prices[input.Symbol].ToString();
           var priceNew = input.Price;
           State.Prices[input.Symbol]=Int64.Parse(priceNew);
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
           var priceBorrow = State.Prices[input.BorrowSymbol];
           var priceCollateral = State.Prices[input.CollateralSymbol];
           Assert(priceBorrow!=0&&priceCollateral!=0,"PRICE_ERROR");
          var exchangeRate= ExchangeRateStoredInternal(input.CollateralSymbol);
        //Get the exchange rate and calculate the number of collateral tokens to seize:
        // *  seizeAmount = actualRepayAmount * liquidationIncentive * priceBorrowed / priceCollateral
        //    seizeTokens = seizeAmount / exchangeRate
        //   = actualRepayAmount * (liquidationIncentive * priceBorrowed) / (priceCollateral * exchangeRate)
        var seizeAmount = decimal.Parse(input.RepayAmount) * decimal.Parse(State.LiquidationIncentive.Value) *
                          priceBorrow/priceCollateral;
        var seizeTokens = decimal.ToInt64(seizeAmount / exchangeRate);
        return new Int64Value()
           {
               Value=seizeTokens
           };
       }
    }
}