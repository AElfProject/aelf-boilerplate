using System;
using System.Linq;
using AElf.Contracts.MultiToken;
using AElf.CSharp.Core;
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
            Assert(tokenPair.Contains("-"),"Invalid TokenPair");
            var tokens= tokenPair.Split('-');
            Assert(TokenVerify(tokens[0])&&TokenVerify(tokens[1]),"Invalid Tokens");
            var sortedTokenPair = tokenPair;
            if (tokens[0].GetHashCode() > tokens[1].GetHashCode())
            {
                 sortedTokenPair = string.Join("-", tokens[1], tokens[0]);
            }
            return sortedTokenPair;
        }

        private string[] SortTokens(string tokenPair)
        {
            Assert(tokenPair.Contains("-"),"Invalid TokenPair");
            var tokens= tokenPair.Split('-');
            if (tokens[0].GetHashCode() > tokens[1].GetHashCode())
            {
                var index = tokens[0];
                tokens[0] = tokens[1];
                tokens[1] = index;
            }
            return tokens;
        }

        private void PairInitial(Address pair,string tokenA,string tokenB)
        {
            State.TotalReserves[pair][tokenA] = 0;
            State.TotalReserves[pair][tokenB] = 0;
            State.TotalSupply[pair] = 0;
        }
        private bool TokenVerify(string token)
        {
            var tokenInfo= State.TokenContract.GetTokenInfo.Call(new GetTokenInfoInput()
            {
                Symbol = token
            });
            if (tokenInfo.Symbol == "")
                return false;
            return true;
        }

        private long[] AddLiquidity(string tokenA ,string tokenB,long amountADesired,long amountBDesired, long amountAMin,long amountBMin)
        {
            Assert(State.Pairs[tokenA][tokenB]!=null,"Pair is not exist");
            long amountA;
            long amountB;
            var reserves= GetReserves(State.Pairs[tokenA][tokenB], tokenA, tokenB);
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
                    Assert(amountAOptimal<=amountADesired);
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

        private long[] GetReserves(Address pairAddress, string tokenA, string tokenB)
        { 
            var  amountA = State.TotalReserves[pairAddress][tokenA];
            var  amountB = State.TotalReserves[pairAddress][tokenB];
            return new []
            {
                amountA,amountB
            };

        }

        private long Mint(Address pair, string tokenA, string tokenB, Address account)
        {
            var balanceA = GetBalance(tokenA);
            var balanceB = GetBalance(tokenB);
            var reserves = GetReserves(pair, tokenA, tokenB);
            var amountA = balanceA.Sub(reserves[0]);
            var amountB = balanceB.Sub(reserves[1]);
            var totalSupply = State.TotalSupply[pair];
            var liquidity = (totalSupply == 0)
                ? Sqrt(amountA.Mul(amountB))
                : Math.Min(amountA.Mul(totalSupply) / reserves[0], amountB.Mul(totalSupply) / reserves[1]);
            Assert(liquidity > 0, "Insufficient liquidity Minted");
            State.TotalSupply[pair].Add(liquidity);
            var oldLiquidityToken = State.LiquidityTokens[pair][account];
            var newLiquidityToken = oldLiquidityToken.Add(liquidity);
            State.LiquidityTokens[pair][account] = newLiquidityToken;
            return liquidity;
        }
        private void TransferIn(Address address,string symbol,long amount)
        {
            State.TokenContract.TransferFrom.Send(
                new TransferFromInput()
                { 
                    Symbol = symbol ,
                    Amount = amount,
                    From = address,
                    Memo = "TransferIn",
                    To = Context.Self
                });
        }
        private void TransferOut(Address address,string symbol,long amount)
        {
            State.TokenContract.Transfer.Send(
                new TransferInput()
                { 
                    Symbol = symbol ,
                    Amount = amount,
                    To = address,
                    Memo = "TransferOut"
                });
        }

        private long GetBalance(string symbol)
        {
          var balance= State.TokenContract.GetBalance.Call(new GetBalanceInput()
            {
                Owner = Context.Self,
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
                if(mid<n/mid)
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