using System;
using System.Linq;
using AElf.Contracts.MultiToken;
using AElf.CSharp.Core;
using AElf.Sdk.CSharp;
using AElf.Types;
using Google.Protobuf;

namespace AElf.Contracts.AESwapContract
{
    public partial class AESwapContract
    {
        /// <summary>
        /// get the only tokenPair
        /// </summary>
        /// <param name="tokenPair"></param>
        /// <returns></returns>
        private string GetPair(string tokenPair)
        {
            Assert(tokenPair.Contains("-"), "Invalid TokenPair");
            var tokens = tokenPair.Split('-');
            Assert(TokenVerify(tokens[0]) && TokenVerify(tokens[1]), "Invalid Tokens");
            var sortedTokenPair = tokenPair;
            if (string.Compare(tokens[0], tokens[1], StringComparison.InvariantCulture) >= 1)
            {
                sortedTokenPair = string.Join("-", tokens[1], tokens[0]);
            }

            return sortedTokenPair;
        }

        private string GetPair(string tokenA, string tokenB)
        {
            // Assert(tokenPair.Contains("-"), "Invalid TokenPair");
            var tokens = new[] {tokenA, tokenB};
            Assert(TokenVerify(tokens[0]) && TokenVerify(tokens[1]), "Invalid Tokens");
            var sortedTokenPair = string.Join("-", tokens[0], tokens[1]);
            if (string.Compare(tokens[0], tokens[1], StringComparison.InvariantCulture) >= 1)
            {
                sortedTokenPair = string.Join("-", tokens[1], tokens[0]);
            }

            return sortedTokenPair;
        }

        private string[] SortTokens(string tokenPair)
        {
            Assert(tokenPair.Contains("-"), "Invalid TokenPair");
            var tokens = tokenPair.Split('-');
            if (string.Compare(tokens[0], tokens[1], StringComparison.InvariantCulture) >= 1)
            {
                var index = tokens[0];
                tokens[0] = tokens[1];
                tokens[1] = index;
            }

            return tokens;
        }

        private void PairInitial(Address pair, string tokenA, string tokenB)
        {
            State.TotalReserves[pair][tokenA] = 0;
            State.TotalReserves[pair][tokenB] = 0;
            State.TotalSupply[pair] = 0;
        }

        private bool TokenVerify(string token)
        {
            var tokenInfo = State.TokenContract.GetTokenInfo.Call(new GetTokenInfoInput()
            {
                Symbol = token
            });
            if (tokenInfo.Symbol == "")
                return false;
            return true;
        }

        private long[] AddLiquidity(string tokenA, string tokenB, long amountADesired, long amountBDesired,
            long amountAMin, long amountBMin)
        {
            Assert(State.Pairs[tokenA][tokenB] != null, "Pair is not exist");
            long amountA;
            long amountB;
            var reserves = GetReserves(State.Pairs[tokenA][tokenB].Address, tokenA, tokenB);
            if (reserves[0] == 0 && reserves[1] == 0)
            {
                amountA = amountADesired;
                amountB = amountBDesired;
            }
            else
            {
                var amountBOptimal = Quote(amountADesired, reserves[0], reserves[1]);
                if (amountBOptimal <= amountBDesired)
                {
                    Assert(amountBOptimal >= amountBMin, "Insufficient amount of tokenB");
                    amountA = amountADesired;
                    amountB = amountBOptimal;
                }
                else
                {
                    var amountAOptimal = Quote(amountBDesired, reserves[1], reserves[0]);
                    Assert(amountAOptimal <= amountADesired);
                    Assert(amountAOptimal >= amountAMin, "Insufficient amount of tokenA");
                    amountA = amountAOptimal;
                    amountB = amountBDesired;
                }
            }

            return new[]
            {
                amountA, amountB
            };
        }

        private long[] RemoveLiquidity(string tokenA, string tokenB, long liquidityRemoveAmount,
            long amountAMin, long amountBMin)
        {
            Assert(State.Pairs[tokenA][tokenB] != null, "Pair is not exist");
            var liquidity = State.LiquidityTokens[State.Pairs[tokenA][tokenB].Address][Context.Sender];
            Assert(liquidity > 0 && liquidityRemoveAmount <= liquidity, "Insufficient LiquidityToken");
            var amount = Burn(Context.Sender, tokenA, tokenB, liquidityRemoveAmount);
            Assert(amount[0] >= amountAMin, "Insufficient tokenA");
            Assert(amount[1] >= amountBMin, "Insufficient tokenB");
            return new[]
            {
                amount[0], amount[1]
            };
        }

