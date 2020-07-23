using System;
using System.Threading;
using Acs0;
using AElf.Contracts.Genesis;
using AElf.Contracts.MultiToken;
using AElf.CSharp.Core;
using AElf.Sdk.CSharp;
using AElf.Sdk.CSharp.State;
using AElf.Types;
using Google.Protobuf;
using Google.Protobuf.WellKnownTypes;
using Enum = System.Enum;

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
            Assert(accrualBlockNumberPrior == currentBlockNumber, "accumulating 0 interest");
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
              var borrowRate = GetBorrowRatePerBlock(input);
              //Calculate the number of blocks elapsed since the last accrual 
            var blockDelta=  Context.CurrentHeight.Sub(State.AccrualBlockNumbers[input.Value]);
            var simpleInterestFactor = decimal.Parse(borrowRate.Value) * blockDelta;
            var interestAccumulated = simpleInterestFactor * borrowPrior;
            var totalBorrowsNew = interestAccumulated + borrowPrior;
            var totalReservesNew = decimal.Parse(State.ReserveFactor[input.Value]) * interestAccumulated +
                                   reservesPrior;
            var borrowIndexNew = simpleInterestFactor * borrowIndexPrior + borrowIndexPrior;
            State.AccrualBlockNumbers[input.Value] = currentBlockNumber;
            State.BorrowIndex[input.Value] = borrowIndexNew.ToString();
            State.TotalBorrows[input.Value] = decimal.ToInt64(totalBorrowsNew) ;
            State.TotalReserves[input.Value] = decimal.ToInt64(totalReservesNew) ;
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
           var actualMintAmount= DoTransferIn(Context.Sender,mintInput.Amount,mintInput.Symbol);
           //  mintTokens = actualMintAmount / exchangeRate
           var mintTokens = decimal.ToInt64(actualMintAmount / exchangeRate);
           // totalSupplyNew = totalSupply + mintTokens
           var totalSupplyNew = State.TotalSupply[mintInput.Symbol].Add(mintTokens) ;
           //accountTokensNew = accountTokens[minter] + mintTokens
           var accountTokensNew = State.AccountTokens[mintInput.Symbol][Context.Sender].Add(mintTokens);
           //write previously calculated values into storage
           State.TotalSupply[mintInput.Symbol] = totalSupplyNew;
           State.AccountTokens[mintInput.Symbol][Context.Sender] = accountTokensNew;
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
               borrowBalanceStoredInternal(new Account() {Address = Context.Sender, Symbol = input.Symbol});
           var accountBorrowsNew = accountBorrows.Add(input.Amount);
           var totalBorrowsNew = State.TotalBorrows[input.Symbol].Add(input.Amount);
           DoTransferOut(Context.Sender,input.Amount,input.Symbol);
           //We write the previously calculated values into storage 
           State.AccountBorrows[input.Symbol][Context.Sender].Principal = accountBorrowsNew;
           State.AccountBorrows[input.Symbol][Context.Sender].InterestIndex = State.BorrowIndex[input.Symbol];
           State.TotalBorrows[input.Symbol] = totalBorrowsNew;
           
           return new Empty();
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
           Assert(State.Markets[input.Symbol].IsListed,"Market is not listed");
           if (!State.Markets[input.Symbol].AccountMembership[Context.Sender.Value.ToString()])
           {
               AddToMarketInternal(input.Symbol, Context.Sender);
           }
           var shortfall=GetHypotheticalAccountLiquidityInternal(Context.Sender, input.Symbol, redeemTokens, 0);
           Assert(shortfall<=0,"INSUFFICIENT_LIQUIDITY");
           var accrualBlockNumberPrior = State.AccrualBlockNumbers[input.Symbol];
           Assert(accrualBlockNumberPrior == Context.CurrentHeight, "market's block number should equals current block number");
           //totalSupplyNew = totalSupply - redeemTokens
           //accountTokensNew = accountTokens[redeemer] - redeemTokens
           var totalSupplyNew = State.TotalSupply[input.Symbol].Sub(redeemTokens);
           var accountTokensNew = State.AccountTokens[input.Symbol][Context.Sender].Sub(redeemTokens);
           Assert(GetCashPrior(input.Symbol) < redeemAmount,"TOKEN_INSUFFICIENT_CASH");
           DoTransferOut(Context.Sender,redeemAmount,input.Symbol);
           //We write previously calculated values into storage
           State.TotalSupply[input.Symbol] = totalSupplyNew;
           State.AccountTokens[input.Symbol][Context.Sender] = accountTokensNew;
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
           if (!State.Markets[input.Symbol].AccountMembership[Context.Sender.Value.ToString()])
           {
               AddToMarketInternal(input.Symbol, Context.Sender);
           }
           var shortfall= GetHypotheticalAccountLiquidityInternal(Context.Sender, input.Symbol, redeemTokens, 0);
           Assert(shortfall<=0,"INSUFFICIENT_LIQUIDITY");
           var accrualBlockNumberPrior = State.AccrualBlockNumbers[input.Symbol];
           Assert(accrualBlockNumberPrior == Context.CurrentHeight, "market's block number should equals current block number");
           //totalSupplyNew = totalSupply - redeemTokens
           //accountTokensNew = accountTokens[redeemer] - redeemTokens
           var totalSupplyNew = State.TotalSupply[input.Symbol].Sub(redeemTokens);
           var accountTokensNew = State.AccountTokens[input.Symbol][Context.Sender].Sub(redeemTokens);
           Assert(GetCashPrior(input.Symbol) >=redeemAmount,"TOKEN_INSUFFICIENT_CASH");
           DoTransferOut(Context.Sender,redeemAmount,input.Symbol);
           //We write previously calculated values into storage
           State.TotalSupply[input.Symbol] = totalSupplyNew;
           State.AccountTokens[input.Symbol][Context.Sender] = accountTokensNew;
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
               };
           }
           return enterMarketsOutput;
       }

       public override Empty ExitMarket(StringValue input)
       {
           var account = new Account()
           {
               Symbol = input.Value,
               Address = Context.Sender
           };
           var result = GetAccountSnapshot(account);
           Assert(result.BorrowBalance==0,"NONZERO_BORROW_BALANCE");
           Assert(State.Markets[input.Value].IsListed,"Market is not listed");
           var shortfall= GetHypotheticalAccountLiquidityInternal(Context.Sender, input.Value, result.CTokenBalance, 0);
           Assert(shortfall<=0,"INSUFFICIENT_LIQUIDITY");
           if(!State.Markets[input.Value].AccountMembership[Context.Sender.Value.ToString()])
               return new Empty() ;
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
           return new Empty() ;
       }
       /*** Admin Functions ***/ 
       
       public override Empty AcceptAdmin(Empty input)
       {
          Assert(Context.Sender==State.PendingAdmin.Value,"UNAUTHORIZED");  
          //Store admin with value pendingAdmin
          State.Admin = State.PendingAdmin;
          State.PendingAdmin.Value=new Address();
          return new Empty();
       }

       public override Empty SetPendingAdmin(Address input)
       {
           Assert(Context.Sender==State.Admin.Value,"UNAUTHORIZED");  
           // Store pendingAdmin with value newPendingAdmin
           State.PendingAdmin.Value = input;
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
           var newCloseFactor = decimal.Parse(input.Value);
           Assert(Context.Sender==State.Admin.Value,"UNAUTHORIZED");  
           Assert(newCloseFactor>decimal.Parse(MinCloseFactor)&&newCloseFactor<decimal.Parse(MaxCloseFactor),"INVALID_CLOSE_FACTOR");
           State.CloseFactor.Value = input.Value;
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
           Assert(market.IsListed,"MARKET_NOT_LISTED");
           var newCollateralFactor = decimal.Parse(input.CollateralFactor);
           Assert(newCollateralFactor<=decimal.Parse(MaxCollateralFactor),"INVALID_CLOSE_FACTOR");
           Assert(newCollateralFactor!=0 && GetUnderlyingPrice(input.Symbol)==0,"Error.PRICE_ERROR");
           market.CollateralFactor = input.CollateralFactor;
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
           return new Empty();
       }

       public override Empty SetLiquidationIncentive(StringValue input)
       {
           Assert(Context.Sender==State.Admin.Value,"UNAUTHORIZED");
           var newLiquidationIncentive = decimal.Parse(input.Value); 
           Assert(newLiquidationIncentive<=decimal.Parse(MaxLiquidationIncentive)&&newLiquidationIncentive>=decimal.Parse(MinLiquidationIncentive),"INVALID_LIQUIDATION_INCENTIVE");
           State.LiquidationIncentive.Value = input.Value;
           return new Empty();
       }

       public override Empty SetMaxAssets(Int32Value input)
       {
           Assert(Context.Sender==State.Admin.Value,"UNAUTHORIZED");
           State.MaxAssets.Value = input.Value;
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
           var newPauseGuardian = input;
           State.PauseGuardian.Value = newPauseGuardian;
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
           var newReserveFactor = decimal.Parse(input.ReserveFactor);
           Assert(newReserveFactor <=decimal.Parse(MaxReserveFactor),"BAD_INPUT");
           State.ReserveFactor[input.Symbol] = input.ReserveFactor;
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
           var priceNew = input.Price;
           State.Prices[input.Symbol]=Int64.Parse(priceNew);
           return new Empty();
       }

       //View Method
       public override SymbolList GetAllMarkets(Empty empty)
       {
           return State.AllMarkets.Value;
       }

       public override Int64Value GetBalance(Account input)
       {
           var balance = new Int64Value()
           {
               Value = State.AccountTokens[input.Symbol][input.Address]
           };
           return  balance;
       }

       public override Int64Value GetUnderlyingBalance(Account input)
       {
           var result = State.InitialExchangeRate[input.Symbol];
           Assert(result!=null,"no such type of token in InitialExchangeRate");
           var rate = decimal.Parse(result);
           var underlyingBalance = rate * State.AccountTokens[input.Symbol][input.Address];
           var balance = new Int64Value()
           {
               Value = decimal.ToInt64(underlyingBalance)
           };
           return balance;
       }
       public override GetAccountSnapshotOutput GetAccountSnapshot(Account input)
       {
           var cTokenBalance = State.AccountTokens[input.Symbol][input.Address];
           var borrowBalance = borrowBalanceStoredInternal(input);
           var exchangeRate = ExchangeRateStoredInternal(input.Symbol);
           return new GetAccountSnapshotOutput()
           {
               BorrowBalance = borrowBalance,
               CTokenBalance = cTokenBalance,
               ExchangeRate = exchangeRate.ToString()
           };
       }
       public override StringValue GetBorrowRatePerBlock (StringValue input)
       {

           var utilizationRate = GetUtilizationRate(input.Value);
           var multiplierPerBlock = decimal.Parse(State.MultiplierPerBlock[input.Value]);
           var baseRatePerBlock =decimal.Parse(State.BaseRatePerBlock[input.Value]) ;
           var BorrowRate = utilizationRate*multiplierPerBlock+baseRatePerBlock;
           return new StringValue()
           {
               Value = BorrowRate.ToString()
           };
       }
       public override StringValue GetSupplyRatePerBlock ( StringValue input) 
       {
           //underlying = totalSupply × exchangeRate
           // borrowsPer = totalBorrows ÷ underlying
           //supplyRate = borrowRate × (1 − reserveFactor) × borrowsPer
           return new StringValue();
       }
       public override Int64Value GetTotalBorrows ( StringValue input)
       {
           return new Int64Value
           {
               Value = State.TotalBorrows[input.Value]
           };
       }
       public override Int64Value GetCurrentBorrowBalance (Account input)
       {
           var symbol = new StringValue()
           {
               Value = input.Symbol
           };
           AccrueInterest(symbol);
           return new Int64Value()
           {
            Value  = borrowBalanceStoredInternal(input)
           };

       }
       public override Int64Value GetBorrowBalanceStored (Account input) 
       {
           return new Int64Value()
           {
               Value  = borrowBalanceStoredInternal(input)
           };
       }
       public override StringValue GetCurrentExchangeRate (StringValue input) 
       {
           AccrueInterest(input);
           return new StringValue()
           {
               Value = ExchangeRateStoredInternal(input.Value).ToString()
           };
       }
       public  override StringValue GetExchangeRateStored ( StringValue input) 
       {
           return new StringValue()
           {
               Value = ExchangeRateStoredInternal(input.Value).ToString()
           };
       }
       public override Int64Value GetCash ( StringValue input) 
       {
          return new Int64Value()
          {
           Value = GetCashPrior(input.Value)
          };
       }
       public override AssetList GetAssetsIn (Address input)
       {
           return new AssetList();
       }
       public override BoolValue CheckMembership (Account input)
       {
           return new BoolValue()
          {
              Value =  State.Markets[input.Symbol].AccountMembership[input.Address.Value.ToString()]
          };
       }
       public override Int64Value LiquidateCalculateSeizeTokens(LiquidateCalculateSeizeTokensInput liquidateCalculateSeizeTokensInput) 
       {
           return new Int64Value();
       }
       
