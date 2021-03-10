using System.Linq;
using AElf.Standards.ACS10;
using AElf.Contracts.MultiToken;
using AElf.Contracts.Profit;
using AElf.Contracts.TokenHolder;
using AElf.CSharp.Core;
using AElf.Sdk.CSharp;
using Google.Protobuf.WellKnownTypes;
using ContributeProfitsInput = AElf.Contracts.TokenHolder.ContributeProfitsInput;
using DistributeProfitsInput = AElf.Contracts.TokenHolder.DistributeProfitsInput;

namespace AElf.Contracts.ACS10DemoContract
{
    /// <summary>
    /// You can build a dividend pool via implementing ACS10.
    /// </summary>
    public class ACS10DemoContract : ACS10DemoContractContainer.ACS10DemoContractBase
    {
        public override Empty Initialize(InitializeInput input)
        {
            State.TokenContract.Value =
                Context.GetContractAddressByName(SmartContractConstants.TokenContractSystemName);
            State.TokenHolderContract.Value =
                Context.GetContractAddressByName(SmartContractConstants.TokenHolderContractSystemName);

            State.TokenHolderContract.CreateScheme.Send(new CreateTokenHolderProfitSchemeInput
            {
                Symbol = Context.Variables.NativeSymbol,
                MinimumLockMinutes = input.MinimumLockMinutes
            });

            return new Empty();
        }

        public override Empty Donate(DonateInput input)
        {
            State.TokenContract.TransferFrom.Send(new TransferFromInput
            {
                From = Context.Sender,
                Symbol = input.Symbol,
                Amount = input.Amount,
                To = Context.Self
            });

            State.TokenContract.Approve.Send(new ApproveInput
            {
                Symbol = input.Symbol,
                Amount = input.Amount,
                Spender = State.TokenHolderContract.Value
            });

            State.TokenHolderContract.ContributeProfits.Send(new ContributeProfitsInput
            {
                SchemeManager = Context.Self,
                Symbol = input.Symbol,
                Amount = input.Amount
            });

            Context.Fire(new DonationReceived
            {
                From = Context.Sender,
                Symbol = input.Symbol,
                Amount = input.Amount,
                PoolContract = Context.Self
            });

            var currentReceivedDividends = State.ReceivedDividends[Context.CurrentHeight];
            if (currentReceivedDividends != null && currentReceivedDividends.Value.ContainsKey(input.Symbol))
            {
                currentReceivedDividends.Value[input.Symbol] =
                    currentReceivedDividends.Value[input.Symbol].Add(input.Amount);
            }
            else
            {
                currentReceivedDividends = new Dividends
                {
                    Value =
                    {
                        {
                            input.Symbol, input.Amount
                        }
                    }
                };
            }

            State.ReceivedDividends[Context.CurrentHeight] = currentReceivedDividends;

            Context.LogDebug(() => $"Contributed {input.Amount} {input.Symbol}s to side chain dividends pool.");

            return new Empty();
        }

        public override Empty Release(ReleaseInput input)
        {
            State.TokenHolderContract.DistributeProfits.Send(new DistributeProfitsInput
            {
                SchemeManager = Context.Self
            });

            return new Empty();
        }

        public override Empty SetSymbolList(SymbolList input)
        {
            Assert(false, "Not support setting symbol list.");
            return new Empty();
        }

        public override Dividends GetDividends(Int64Value input)
        {
            Assert(Context.CurrentHeight > input.Value, "Cannot query dividends of a future block.");
            return State.ReceivedDividends[input.Value];
        }

        public override SymbolList GetSymbolList(Empty input)
        {
            return new SymbolList
            {
                Value =
                {
                    GetDividendPoolScheme().ReceivedTokenSymbols
                }
            };
        }

        public override Dividends GetUndistributedDividends(Empty input)
        {
            var scheme = GetDividendPoolScheme();
            return new Dividends
            {
                Value =
                {
                    scheme.ReceivedTokenSymbols.Select(s => State.TokenContract.GetBalance.Call(new GetBalanceInput
                    {
                        Owner = scheme.VirtualAddress,
                        Symbol = s
                    })).ToDictionary(b => b.Symbol, b => b.Balance)
                }
            };
        }

        private Scheme GetDividendPoolScheme()
        {
            if (State.DividendPoolSchemeId.Value == null)
            {
                var tokenHolderScheme = State.TokenHolderContract.GetScheme.Call(Context.Self);
                State.DividendPoolSchemeId.Value = tokenHolderScheme.SchemeId;
            }

            return Context.Call<Scheme>(
                Context.GetContractAddressByName(SmartContractConstants.ProfitContractSystemName),
                nameof(ProfitContractContainer.ProfitContractReferenceState.GetScheme),
                State.DividendPoolSchemeId.Value);
        }
    }
}