        private long[] GetReserves(Address pairAddress, string tokenA, string tokenB)
        {
            var amountA = State.TotalReserves[pairAddress][tokenA];
            var amountB = State.TotalReserves[pairAddress][tokenB];
            return new[]
            {
                amountA, amountB
            };
        }

        private long Mint(string tokenA, string tokenB, long amountA, long amountB, Address account)
        {
            var pairAddress = State.Pairs[tokenA][tokenB].Address;
            var balanceA = GetBalance(tokenA, pairAddress).Add(amountA);
            var balanceB = GetBalance(tokenB, pairAddress).Add(amountB);
            var reserves = GetReserves(pairAddress, tokenA, tokenB);
            var totalSupply = State.TotalSupply[pairAddress];
            var liquidity = (totalSupply == 0)
                ? decimal.ToInt64(Sqrt(amountA.Mul(amountB)) - 1)
                : Math.Min(decimal.ToInt64(Convert.ToDecimal(amountA) * totalSupply / reserves[0]),
                    decimal.ToInt64(Convert.ToDecimal(amountB) * totalSupply / reserves[1]));
            Assert(liquidity > 0, "Insufficient liquidity Minted");
            if (totalSupply == 0)
            {
                State.LiquidityTokens[pairAddress][Context.GetZeroSmartContractAddress()] =
                    State.LiquidityTokens[pairAddress][Context.GetZeroSmartContractAddress()].Add(1);
                State.TotalSupply[pairAddress] = State.TotalSupply[pairAddress].Add(liquidity).Add(1);
            }
            else
            {
                State.TotalSupply[pairAddress] = State.TotalSupply[pairAddress].Add(liquidity);
            }

            var oldLiquidityToken = State.LiquidityTokens[pairAddress][account];
            var newLiquidityToken = oldLiquidityToken.Add(liquidity);
            State.LiquidityTokens[pairAddress][account] = newLiquidityToken;

            State.AccountAssets[account] = State.AccountAssets[account] ?? new PairList();
            var pairString = GetPair(tokenA, tokenB);
            if (!State.AccountAssets[account].SymbolPair.Contains(pairString))
            {
                State.AccountAssets[account].SymbolPair.Add(pairString);
            }

            Update(balanceA, balanceB, reserves[0], reserves[1], tokenA, tokenB);
            Context.Fire(new LiquidityAdded()
            {
                AmountA = amountA,
                AmountB = amountB,
                LiquidityToken = liquidity,
                Sender = Context.Sender,
                SymbolA = tokenA,
                SymbolB = tokenB
            });
            return liquidity;
        }

        private long[] Burn(Address to, string tokenA, string tokenB, long liquidityRemoveAmount)
        {
            var pairAddress = State.Pairs[tokenA][tokenB].Address;
            var balanceA = GetBalance(tokenA, pairAddress);
            var balanceB = GetBalance(tokenB, pairAddress);
            var reserves = GetReserves(pairAddress, tokenA, tokenB);
            var totalSupply = State.TotalSupply[pairAddress];
            var liquidityRemoveAmountDecimal = Convert.ToDecimal(liquidityRemoveAmount);
            var amountA = decimal.ToInt64(liquidityRemoveAmountDecimal * balanceA / totalSupply);
            var amountB = decimal.ToInt64(liquidityRemoveAmountDecimal * balanceB / totalSupply);
            Assert(amountA > 0 && amountB > 0, "Insufficient Liquidity burned");
            var oldTotalSupply = totalSupply;
            var newTotalSupply = oldTotalSupply.Sub(liquidityRemoveAmount);
            Assert(newTotalSupply >= 0, "Insufficient TotalSupply");
            State.TotalSupply[pairAddress] = newTotalSupply;
            var oldLiquidityToken = State.LiquidityTokens[pairAddress][to];
            var newLiquidityToken = oldLiquidityToken.Sub(liquidityRemoveAmount);
            Assert(newLiquidityToken >= 0, "Insufficient Liquidity");
            State.LiquidityTokens[pairAddress][to] = newLiquidityToken;
            TransferOut(State.Pairs[tokenA][tokenB].Hash, to, tokenA, amountA);
            TransferOut(State.Pairs[tokenA][tokenB].Hash, to, tokenB, amountB);
            var balanceANew = balanceA.Sub(amountA);
            var balanceBNew = balanceB.Sub(amountB);
            if (newLiquidityToken == 0)
            {
                State.AccountAssets[Context.Sender].SymbolPair.Remove(GetPair(tokenA, tokenB));
            }

            Update(balanceANew, balanceBNew, reserves[0], reserves[1], tokenA, tokenB);
            Context.Fire(new LiquidityRemoved()
            {
                AmountA = amountA,
                AmountB = amountB,
                Sender = Context.Sender,
                SymbolA = tokenA,
                SymbolB = tokenB,
                LiquidityToken = liquidityRemoveAmount
            });
            return new[]
            {
                amountA, amountB
            };
        }