/// <summary>
///  Return the borrow balance of account based on stored data
/// </summary>
/// <param name="account">The address whose balance should be calculated</param>
/// <returns></returns>
        private long borrowBalanceStoredInternal(Account input)
        {
            BorrowSnapshot borrowSnapshot = State.AccountBorrows[input.Symbol][input.Address];
            if (borrowSnapshot.Principal == 0) {
                return 0;
            }
            //Calculate new borrow balance using the interest index:
            //recentBorrowBalance = borrower.borrowBalance * market.borrowIndex / borrower.borrowIndex
             var borrowIndex = State.BorrowIndex[input.Symbol];
             if (borrowSnapshot.InterestIndex == "0")
             {
                 return 0;
             }
            try
            {
              var result=decimal.Parse(borrowIndex) * borrowSnapshot.Principal/ decimal.Parse(borrowSnapshot.InterestIndex);
              return  Convert.ToInt64(result);
            }
            catch (Exception e)
            {
                Assert(e!=null,"Error in math");
                return 0;
            }
        }

       private decimal ExchangeRateStoredInternal(string input)
       {
           var token = input;
           var totalSupply = State.TotalSupply[token];
           var totalCash = GetCashPrior(token);
           var totalBorrow = State.TotalBorrows[token];
           var totalReserves = State.TotalReserves[token];
           if (totalSupply == 0)
           {
               return Convert.ToDecimal(State.InitialExchangeRate[token]);
           }
           
           // exchangeRate = (totalCash + totalBorrows - totalReserves) / totalSupply
           var exchangeRate = Convert.ToDecimal(totalCash.Add(totalBorrow).Sub(totalReserves)) / totalSupply;
           return exchangeRate;
       }

       private long GetCashPrior(string input)
       {
          var result= State.TokenContract.GetBalance.Call(new GetBalanceInput()
           {
               Owner = Context.Self,
               Symbol = input
           });
          return result.Balance;
       }

       private decimal GetUtilizationRate(string token)
       {
           var totalCash = GetCashPrior(token);
           var totalBorrow = State.TotalBorrows[token];
           var totalReserves = State.TotalReserves[token];
           var denominator = totalCash.Add(totalBorrow).Sub(totalReserves);
           if (denominator == 0)
           {
               return 0;
           }
           // utilizationRate = totalBorrows/(totalCash + totalBorrows - totalReserves)
           var utilizationRate = Convert.ToDecimal(totalBorrow)/denominator;
           return utilizationRate;
       }

