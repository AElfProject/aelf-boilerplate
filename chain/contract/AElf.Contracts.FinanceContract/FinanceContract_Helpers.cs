using System;
using AElf.Contracts.MultiToken;
using AElf.CSharp.Core;
using AElf.Sdk.CSharp;
using AElf.Types;

namespace AElf.Contracts.FinanceContract
{
    public partial class FinanceContract
    {
        /// <summary>
///  Return the borrow balance of account based on stored data
/// </summary>
/// <param name="account">The address whose balance should be calculated</param>
/// <returns></returns>
        private long BorrowBalanceStoredInternal(Account input)
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
            Context.Fire(new MarketEntered()
            {
                Address = borrower,
                Symbol = symbol
            });
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
          decimal sumCollateral = 0;
          decimal sumBorrowPlusEffects = 0;
           for (int i = 0; i < assets.Assets.Count; i++)
           {
              var symbol = assets.Assets[i];
              // Read the balances and exchange rate from the cToken
              var  accountSnapshot =  GetAccountSnapshot(new Account() {Address = account, Symbol = symbol});
              
              var cTokenBalance = State.AccountTokens[symbol][account];
             // var borrowBalance = BorrowBalanceStoredInternal(input);
             // var borrowBalance = State.AccountBorrows[symbol][account];
              var exchangeRate = ExchangeRateStoredInternal(symbol);
              var price = State.Prices[symbol];
              var collateralFactor = decimal.Parse(State.Markets[symbol].CollateralFactor);
              var tokensToDenom = exchangeRate * price * collateralFactor;
              sumCollateral += cTokenBalance *tokensToDenom;
              sumBorrowPlusEffects += accountSnapshot.BorrowBalance * price;
              if (symbol == cToken)
              {
                  // redeem effect
                  // sumBorrowPlusEffects += tokensToDenom * redeemTokens
                  sumBorrowPlusEffects += tokensToDenom * redeemTokens;
                  // borrow effect
                  // sumBorrowPlusEffects += oraclePrice * borrowAmount
                  sumBorrowPlusEffects += price * borrowAmount;
              }
           }
         
           return decimal.ToInt64(sumBorrowPlusEffects-sumCollateral);
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

          private long RepayBorrowFresh(Address payer, Address borrower, long repayAmount,string symbol)
          {
              Assert(State.Markets[symbol].IsListed,"Market is not listed");
              var accrualBlockNumberPrior = State.AccrualBlockNumbers[symbol];
              Assert(accrualBlockNumberPrior == Context.CurrentHeight, "market's block number should equals current block number");
             // var borrowerIndex = State.AccountBorrows[symbol][borrower].InterestIndex;
              var account = new Account()
              {
                  Address = borrower,
                  Symbol = symbol
              };
             var accountBorrows = BorrowBalanceStoredInternal(account);
             if (repayAmount == -1)
             {
                 repayAmount = accountBorrows;
             }
             var actualRepayAmount = DoTransferIn(payer, repayAmount, symbol);
             //accountBorrowsNew = accountBorrows - actualRepayAmount
             // totalBorrowsNew = totalBorrows - actualRepayAmount
             var accountBorrowsNew = accountBorrows.Sub(actualRepayAmount);
             var totalBorrowsNew = State.TotalBorrows[symbol].Sub(actualRepayAmount);
             State.AccountBorrows[symbol][borrower].Principal = accountBorrowsNew;
             State.AccountBorrows[symbol][borrower].InterestIndex = State.BorrowIndex[symbol];
             State.TotalBorrows[symbol] = totalBorrowsNew;
             Context.Fire(new RepayBorrow()
             {
                 Amount = actualRepayAmount,
                 Borrower = borrower,
                 BorrowBalance = accountBorrowsNew,
                 Payer = payer,
                 Symbol = symbol,
                 TotalBorrows = totalBorrowsNew
             });
             return actualRepayAmount;
          }

          private void SeizeInternal(Address liquidator, Address borrower, long seizeTokens,string symbol)
          {
             Assert(!State.SeizeGuardianPaused.Value, "seize is paused");
             Assert(State.Markets[symbol].IsListed,"Market is not listed");
             Assert(borrower!=liquidator,"LIQUIDATE_SEIZE_LIQUIDATOR_IS_BORROWER");
             var borrowerTokensNew = State.AccountTokens[symbol][borrower].Sub(seizeTokens);
             var liquidatorTokensNew=State.AccountTokens[symbol][liquidator].Add(seizeTokens);
             State.AccountTokens[symbol][borrower] = borrowerTokensNew;
             State.AccountTokens[symbol][liquidator] = liquidatorTokensNew;
          }

          private decimal GetBorrowRatePerBlock(string symbol)
          {
              var utilizationRate = GetUtilizationRate(symbol);
              var multiplierPerBlock = decimal.Parse(State.MultiplierPerBlock[symbol]);
              var baseRatePerBlock =decimal.Parse(State.BaseRatePerBlock[symbol]) ;
              var BorrowRate = utilizationRate*multiplierPerBlock+baseRatePerBlock;
              return BorrowRate;
          }
    }
}