        private void Swap(string symbolIn, string symbolOut, long amountIn, long amountOut, Address to)
        {
            var pairAddress = State.Pairs[symbolIn][symbolOut].Address;
            var reserveSymbolIn = State.TotalReserves[pairAddress][symbolIn];
            var reserveSymbolOut = State.TotalReserves[pairAddress][symbolOut];
            Assert(amountOut < reserveSymbolOut, "Insufficient reserve of out token");
            var pairHash = State.Pairs[symbolIn][symbolOut].Hash;
            Assert(to != pairAddress, "Invalid account address");
            TransferOut(pairHash, to, symbolOut, amountOut);
            var feeRate = GetFeeRate();
            var swapFee = decimal.ToInt64(feeRate * amountIn);
            if (swapFee > 0)
            {
                TransferOut(pairHash, Context.Self, symbolIn, swapFee);
            }

            var totalFee = decimal.ToInt64(Convert.ToDecimal(amountIn) * 3 / 1000);
            var balanceIn = GetBalance(symbolIn, pairAddress).Add(amountIn);
            var balanceOut = GetBalance(symbolOut, pairAddress).Sub(amountOut);
            Assert(amountIn > 0, "Insufficient Input amount");
            var balance0Adjusted = Convert.ToDecimal(balanceIn.Mul(1000).Sub(amountIn.Mul(3)));
            var balance1Adjusted = balanceOut;
            var reserveSymbolInDecimal = Convert.ToDecimal(reserveSymbolIn);
            Assert(balance0Adjusted * balance1Adjusted >= reserveSymbolInDecimal * reserveSymbolOut * 1000,
                "Error with K");
            balanceIn = balanceIn.Sub(swapFee);
            Update(balanceIn, balanceOut, reserveSymbolIn, reserveSymbolOut, symbolIn, symbolOut);
            Context.Fire(new Swap()
            {
                SymbolIn = symbolIn,
                SymbolOut = symbolOut,
                AmountIn = amountIn,
                AmountOut = amountOut,
                Sender = Context.Sender,
                TotalFee = totalFee,
                BonusFee = swapFee
            });
        }

        private void Update(long balanceA, long balanceB, long reserveA, long reserveB, string tokenA,
            string tokenB)
        {
            var pairAddress = State.Pairs[tokenA][tokenB].Address;
            var blockTimestamp = Context.CurrentBlockTime.Seconds;
            var timeElapsed = blockTimestamp - State.BlockTimestampLast[pairAddress];
            if (timeElapsed > 0 && reserveA != 0 && reserveB != 0)
            {
                var priceCumulativeA = decimal.ToInt64(Convert.ToDecimal(reserveB) / reserveA * timeElapsed);
                var priceCumulativeB = decimal.ToInt64(Convert.ToDecimal(reserveA) / reserveB * timeElapsed);
                State.PriceCumulativeLast[pairAddress][tokenA] = State.PriceCumulativeLast[pairAddress][tokenA]
                    .Add(priceCumulativeA);
                State.PriceCumulativeLast[pairAddress][tokenB] = State.PriceCumulativeLast[pairAddress][tokenB]
                    .Add(priceCumulativeB);
            }

            State.TotalReserves[pairAddress][tokenA] = balanceA;
            State.TotalReserves[pairAddress][tokenB] = balanceB;
            State.BlockTimestampLast[pairAddress] = blockTimestamp;
            Context.Fire(new Sync()
            {
                ReserveA = reserveA,
                ReserveB = reserveB,
                SymbolA = tokenA,
                SymbolB = tokenB
            });
        }