/// <returns> the actual amount received</returns>
       private long DoTransferIn(Address from,long amount,string symbol)
       {
           var balanceBefore = GetCashPrior(symbol);
           var input = new TransferFromInput()
           {
               Amount = amount,
               From = from,
               Memo = "TransferIn",
               Symbol = symbol,
               To = Context.Self
           };
          State.TokenContract.TransferFrom.Send(input);
          var balanceAfter = GetCashPrior(symbol);
          Assert(balanceAfter >= balanceBefore, "TOKEN_TRANSFER_IN_OVERFLOW");
          return  balanceAfter - balanceBefore; 
       }

        private void DoTransferOut(Address to,long amount,string symbol)
       {
           var input = new TransferInput()
           {
               Amount = amount,
               Memo = "TransferOut",
               Symbol = symbol,
               To = to
           };
           State.TokenContract.Transfer.Send(input);
       }

        private void AddToMarketInternal(string symbol,Address borrower)
        {
            var market = State.Markets[symbol];
            Assert(market.IsListed,"MARKET_NOT_LISTED");
            if (market.AccountMembership[borrower.ToString()])
            {
                return;
            }
            Assert(State.AccountAssets[borrower].Assets.Count>=State.MaxAssets.Value,"TOO_MANY_ASSETS");
            market.AccountMembership[borrower.ToString()] = true;
            State.AccountAssets[borrower].Assets.Add(symbol);
        }
        //hook    to verify the cToken price not be zero
        private bool UnderlyingPriceVerify(string cToken)
        {
            return true;
        }
/// <summary>
/// Determine what the account liquidity would be if the given amounts were redeemed/borrowed
/// </summary>
/// <returns></returns>
        private long GetHypotheticalAccountLiquidityInternal(Address account,string cToken,long redeemTokens,long borrowAmount)
        {
          var assets = State.AccountAssets[account];
           for (int i = 0; i < assets.Assets.Count; i++)
           {
              var symbol = assets.Assets[i];
              // Read the balances and exchange rate from the cToken
              var cTokenBalance = State.AccountTokens[symbol][account];
             // var borrowBalance = borrowBalanceStoredInternal(input);
              var exchangeRate = ExchangeRateStoredInternal(symbol);
           }
           return 0;
        }
/// <summary>
/// Get the underlying price of a listed cToken asset
/// </summary>
/// <param name="cToken"></param>
/// <returns></returns>
         private long GetUnderlyingPrice(string cToken)
         {
                return State.Prices[cToken];
         }
    }
}