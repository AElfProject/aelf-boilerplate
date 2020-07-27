using System;
using AElf.Types;
using Google.Protobuf.WellKnownTypes;

namespace AElf.Contracts.FinanceContract
{
    public partial class FinanceContract
    {
        public override StringValue GetReserveFactor(StringValue input)
        {
            return new  StringValue()
            {
                Value =   State.ReserveFactor[input.Value]
            };
        }

        public override Address GetPendingAdmin(Empty input)
        {
            return State.PendingAdmin.Value;
        }

        public override Address GetAdmin(Empty input)
        {
            return State.Admin.Value;
        }

        public override StringValue GetCloseFactor(Empty input)
        {
            return new StringValue()
            {
                Value = State.CloseFactor.Value
            };
        }

        public override StringValue GetCollateralFactor(StringValue input)
        {
            return new StringValue()
            {
                Value = State.Markets[input.Value].CollateralFactor
            };
        }

        public override Int32Value GetMaxAssets(Empty input)
        {
            return new Int32Value()
            {
                Value = State.MaxAssets.Value
            };
        }

        public override StringValue GetLiquidationIncentive(Empty input)
        {
            return new StringValue()
            {
                Value = State.LiquidationIncentive.Value
            };
        }

        public override Address GetPauseGuardian(Empty input)
        {
            return State.PauseGuardian.Value;
        }

        public override GetInterestRateOutput GetInterestRate(StringValue input)
        {
            return  new GetInterestRateOutput()
            {
                BaseRatePerBlock = State.BaseRatePerBlock[input.Value],
                MultiplierPerBlock = State.MultiplierPerBlock[input.Value]
            };
        }

        public override StringValue GetUnderlyingPrice(StringValue input)
        {
            return new StringValue()
            {
                Value = State.Prices[input.Value].ToString()
            };
        }
        
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
           var borrowBalance = BorrowBalanceStoredInternal(input);
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
       public override StringValue GetSupplyRatePerBlock (StringValue input)
       {
           var reserveFactor = decimal.Parse(State.ReserveFactor[input.Value]);
           var borrowRate = GetBorrowRatePerBlock(input.Value);
           var rateToPool = borrowRate- borrowRate * reserveFactor;
           var utilizationRate = GetUtilizationRate(input.Value);
           var SupplyRate = utilizationRate * rateToPool;
           return new StringValue()
           {
               Value = SupplyRate.ToString()
           };
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
            Value  = BorrowBalanceStoredInternal(input)
           };

       }
       public override Int64Value GetBorrowBalanceStored (Account input) 
       {
           return new Int64Value()
           {
               Value  = BorrowBalanceStoredInternal(input)
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
           var assetList = State.AccountAssets[input];
           return assetList;
       }
       
       public override BoolValue CheckMembership (Account input)
       {
           return new BoolValue()
           {
               Value =  State.Markets[input.Symbol].AccountMembership[input.Address.Value.ToString()]
           };
       }
    }
}