        private void Skim(string symbolA, string symbolB, Address to)
        {
            var pairAddress = State.Pairs[symbolA][symbolB].Address;
            var hash = State.Pairs[symbolA][symbolB].Hash;
            var balanceA = GetBalance(symbolA, pairAddress);
            var balanceB = GetBalance(symbolB, pairAddress);
            var reserveSymbolA = State.TotalReserves[pairAddress][symbolA];
            var reserveSymbolB = State.TotalReserves[pairAddress][symbolB];
            var amountATransfer = balanceA.Sub(reserveSymbolA);
            var amountBTransfer = balanceB.Sub(reserveSymbolB);
            Assert(amountATransfer >= 0 && amountATransfer >= 0, "Error Skim");
            TransferOut(hash, to, symbolA, amountATransfer);
            TransferOut(hash, to, symbolB, amountBTransfer);
        }

        private void TransferIn(Address from, Address to, string symbol, long amount)
        {
            State.TokenContract.TransferFrom.Send(
                new TransferFromInput()
                {
                    Symbol = symbol,
                    Amount = amount,
                    From = from,
                    Memo = "TransferIn",
                    To = to
                });
        }

        private void TransferOut(Hash hash, Address address, string symbol, long amount)
        {
            Context.SendVirtualInline(hash, State.TokenContract.Value, "Transfer", new TransferInput()
            {
                Symbol = symbol,
                Amount = amount,
                To = address,
                Memo = "TransferOut"
            }.ToByteString());
        }

        private long GetBalance(string symbol, Address address)
        {
            var balance = State.TokenContract.GetBalance.Call(new GetBalanceInput()
            {
                Owner = address,
                Symbol = symbol
            });
            return balance.Balance;
        }

        private static decimal Sqrt(decimal n)
        {
            if (n == 0)
                return 0;
            decimal left = 1, right = n, mid = decimal.Truncate(left + right / 2);
            while (left != right && mid != left)
            {
                if (mid == decimal.Truncate(n / mid))
                    return mid;
                if (mid < decimal.Truncate(n / mid))
                {
                    left = mid;
                    mid = decimal.Truncate((left + right) / 2);
                }
                else
                {
                    right = mid;
                    mid = decimal.Truncate((left + right) / 2);
                }
            }

            return left;
        }

        private decimal GetFeeRate()
        {
            Assert(Context.CurrentBlockTime.Seconds >= State.InitialTimestamp.Value.Seconds, "Error BlockTime");
            var yearSinceInitial = Context.CurrentBlockTime.Seconds.Sub(State.InitialTimestamp.Value.Seconds)
                .Div(SecondPerYear);
            var yearForRate = yearSinceInitial > 5 ? 5 : yearSinceInitial;
            var rate = Convert.ToDecimal(FeeRatePerYear) * yearForRate / 10000;
            return rate;
        }

        /// <summary>
        /// get equivalent amount of the other token in circumstances of this reserves of pair
        /// </summary>
        /// <param name="amountA"></param>
        /// <param name="reserveA"></param>
        /// <param name="reserveB"></param>
        /// <returns>equivalent amount of tokenB</returns>
        private long Quote(long amountA, long reserveA, long reserveB)
        {
            Assert(amountA > 0, "Insufficient Amount");
            Assert(reserveA > 0 && reserveB > 0, "Insufficient Reserves");
            var amountADecimal = Convert.ToDecimal(amountA);
            var amountB = decimal.ToInt64(amountADecimal * reserveB / reserveA);
            return amountB;
        }

        private long GetAmountIn(long amountOut, long reserveIn, long reserveOut)
        {
            Assert(amountOut > 0, "Insufficient Output amount");
            Assert(reserveIn > 0 && reserveOut > 0 && reserveOut > amountOut, "Insufficient reserves");
            var reserveInDecimal = Convert.ToDecimal(reserveIn);
            var reserveOutDecimal = Convert.ToDecimal(reserveOut);
            var numerator = reserveInDecimal * amountOut * 1000;
            var denominator = (reserveOutDecimal - amountOut) * 997;
            var amountIn = decimal.ToInt64(numerator / denominator) + 1;
            return amountIn;
        }

        private long GetAmountOut(long amountIn, long reserveIn, long reserveOut)
        {
            Assert(amountIn > 0, "Insufficient Output amount");
            Assert(reserveIn > 0 && reserveOut > 0, "Insufficient reserves");
            var reserveInDecimal = Convert.ToDecimal(reserveIn);
            var reserveOutDecimal = Convert.ToDecimal(reserveOut);
            var amountInWithFee = amountIn.Mul(997);
            var numerator = amountInWithFee * reserveOutDecimal;
            var denominator = (reserveInDecimal * 1000) + amountInWithFee;
            var amountOut = decimal.ToInt64(numerator / denominator);
            return amountOut;
        }
    }
}