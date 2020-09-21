using System;
using System.Collections;
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
            if (borrowSnapshot.InterestIndex == 0)
            {
                return 0;
            }

            var result = Convert.ToDecimal(borrowIndex) * borrowSnapshot.Principal /
                         borrowSnapshot.InterestIndex;
            return Convert.ToInt64(result);
        }

        private long ExchangeRateStoredInternal(string input)
        {
            var token = input;
            var totalSupply = State.TotalSupply[token];
            var totalCash = GetCashPrior(token);
            var totalBorrow = State.TotalBorrows[token];
            var totalReserves = State.TotalReserves[token];
            if (totalSupply == 0)
            {
                return State.InitialExchangeRate[token];
            }

            // exchangeRate = (totalCash + totalBorrows - totalReserves) / totalSupply
            var exchangeRate = Convert.ToInt64(Convert.ToDecimal(totalCash.Add(totalBorrow).Sub(totalReserves)) /
                totalSupply * DoubleExpandScale);
            Assert(exchangeRate > 0, "Insufficient exchangeRate");
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
            var denominator = Convert.ToDecimal(totalCash.Add(totalBorrow).Sub(totalReserves));
            Assert(denominator >= 0, "Insufficient denominator");
            if (denominator == 0)
            {
                return 0;
            }

            // utilizationRate = totalBorrows/(totalCash + totalBorrows - totalReserves)
            var utilizationRate = decimal.Round(totalBorrow / denominator, 16);
            return utilizationRate;
        }

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
            Assert(market != null && market.IsListed, "Market is not listed");
            market.AccountMembership.TryGetValue(borrower.ToString(), out var isMembership);
            if (isMembership)
            {
                return;
            }

            var asset = State.AccountAssets[borrower];
            if (asset == null)
            {
                State.AccountAssets[borrower] = new AssetList();
            }

            Assert(State.AccountAssets[borrower].Assets.Count < State.MaxAssets.Value, "Too Many Assets");
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
            if (price == 0)
                return false;
            if (price <= 0)
                return false;
            return true;
        }

        /// <summary>
        /// Determine what the account liquidity would be if the given amounts were redeemed/borrowed
        /// </summary>
        /// <returns></returns>
        private decimal GetHypotheticalAccountLiquidityInternal(Address address, string cToken, long redeemTokens,
            long borrowAmount)
        {
            var assets = State.AccountAssets[address];
            decimal sumCollateral = 0;
            decimal sumBorrowPlusEffects = 0;
            foreach (var asset in assets.Assets)
            {
                var symbol = asset;
                // Read the balances and exchange rate from the cToken
                var accountSnapshot = GetAccountSnapshot(address, symbol);
                var cTokenBalance = accountSnapshot.CTokenBalance;
                var exchangeRate = accountSnapshot.ExchangeRate.ToDecimal();
                var price = State.Prices[symbol].ToDecimal();
                var collateralFactor = State.Markets[symbol].CollateralFactor.ToDecimal();
                var tokensToCollateralPrice = exchangeRate * price * collateralFactor;
                sumCollateral += cTokenBalance * tokensToCollateralPrice;
                sumBorrowPlusEffects += accountSnapshot.BorrowBalance * price;
                if (symbol != cToken)
                    continue;
                //redeem effect
                sumBorrowPlusEffects += tokensToCollateralPrice * redeemTokens;
                //borrow effect
                sumBorrowPlusEffects += price * borrowAmount;
            }

            return sumBorrowPlusEffects - sumCollateral;
        }

        /// <summary>
        /// Get the underlying price of a listed cToken asset
        /// </summary>
        /// <param name="cToken"></param>
        /// <returns></returns>
        private decimal GetUnderlyingPrice(string cToken)
        {
            return State.Prices[cToken];
        }

        private long RepayBorrowFresh(Address payer, Address borrower, long repayAmount, string symbol)
        {
            var accrualBlockNumberPrior = State.AccrualBlockNumbers[symbol];
            Assert(accrualBlockNumberPrior == Context.CurrentHeight,
                "Market's block number should equals current block number");
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
            //accountBorrowsNew = accountBorrows - actualRepayAmount
            // totalBorrowsNew = totalBorrows - actualRepayAmount
            var accountBorrowsNew = accountBorrows.Sub(actualRepayAmount);
            Assert(accountBorrowsNew >= 0, "Insufficient Balance Of Token");
            var totalBorrowsNew = State.TotalBorrows[symbol].Sub(actualRepayAmount);
            Assert(totalBorrowsNew >= 0, "Insufficient Balance Of totalBorrows");
            DoTransferIn(payer, repayAmount, symbol);
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
            Assert(!State.SeizeGuardianPaused.Value, "Seize is paused");
            Assert(borrower != liquidator, "Liquidator is borrower");
            var borrowerTokensNew = State.AccountTokens[symbol][borrower].Sub(seizeTokens);
            var liquidatorTokensNew = State.AccountTokens[symbol][liquidator].Add(seizeTokens);
            State.AccountTokens[symbol][borrower] = borrowerTokensNew;
            State.AccountTokens[symbol][liquidator] = liquidatorTokensNew;
        }

        private long GetBorrowRatePerBlock(string symbol)
        {
            var utilizationRate = GetUtilizationRate(symbol);
            var multiplierPerBlock = State.MultiplierPerBlock[symbol].ToDecimal();
            var baseRatePerBlock = State.BaseRatePerBlock[symbol].ToDecimal();
            var borrowRate = Convert.ToInt64((utilizationRate * multiplierPerBlock + baseRatePerBlock) *
                                             DoubleExpandScale);
            return borrowRate;
        }

        private long GetSupplyRatePerBlock(string symbol)
        {
            var reserveFactor = State.ReserveFactor[symbol].ToDecimal();
            var borrowRate = GetBorrowRatePerBlock(symbol);
            var rateToPool = borrowRate - borrowRate * reserveFactor;
            var utilizationRate = GetUtilizationRate(symbol);
            var supplyRate = Convert.ToInt64(utilizationRate * rateToPool);
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
                ExchangeRate = exchangeRate
            };
        }

        private void Redeem(Address address, string symbol, long redeemTokens, long redeemAmount)
        {
            MarketVerify(symbol);
            if (State.Markets[symbol].AccountMembership
                .TryGetValue(address.ToString(), out var isExist) && isExist)
            {
                var shortfall = GetHypotheticalAccountLiquidityInternal(address, symbol, redeemTokens, 0);
                Assert(shortfall <= 0, "Insufficient Liquidity");
            }

            var accrualBlockNumberPrior = State.AccrualBlockNumbers[symbol];
            Assert(accrualBlockNumberPrior == Context.CurrentHeight,
                "market's block number should equals current block number");
            //totalSupplyNew = totalSupply - redeemTokens
            //accountTokensNew = accountTokens[redeemer] - redeemTokens
            var totalSupplyNew = State.TotalSupply[symbol].Sub(redeemTokens);
            var accountTokensNew = State.AccountTokens[symbol][Context.Sender].Sub(redeemTokens);
            Assert(GetCashPrior(symbol) >= redeemAmount, "Insufficient Token Cash");
            Assert(accountTokensNew >= 0, "Insufficient Token Balance");
            Assert(totalSupplyNew >= 0, "Insufficient totalSupplyNew");
            DoTransferOut(address, redeemAmount, symbol);
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
            MarketVerify(symbol);
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
            var borrowIndexPrior = State.BorrowIndex[symbol];
            var supplyRate = GetSupplyRatePerBlock(symbol);
            var borrowRate = GetBorrowRatePerBlock(symbol);
            Assert(borrowRate <= MaxBorrowRate, "BorrowRate is higher than MaxBorrowRate");
            //Calculate the number of blocks elapsed since the last accrual 
            var blockDelta = Context.CurrentHeight.Sub(State.AccrualBlockNumbers[symbol]);
            var simpleInterestFactor = borrowRate.ToDecimal() * blockDelta;
            var interestAccumulated = simpleInterestFactor * borrowPrior;
            var totalBorrowsNew = interestAccumulated + borrowPrior;
            var totalReservesNew = State.ReserveFactor[symbol].ToDecimal() * interestAccumulated +
                                   reservesPrior;
            var borrowIndexNew = Convert.ToInt64(simpleInterestFactor * borrowIndexPrior + borrowIndexPrior);
            State.AccrualBlockNumbers[symbol] = currentBlockNumber;
            State.BorrowIndex[symbol] = borrowIndexNew;
            State.TotalBorrows[symbol] = decimal.ToInt64(totalBorrowsNew);
            State.TotalReserves[symbol] = decimal.ToInt64(totalReservesNew);
            Context.Fire(new AccrueInterest()
            {
                Symbol = symbol,
                Cash = cashPrior,
                InterestAccumulated = decimal.ToInt64(interestAccumulated),
                BorrowIndex = borrowIndexNew,
                TotalBorrows = decimal.ToInt64(totalBorrowsNew),
                BorrowRatePerBlock = borrowRate,
                SupplyRatePerBlock = supplyRate
            });
        }

        private long LiquidateCalculateSeizeTokens(string borrowSymbol, string collateralSymbol, long repayAmount)
        {
            var priceBorrow = State.Prices[borrowSymbol];
            var priceCollateral = State.Prices[collateralSymbol];
            Assert(priceBorrow != 0 && priceCollateral != 0, "Error Price");
            var exchangeRate = ExchangeRateStoredInternal(collateralSymbol).ToDecimal();
            var liquidationIncentive = State.LiquidationIncentive.Value.ToDecimal();
            //Get the exchange rate and calculate the number of collateral tokens to seize:
            //    seizeAmount = actualRepayAmount * liquidationIncentive * priceBorrowed / priceCollateral
            //    seizeTokens = seizeAmount / exchangeRate
            //   = actualRepayAmount * (liquidationIncentive * priceBorrowed) / (priceCollateral * exchangeRate)
            var seizeAmount = repayAmount * liquidationIncentive *
                priceBorrow / priceCollateral;
            var seizeTokens = decimal.ToInt64(seizeAmount / exchangeRate);
            return seizeTokens;
        }

        /// <summary>
        /// Verify the token must on the chain
        /// </summary>
        /// <param name="symbol">symbol</param>
        /// <returns></returns>
        private void MarketVerify(string symbol)
        {
            var market = State.Markets[symbol];
            Assert(market != null && market.IsListed, "Market is not listed");
        }
    }
}