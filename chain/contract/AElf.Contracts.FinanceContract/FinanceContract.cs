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
using Enum = System.Enum;

namespace AElf.Contracts.FinanceContract
{
    public partial class FinanceContract : FinanceContractContainer.FinanceContractBase
    {
        public Empty Initialize(InitializeInput initializeInput)
        {  
            var address=Context.GetZeroSmartContractAddress();
            State.GenesisContract.Value=Context.GetZeroSmartContractAddress();
            State.TokenContract.Value =
                Context.GetContractAddressByName(SmartContractConstants.TokenContractSystemName);
            State.CloseFactor.Value = initializeInput.CloseFactor;
            State.LiquidationIncentive.Value = initializeInput.LiquidationIncentive;
            State.MaxAssets.Value = initializeInput.MaxAssets;
            State.Admin.Value =
                State.GenesisContract.GetContractInfo.Call(new Address() {Value = address.ToByteString()}).Author.Value
                    .ToString();
            Assert(Context.Sender.Value.ToString() == State.Admin.Value, "only admin may initialize the market");
            return new Empty();
        }
       /// <summary>
       /// Applies accrued interest to total borrows and reserves
       /// </summary>
       /// <param name="stringValue">token name</param>
       /// <returns></returns>
        public Empty AccrueInterest(StringValue stringValue)
        {
            /* Remember the initial block number */
            long currentBlockNumber = getBlockNumber();
            long accrualBlockNumberPrior = State.AccrualBlockNumbers[stringValue.Value];
            Assert(accrualBlockNumberPrior == currentBlockNumber, "accumulating 0 interest");
            /*
               * Calculate the interest accumulated into borrows and reserves and the new index:
               *  simpleInterestFactor = borrowRate * blockDelta
               *  interestAccumulated = simpleInterestFactor * totalBorrows
               *  totalBorrowsNew = interestAccumulated + totalBorrows
               *  totalReservesNew = interestAccumulated * reserveFactor + totalReserves
               *  borrowIndexNew = simpleInterestFactor * borrowIndex + borrowIndex
               */      
            return new Empty();
        }

       //View Method
       public SymbolList GetAllMarkets(Empty empty)
       {
           return State.AllMarkets.Value;
       }

       public Int64Value GetBalance(Account account)
       {
           var balance = new Int64Value()
           {
               Value = State.AccountTokens[account.Symbol][account.Address]
           };
           return  balance;
       }

       public Int64Value GetUnderlyingBalance(Account account)
       {
           var result = State.InitialExchangeRate[account.Symbol];
           Assert(result!=null,"no such type of token in InitialExchangeRate");
           var rate = Convert.ToDecimal(result);
           var underlyingBalance = rate * State.AccountTokens[account.Symbol][account.Address];
           var balance = new Int64Value()
           {
               Value = (long)underlyingBalance
           };
           return balance;
       }
       public GetAccountSnapshotOutput GetAccountSnapshot(Account account)
       {
           var cTokenBalance = State.AccountTokens[account.Symbol][account.Address];
           var borrowBalance = borrowBalanceStoredInternal(account);
           var exchangeRate = exchangeRateStoredInternal(account.Symbol);
           return new GetAccountSnapshotOutput()
           {
               BorrowBalance = borrowBalance,
               CTokenBalance = cTokenBalance,
               ExchangeRate = exchangeRate.ToString()
           };
       }
       public StringValue GetBorrowRatePerBlock (StringValue symbol)
       {

           var utilizationRate = getUtilizationRate(symbol.Value);
           var multiplierPerBlock = Convert.ToDecimal(State.MultiplierPerBlock[symbol.Value]);
           var baseRatePerBlock =Convert.ToDecimal(State.BaseRatePerBlock[symbol.Value]) ;
           var BorrowRate = utilizationRate*multiplierPerBlock+baseRatePerBlock;
           return new StringValue()
           {
               Value = BorrowRate.ToString()
           };
       }
       public StringValue GetSupplyRatePerBlock ( StringValue symbol) 
       {
           //underlying = totalSupply × exchangeRate
           // borrowsPer = totalBorrows ÷ underlying
           //supplyRate = borrowRate × (1 − reserveFactor) × borrowsPer
           return new StringValue();
       }
       public Int64Value GetTotalBorrows ( StringValue stringValue)
       {
           return new Int64Value
           {
               Value = State.TotalBorrows[stringValue.Value]
           };
       }
       public Int64Value GetCurrentBorrowBalance (Account account)
       {
           var symbol = new StringValue()
           {
               Value = account.Symbol
           };
           AccrueInterest(symbol);
           return new Int64Value()
           {
            Value  = borrowBalanceStoredInternal(account)
           };

       }
       public Int64Value GetBorrowBalanceStored (Account account) 
       {
           return new Int64Value()
           {
               Value  = borrowBalanceStoredInternal(account)
           };
       }
       public StringValue GetCurrentExchangeRate (StringValue stringValue) 
       {
           AccrueInterest(stringValue);
           return new StringValue()
           {
               Value = exchangeRateStoredInternal(stringValue.Value).ToString()
           };
       }
       public  StringValue GetExchangeRateStored ( StringValue stringValue) 
       {
           return new StringValue()
           {
               Value = exchangeRateStoredInternal(stringValue.Value).ToString()
           };
       }
       public Int64Value GetCash ( StringValue stringValue) 
       {
          return new Int64Value()
          {
           Value = getCashPrior(stringValue.Value)
          };
       }
       public AssetList GetAssetsIn (Address address)
       {
           return new AssetList();
       }
       public BoolValue CheckMembership (Account account)
       {
           return new BoolValue()
          {
              Value =  State.Markets[account.Symbol].AccountMembership[account.Address.Value.ToString()]
          };
       }
       public Int64Value LiquidateCalculateSeizeTokens(LiquidateCalculateSeizeTokensInput liquidateCalculateSeizeTokensInput) 
       {
           return new Int64Value();
       }
        private long getBlockNumber()
        {
            return Context.CurrentHeight;
        }
/// <summary>
///  Return the borrow balance of account based on stored data
/// </summary>
/// <param name="account">The address whose balance should be calculated</param>
/// <returns></returns>
        private long borrowBalanceStoredInternal(Account account)
        {
            BorrowSnapshot borrowSnapshot = State.AccountBorrows[account.Symbol][account.Address];
            if (borrowSnapshot.Principal == 0) {
                return 0;
            }
            //Calculate new borrow balance using the interest index:
            //recentBorrowBalance = borrower.borrowBalance * market.borrowIndex / borrower.borrowIndex
             var borrowIndex = State.BorrowIndex[account.Symbol];
             if (borrowSnapshot.InterestIndex == 0)
             {
                 return 0;
             }
            try
            {
              var result=Convert.ToDecimal(borrowIndex) * Convert.ToDecimal(borrowSnapshot.Principal) / Convert.ToDecimal(borrowSnapshot.InterestIndex);
              return  Convert.ToInt64(result);
            }
            catch (Exception e)
            {
                Assert(e!=null,"Error in math");
                return 0;
            }
        }

       private decimal exchangeRateStoredInternal(string token)
       {
           var totalSupply = State.TotalSupply[token];
           var totalCash = getCashPrior(token);
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

       private long getCashPrior(string symbol)
       {
          var result= State.TokenContract.GetBalance.Call(new GetBalanceInput()
           {
               Owner = Context.Self,
               Symbol = symbol
           });
          return result.Balance;
       }

       private decimal getUtilizationRate(string token)
       {
           var totalCash = getCashPrior(token);
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
    }
}