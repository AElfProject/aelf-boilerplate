using System;
using AElf.Contracts.MultiToken;
using AElf.CSharp.Core;
using AElf.Sdk.CSharp;
using AElf.Types;
using Google.Protobuf.WellKnownTypes;

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
            if (borrowSnapshot == null)
            {
                return 0;
            }
            if (borrowSnapshot.Principal == 0)
            {
                return 0;
            }
            //Calculate new borrow balance using the interest index:
            //recentBorrowBalance = borrower.borrowBalance * market.borrowIndex / borrower.borrowIndex
            var borrowIndex = State.BorrowIndex[input.Symbol];
            if (borrowSnapshot.InterestIndex == "0")
            {
                return 0;
            }
            var result = decimal.Parse(borrowIndex) * borrowSnapshot.Principal /
                         decimal.Parse(borrowSnapshot.InterestIndex);
            return Convert.ToInt64(result);
        
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
            var result = State.TokenContract.GetBalance.Call(new GetBalanceInput()
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
            var utilizationRate = Convert.ToDecimal(totalBorrow) / denominator;
            return utilizationRate;
        }

        /// <returns> the actual amount received</returns>
        private void DoTransferIn(Address from, long amount, string symbol)
        {
            var input = new TransferFromInput()
            {
                Amount = amount,
                From = from,
                Memo = "TransferIn",
                Symbol = symbol,
                To = Context.Self
            };
            State.TokenContract.TransferFrom.Send(input);
            // var balanceAfter = GetCashPrior(symbol);
            // Assert(balanceAfter >= balanceBefore, "TOKEN_TRANSFER_IN_OVERFLOW");
            // return  balanceAfter - balanceBefore; 
        }

        private void DoTransferOut(Address to, long amount, string symbol)
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

        private void AddToMarketInternal(string symbol, Address borrower)
        {
            var market = State.Markets[symbol];
            Assert(market.IsListed, "MARKET_NOT_LISTED");
            market.AccountMembership.TryGetValue(borrower.ToString(), out var isMembership);
            if (isMembership)
            {
                return;
            }
            var asset = State.AccountAssets[borrower];
            if (asset == null)
            {
                State.AccountAssets[borrower]=new AssetList();
               
            }
            Assert(State.AccountAssets[borrower].Assets.Count < State.MaxAssets.Value, "TOO_MANY_ASSETS");
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
           var price = State.Prices[cToken];
            if (price == null)
                return false;
            if (decimal.Parse(price) <= 0)
                return false;
            return true;
        }

        /// <summary>
        /// Determine what the account liquidity would be if the given amounts were redeemed/borrowed
        /// </summary>
        /// <returns></returns>
        private long GetHypotheticalAccountLiquidityInternal(Address address, string cToken, long redeemTokens,
            long borrowAmount)
        {
            var assets = State.AccountAssets[address];
            decimal sumCollateral = 0;
            decimal sumBorrowPlusEffects = 0;
            for (int i = 0; i < assets.Assets.Count; i++)
            {
                var symbol = assets.Assets[i];
                // Read the balances and exchange rate from the cToken
                var accountSnapshot = GetAccountSnapshot(address, symbol);
                var cTokenBalance = accountSnapshot.CTokenBalance;
                var exchangeRate = decimal.Parse(accountSnapshot.ExchangeRate);
                var price = decimal.Parse(State.Prices[symbol]);
                var collateralFactor = decimal.Parse(State.Markets[symbol].CollateralFactor);
                var tokensToDenom = exchangeRate * price * collateralFactor;
                sumCollateral += cTokenBalance * tokensToDenom;
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

            return decimal.ToInt64(sumBorrowPlusEffects - sumCollateral);
        }

        /// <summary>
        /// Get the underlying price of a listed cToken asset
        /// </summary>
        /// <param name="cToken"></param>
        /// <returns></returns>
        private decimal GetUnderlyingPrice(string cToken)
        {
            return decimal.Parse(State.Prices[cToken]);
        }

        private long RepayBorrowFresh(Address payer, Address borrower, long repayAmount, string symbol)
        {
            Assert(State.Markets[symbol].IsListed, "Market is not listed");
            var accrualBlockNumberPrior = State.AccrualBlockNumbers[symbol];
            Assert(accrualBlockNumberPrior == Context.CurrentHeight,
                "market's block number should equals current block number");
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

            var actualRepayAmount = repayAmount;
            DoTransferIn(payer, repayAmount, symbol);
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

        private void SeizeInternal(Address liquidator, Address borrower, long seizeTokens, string symbol)
        {
            Assert(!State.SeizeGuardianPaused.Value, "seize is paused");
            Assert(State.Markets[symbol].IsListed, "Market is not listed");
            Assert(borrower != liquidator, "LIQUIDATE_SEIZE_LIQUIDATOR_IS_BORROWER");
            var borrowerTokensNew = State.AccountTokens[symbol][borrower].Sub(seizeTokens);
            var liquidatorTokensNew = State.AccountTokens[symbol][liquidator].Add(seizeTokens);
            State.AccountTokens[symbol][borrower] = borrowerTokensNew;
            State.AccountTokens[symbol][liquidator] = liquidatorTokensNew;
        }

        private decimal GetBorrowRatePerBlock(string symbol)
        {
            var utilizationRate = GetUtilizationRate(symbol);
            var multiplierPerBlock = decimal.Parse(State.MultiplierPerBlock[symbol]);
            var baseRatePerBlock = decimal.Parse(State.BaseRatePerBlock[symbol]);
            var borrowRate = utilizationRate * multiplierPerBlock + baseRatePerBlock;
            return borrowRate;
        }

        private decimal GetSupplyRatePerBlock(string symbol)
        {
            var reserveFactor = decimal.Parse(State.ReserveFactor[symbol]);
            var borrowRate = GetBorrowRatePerBlock(symbol);
            var rateToPool = borrowRate - borrowRate * reserveFactor;
            var utilizationRate = GetUtilizationRate(symbol);
            var supplyRate = utilizationRate * rateToPool;
            return supplyRate;
        }

        private GetAccountSnapshotOutput GetAccountSnapshot(Address address, string symbol)
        {
            var account = new Account()
            {
                Address = address,
                Symbol = symbol
            };
            var cTokenBalance = State.AccountTokens[symbol][address];
            var borrowBalance = BorrowBalanceStoredInternal(account);
            var exchangeRate = ExchangeRateStoredInternal(symbol);
            return new GetAccountSnapshotOutput()
            {
                BorrowBalance = borrowBalance,
                CTokenBalance = cTokenBalance,
                ExchangeRate = exchangeRate.ToInvariantString()
            };
        }

        private void Redeem(Address address, string symbol, long redeemTokens, long redeemAmount)
        {
            Assert(State.Markets[symbol].IsListed, "Market is not listed");
            if (State.Markets[symbol].AccountMembership[address.ToString()])
            {
                var shortfall = GetHypotheticalAccountLiquidityInternal(address, symbol, redeemTokens, 0);
                Assert(shortfall <= 0, "INSUFFICIENT_LIQUIDITY");
            }

            var accrualBlockNumberPrior = State.AccrualBlockNumbers[symbol];
            Assert(accrualBlockNumberPrior == Context.CurrentHeight,
                "market's block number should equals current block number");
            //totalSupplyNew = totalSupply - redeemTokens
            //accountTokensNew = accountTokens[redeemer] - redeemTokens
            var totalSupplyNew = State.TotalSupply[symbol].Sub(redeemTokens);
            var accountTokensNew = State.AccountTokens[symbol][Context.Sender].Sub(redeemTokens);
            Assert(GetCashPrior(symbol) >= redeemAmount, "TOKEN_INSUFFICIENT_CASH");
            DoTransferOut(address, redeemAmount, symbol);
            //We write previously calculated values into storage
            State.TotalSupply[symbol] = totalSupplyNew;
            State.AccountTokens[symbol][address] = accountTokensNew;
            Context.Fire(new Redeem()
            {
                Address = address,
                Amount = redeemAmount,
                CTokenAmount = redeemTokens,
                Symbol = symbol
            });
        }

        private void AccrueInterest(string symbol)
        {
            /* Remember the initial block number */
            var currentBlockNumber = Context.CurrentHeight;
            var accrualBlockNumberPrior = State.AccrualBlockNumbers[symbol];
            if (accrualBlockNumberPrior == currentBlockNumber)
            {
                return;
            }

            /*
               * Calculate the interest accumulated into borrows and reserves and the new index:
               *  simpleInterestFactor = borrowRate * blockDelta
               *  interestAccumulated = simpleInterestFactor * totalBorrows
               *  totalBorrowsNew = interestAccumulated + totalBorrows
               *  totalReservesNew = interestAccumulated * reserveFactor + totalReserves
               *  borrowIndexNew = simpleInterestFactor * borrowIndex + borrowIndex
               */
            var cashPrior = GetCashPrior(symbol);
            var borrowPrior = State.TotalBorrows[symbol];
            var reservesPrior = State.TotalReserves[symbol];
            var borrowIndexPrior = decimal.Parse(State.BorrowIndex[symbol]);
            var supplyRate = GetSupplyRatePerBlock(symbol);
            var borrowRate = GetBorrowRatePerBlock(symbol);
            Assert(borrowRate <= decimal.Parse(MaxBorrowRate), "BorrowRate is higher than MaxBorrowRate");
            //Calculate the number of blocks elapsed since the last accrual 
            var blockDelta = Context.CurrentHeight.Sub(State.AccrualBlockNumbers[symbol]);
            var simpleInterestFactor = borrowRate * blockDelta;
            var interestAccumulated = simpleInterestFactor * borrowPrior;
            var totalBorrowsNew = interestAccumulated + borrowPrior;
            var totalReservesNew = decimal.Parse(State.ReserveFactor[symbol]) * interestAccumulated +
                                   reservesPrior;
            var borrowIndexNew = simpleInterestFactor * borrowIndexPrior + borrowIndexPrior;
            State.AccrualBlockNumbers[symbol] = currentBlockNumber;
            State.BorrowIndex[symbol] = borrowIndexNew.ToInvariantString();
            State.TotalBorrows[symbol] = decimal.ToInt64(totalBorrowsNew);
            State.TotalReserves[symbol] = decimal.ToInt64(totalReservesNew);
            Context.Fire(new AccrueInterest()
            {
                Symbol = symbol,
                Cash = cashPrior,
                InterestAccumulated = decimal.ToInt64(interestAccumulated),
                BorrowIndex = borrowIndexNew.ToInvariantString(),
                TotalBorrows = decimal.ToInt64(totalBorrowsNew),
                BorrowRatePerBlock = borrowRate.ToInvariantString(),
                SupplyRatePerBlock = supplyRate.ToInvariantString()
            });
        }

        private long LiquidateCalculateSeizeTokens(string borrowSymbol, string collateralSymbol, decimal repayAmount)
        {
            var priceBorrow = decimal.Parse(State.Prices[borrowSymbol]);
            var priceCollateral = decimal.Parse(State.Prices[collateralSymbol]);
            Assert(priceBorrow != 0 && priceCollateral != 0, "PRICE_ERROR");
            var exchangeRate = ExchangeRateStoredInternal(collateralSymbol);
            //Get the exchange rate and calculate the number of collateral tokens to seize:
            // *  seizeAmount = actualRepayAmount * liquidationIncentive * priceBorrowed / priceCollateral
            //    seizeTokens = seizeAmount / exchangeRate
            //   = actualRepayAmount * (liquidationIncentive * priceBorrowed) / (priceCollateral * exchangeRate)
            var seizeAmount = repayAmount * decimal.Parse(State.LiquidationIncentive.Value) *
                priceBorrow / priceCollateral;
            var seizeTokens = decimal.ToInt64(seizeAmount / exchangeRate);
            return seizeTokens;
        }
    }
}