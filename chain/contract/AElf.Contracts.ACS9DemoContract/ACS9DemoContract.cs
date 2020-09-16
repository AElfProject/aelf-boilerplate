using System.Collections.Generic;
using AElf.Standards.ACS10;
using AElf.Standards.ACS9;
using AElf.Contracts.MultiToken;
using AElf.Contracts.TokenHolder;
using AElf.CSharp.Core;
using AElf.Sdk.CSharp;
using AElf.Types;
using Google.Protobuf.WellKnownTypes;

namespace AElf.Contracts.ACS9DemoContract
{
    /// <summary>
    /// ACS9 is used to describe and handle stuff of DApp profits.
    /// </summary>
    public class ACS9DemoContract : ACS9DemoContractContainer.ACS9DemoContractBase
    {
        public override Empty TakeContractProfits(TakeContractProfitsInput input)
        {
            var config = State.ProfitConfig.Value;

            // For Side Chain Dividends Pool.
            var amountForSideChainDividendsPool = input.Amount.Mul(config.DonationPartsPerHundred).Div(100);
            State.TokenContract.Approve.Send(new ApproveInput
            {
                Symbol = input.Symbol,
                Amount = amountForSideChainDividendsPool,
                Spender = State.DividendPoolContract.Value
            });
            State.DividendPoolContract.Donate.Send(new DonateInput
            {
                Symbol = input.Symbol,
                Amount = amountForSideChainDividendsPool
            });

            // For receiver.
            var amountForReceiver = input.Amount.Sub(amountForSideChainDividendsPool);
            State.TokenContract.Transfer.Send(new TransferInput
            {
                To = State.ProfitReceiver.Value,
                Amount = amountForReceiver,
                Symbol = input.Symbol
            });

            // For Token Holder Profit Scheme. (To distribute.)
            State.TokenHolderContract.DistributeProfits.Send(new DistributeProfitsInput
            {
                SchemeManager = Context.Self
            });
            return new Empty();
        }

        public override ProfitConfig GetProfitConfig(Empty input)
        {
            return State.ProfitConfig.Value;
        }

        public override ProfitsMap GetProfitsAmount(Empty input)
        {
            var profitsMap = new ProfitsMap();
            foreach (var symbol in State.ProfitConfig.Value.ProfitsTokenSymbolList)
            {
                var balance = State.TokenContract.GetBalance.Call(new GetBalanceInput
                {
                    Owner = Context.Self,
                    Symbol = symbol
                }).Balance;
                profitsMap.Value[symbol] = balance;
            }

            return profitsMap;
        }

        public override Empty Initialize(InitializeInput input)
        {
            State.TokenHolderContract.Value =
                Context.GetContractAddressByName(SmartContractConstants.TokenHolderContractSystemName);
            State.TokenContract.Value =
                Context.GetContractAddressByName(SmartContractConstants.TokenContractSystemName);
            State.DividendPoolContract.Value =
                Context.GetContractAddressByName(input.DividendPoolContractName.Value.ToBase64());
            State.Symbol.Value = input.Symbol == string.Empty ? "APP" : input.Symbol;
            State.ProfitReceiver.Value = input.ProfitReceiver;

            CreateToken(input.ProfitReceiver);
            // To test TokenHolder Contract.
            CreateTokenHolderProfitScheme();
            // To test ACS9 workflow.
            SetProfitConfig();
            State.ProfitReceiver.Value = input.ProfitReceiver;
            return new Empty();
        }

        /// <summary>
        /// When user sign up, give him 10 APP tokens, then initialize his profile.
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        public override Empty SignUp(Empty input)
        {
            Assert(State.Profiles[Context.Sender] == null, "Already registered.");
            var profile = new Profile
            {
                UserAddress = Context.Sender
            };
            State.TokenContract.Issue.Send(new IssueInput
            {
                Symbol = State.Symbol.Value,
                Amount = ACS9DemoContractConstants.ForNewUser,
                To = Context.Sender
            });

            // Update profile.
            profile.Records.Add(new Record
            {
                Type = RecordType.SignUp,
                Timestamp = Context.CurrentBlockTime,
                Description = $"{State.Symbol.Value} +{ACS9DemoContractConstants.ForNewUser}"
            });
            State.Profiles[Context.Sender] = profile;

            return new Empty();
        }

