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
            if (tokens[0].GetHashCode() > tokens[1].GetHashCode())
            {
                sortedTokenPair = string.Join("-", tokens[1], tokens[0]);
            }

            return sortedTokenPair;
        }

        private string[] SortTokens(string tokenPair)
        {
            Assert(tokenPair.Contains("-"), "Invalid TokenPair");
            var tokens = tokenPair.Split('-');
            if (tokens[0].GetHashCode() > tokens[1].GetHashCode())
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

        private long[] RemoveLiquidity(string tokenA, string tokenB, long liquidity,
            long amountAMin, long amountBMin)
        {
            Assert(State.Pairs[tokenA][tokenB] != null, "Pair is not exist");
            var amount = Burn(Context.Sender, tokenA, tokenB);
            Assert(amount[0] > amountAMin, "Insufficient tokenA");
            Assert(amount[1] > amountBMin, "Insufficient tokenB");
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

        private long Mint(string tokenA, string tokenB, Address account)
        {
            var pairAddress = State.Pairs[tokenA][tokenB].Address;
            var balanceA = GetBalance(tokenA, pairAddress);
            var balanceB = GetBalance(tokenB, pairAddress);
            var reserves = GetReserves(pairAddress, tokenA, tokenB);
            var amountA = balanceA.Sub(reserves[0]);
            var amountB = balanceB.Sub(reserves[1]);
            var totalSupply = State.TotalSupply[pairAddress];
            var liquidity = (totalSupply == 0)
                ? Sqrt(amountA.Mul(amountB))
                : Math.Min(amountA.Mul(totalSupply) / reserves[0], amountB.Mul(totalSupply) / reserves[1]);
            Assert(liquidity > 0, "Insufficient liquidity Minted");
            State.TotalSupply[pairAddress].Add(liquidity);
            var oldLiquidityToken = State.LiquidityTokens[pairAddress][account];
            var newLiquidityToken = oldLiquidityToken.Add(liquidity);
            State.LiquidityTokens[pairAddress][account] = newLiquidityToken;
            Update(balanceA, balanceB, reserves[0], reserves[1], tokenA, tokenB);
            Context.Fire(new Mint()
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

        private long[] Burn(Address to, string tokenA, string tokenB)
        {
            var pairAddress = State.Pairs[tokenA][tokenB].Address;
            var balanceA = GetBalance(tokenA, pairAddress);
            var balanceB = GetBalance(tokenB, pairAddress);
            var reserves = GetReserves(pairAddress, tokenA, tokenB);
            var liquidity = State.LiquidityTokens[pairAddress][to];
            var totalSupply = State.TotalSupply[pairAddress];
            var amountA = liquidity.Mul(balanceA).Div(totalSupply);
            var amountB = liquidity.Mul(balanceB).Div(totalSupply);
            Assert(amountA > 0 && amountB > 0, "Insufficient Liquidity burned");
            State.TotalSupply[pairAddress].Div(liquidity);
            var oldLiquidityToken = State.LiquidityTokens[pairAddress][to];
            var newLiquidityToken = oldLiquidityToken.Div(liquidity);
            Assert(newLiquidityToken > 0, "Insufficient Liquidity");
            State.LiquidityTokens[pairAddress][to] = newLiquidityToken;
            TransferOut(State.Pairs[tokenA][tokenB].Hash, to, tokenA, amountA);
            TransferOut(State.Pairs[tokenA][tokenB].Hash, to, tokenB, amountB);
            balanceA = GetBalance(tokenA, pairAddress);
            balanceB = GetBalance(tokenB, pairAddress);
            Update(balanceA, balanceB, reserves[0], reserves[1], tokenA, tokenB);
            Context.Fire(new Burn()
            {
                AmountA = amountA,
                AmountB = amountB,
                Sender = Context.Sender,
                SymbolA = tokenA,
                SymbolB = tokenB
            });
            return new[]
            {
                amountA, amountB
            };
        }

        private void Swap(string symbolIn, string symbolOut, long amount, Address to)
        {
            var pairAddress = State.Pairs[symbolIn][symbolOut].Address;
            var reserveSymbolOut = State.TotalReserves[pairAddress][symbolOut];
            Assert(amount < reserveSymbolOut, "Insufficient reserve of out token");
            var pairHash = State.Pairs[symbolIn][symbolOut].Hash;
            TransferOut(pairHash, to, symbolOut, amount);
        }

        private void Update(long balanceA, long balanceB, long reserveA, long reserveB, string tokenA,
            string tokenB)
        {
            var pairAddress = State.Pairs[tokenA][tokenB].Address;
            var blockTimestamp = Context.CurrentBlockTime.Seconds;
            var timeElapsed = blockTimestamp - State.BlockTimestampLast[pairAddress];
            if (timeElapsed > 0 && reserveA != 0 && reserveB != 0)
            {
                State.PriceCumulativeLast[pairAddress][tokenA] += reserveB.Div(reserveA).Mul(timeElapsed);
                State.PriceCumulativeLast[pairAddress][tokenB] += reserveA.Div(reserveB).Mul(timeElapsed);
            }

            State.TotalReserves[pairAddress][tokenA] = balanceA;
            State.TotalReserves[pairAddress][tokenB] = balanceB;
            State.BlockTimestampLast[pairAddress] = blockTimestamp;
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

        private static long Sqrt(long n)
        {
            if (n == 0)
                return 0;
            long left = 1, right = n, mid = (left + right) / 2;
            while (left != right && mid != left)
            {
                if (mid == n / mid)
                    return mid;
                if (mid < n / mid)
                {
                    left = mid;
                    mid = (left + right) / 2;
                }
                else
                {
                    right = mid;
                    mid = (left + right) / 2;
                }
            }

            return left;
        }
    }
}