        public override Empty Deposit(DepositInput input)
        {
            // User Address -> DApp Contract.
            State.TokenContract.TransferFrom.Send(new TransferFromInput
            {
                From = Context.Sender,
                To = Context.Self,
                Symbol = "ELF",
                Amount = input.Amount
            });

            State.TokenContract.Issue.Send(new IssueInput
            {
                Symbol = State.Symbol.Value,
                Amount = input.Amount,
                To = Context.Sender
            });

            // Update profile.
            var profile = State.Profiles[Context.Sender];
            profile.Records.Add(new Record
            {
                Type = RecordType.Deposit,
                Timestamp = Context.CurrentBlockTime,
                Description = $"{State.Symbol.Value} +{input.Amount}"
            });
            State.Profiles[Context.Sender] = profile;

            return new Empty();
        }

        public override Empty Withdraw(WithdrawInput input)
        {
            State.TokenContract.TransferFrom.Send(new TransferFromInput
            {
                From = Context.Sender,
                To = Context.Self,
                Symbol = State.Symbol.Value,
                Amount = input.Amount
            });

            State.TokenContract.Transfer.Send(new TransferInput
            {
                To = Context.Sender,
                Symbol = input.Symbol,
                Amount = input.Amount
            });

            State.TokenHolderContract.RemoveBeneficiary.Send(new RemoveTokenHolderBeneficiaryInput
            {
                Beneficiary = Context.Sender,
                Amount = input.Amount
            });

            // Update profile.
            var profile = State.Profiles[Context.Sender];
            profile.Records.Add(new Record
            {
                Type = RecordType.Withdraw,
                Timestamp = Context.CurrentBlockTime,
                Description = $"{State.Symbol.Value} -{input.Amount}"
            });
            State.Profiles[Context.Sender] = profile;

            return new Empty();
        }

        public override Empty Use(Record input)
        {
            State.TokenContract.TransferFrom.Send(new TransferFromInput
            {
                From = Context.Sender,
                To = Context.Self,
                Symbol = State.Symbol.Value,
                Amount = ACS9DemoContractConstants.UseFee
            });
            if (input.Symbol == string.Empty)
                input.Symbol = State.TokenContract.GetPrimaryTokenSymbol.Call(new Empty()).Value;
            var contributeAmount = ACS9DemoContractConstants.UseFee.Div(3);
            State.TokenContract.Approve.Send(new ApproveInput
            {
                Spender = State.TokenHolderContract.Value,
                Symbol = input.Symbol,
                Amount = contributeAmount
            });

            // Contribute 1/3 profits (ELF) to profit scheme.
            State.TokenHolderContract.ContributeProfits.Send(new ContributeProfitsInput
            {
                SchemeManager = Context.Self,
                Amount = contributeAmount,
                Symbol = input.Symbol
            });

            // Update profile.
            var profile = State.Profiles[Context.Sender];
            profile.Records.Add(new Record
            {
                Type = RecordType.Withdraw,
                Timestamp = Context.CurrentBlockTime,
                Description = $"{State.Symbol.Value} -{ACS9DemoContractConstants.UseFee}",
                Symbol = input.Symbol
            });
            State.Profiles[Context.Sender] = profile;

            return new Empty();
        }

        private void CreateToken(Address profitReceiver, bool isLockWhiteListIncludingSelf = false)
        {
            var lockWhiteList = new List<Address>
                {Context.GetContractAddressByName(SmartContractConstants.TokenHolderContractSystemName)};
            if (isLockWhiteListIncludingSelf)
                lockWhiteList.Add(Context.Self);
            State.TokenContract.Create.Send(new CreateInput
            {
                Symbol = State.Symbol.Value,
                TokenName = "DApp Token",
                Decimals = ACS9DemoContractConstants.Decimal,
                Issuer = Context.Self,
                IsBurnable = true,
                TotalSupply = ACS9DemoContractConstants.TotalSupply,
                LockWhiteList =
                {
                    lockWhiteList
                }
            });

            State.TokenContract.Issue.Send(new IssueInput
            {
                To = profitReceiver,
                Amount = ACS9DemoContractConstants.TotalSupply / 5,
                Symbol = State.Symbol.Value,
                Memo = "Issue token for profit receiver"
            });
        }

        private void CreateTokenHolderProfitScheme()
        {
            State.TokenHolderContract.CreateScheme.Send(new CreateTokenHolderProfitSchemeInput
            {
                Symbol = State.Symbol.Value
            });
        }

        private void SetProfitConfig()
        {
            State.ProfitConfig.Value = new ProfitConfig
            {
                DonationPartsPerHundred = 1,
                StakingTokenSymbol = "APP",
                ProfitsTokenSymbolList = {"ELF"}
            };
        }
    }
}