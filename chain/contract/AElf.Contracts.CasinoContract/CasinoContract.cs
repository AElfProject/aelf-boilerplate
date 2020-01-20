using System;
using System.Collections.Generic;
using System.Linq;
using AElf.Contracts.MultiToken;
using AElf.Sdk.CSharp;
//using AElf.Contracts.TokenConverter;
using AElf.Contracts.TokenHolder;
using AElf.Contracts.CasinoConverter;
//using AElf.Contracts.Profit;
using AElf.Types;
using Google.Protobuf.WellKnownTypes;

namespace AElf.Contracts.CasinoContract
{
    
    public class CasinoContract : CasinoContractContainer.CasinoContractBase
    {
        private const long CollectInterval = 86400;

        private Hash schemeId = Hash.Empty;   //
        public override Empty Initialize(InitializeInput input)
        {
            Assert(State.TokenSymbol.Value == null, "Already initialize");

            State.TokenSymbol.Value = input.TokenSymbol;
            State.Connector.Value = input.Connector;
            State.Decimals.Value = input.Decimals;
            State.TokenSupply.Value = input.TokenSupply;

            
            State.ChildCasinos[0] = input.Lottery;
            State.LotteryContract.Value = input.Lottery;
            //State.CasinoConverterContract.Value = input.CasinoConverter;

            State.TokenConverterContract.Value = Context.GetContractAddressByName(SmartContractConstants.TokenConverterContractSystemName);
            State.TokenContract.Value = Context.GetContractAddressByName(SmartContractConstants.TokenContractSystemName);
            State.CasinoConverterContract.Value = Context.GetContractAddressByName(Hash.FromString("AElf.ContractNames.CasinoConverter"));
            //State.ProfitContract.Value = Context.GetContractAddressByName(SmartContractConstants.ProfitContractSystemName);
            //State.TokenHolderContract.Value = Context.GetContractAddressByName(SmartContractConstants.TokenHolderContractSystemName);


            //Create Token
            State.TokenContract.Create.Send(new CreateInput
            {
                Symbol = input.TokenSymbol ?? "Shit",
                TokenName = input.TokenSymbol ?? "Shit",
                TotalSupply = input.TokenSupply,
                Decimals = input.Decimals,
                Issuer = Context.Sender,
                IsBurnable = true,
                IsTransferDisabled = true
            }) ;


            //Set Converter
            InitializeCasinoConverter();

            //Create TokenHolder Scheme sdk problem
            //InitializeTokenHolder();


            return new Empty();
        }

        public override GetStatusOutput GetStatus(Empty input)
        {

            return new GetStatusOutput
            {
                TokenSymbol = State.TokenSymbol.Value,
                Connector = State.Connector.Value,
                Decimals = State.Decimals.Value,
                TokenSupply = State.TokenSupply.Value,
                Lottery = State.LotteryContract.Value,
                CasinoConverter = State.CasinoConverterContract.Value,
            };
        }
        //Convert all incomming ELFs to Dividend Tokens.
        public override Empty Buy(BuyInput input)
        {
            //Assert something?
            PurchaseTokens(input.Amount, false);
            return new Empty();
        }

        public override Empty Sell(SellInput input)
        {
            long sellAmount = 0;


            State.TokenContract.Burn.Send(new BurnInput
            {
                Symbol = State.TokenSymbol.Value,
                Amount = input.Amount,

            });


            State.TokenContract.Transfer.Send(new TransferInput
            {
                Amount = sellAmount,
                Symbol = State.Connector.Value,
                To = Context.Sender,

            });


            return new Empty();
        }



        public override Empty CollectProfit(Empty input)
        {
            //Collect间隔？比例？
            Assert(State.LastCollectTime.Value.Seconds + CollectInterval < Context.CurrentBlockTime.Seconds, "Fucking to early!!");

            long profit = 1000000;

            State.TokenContract.TransferFrom.Send(new TransferFromInput
            {
                From = State.LotteryContract.Value, // 需要Approve
                To = Context.Self,
                Symbol = State.Connector.Value,
                Amount = profit //ELF的位数为8
            });

            ContributeToTokenHolder(profit);

            State.LastCollectTime.Value = Context.CurrentBlockTime;

            return new Empty();
        }

        private void ContributeToTokenHolder(long amount)
        {
            //允许多久Contribute一次？

            State.TokenHolderContract.ContributeProfits.Send(new ContributeProfitsInput
            {
                SchemeManager = Context.Self,
                Symbol = "ELF",
                Amount = amount
            });
        }


        private void InitializeCasinoConverter()
        {
            Connector ELFConnector = new Connector
            {
                Symbol = State.Connector.Value,
                VirtualBalance = 100_0000,
                Weight = "0.5",
                IsPurchaseEnabled = true,
                IsVirtualBalanceEnabled = true
            };

            Connector ThisConnector = new Connector
            {
                Symbol = State.TokenSymbol.Value,
                VirtualBalance = 0,
                Weight = "0.5",
                IsPurchaseEnabled = true,
                IsVirtualBalanceEnabled = false,
                RelatedSymbol = "NT" + State.TokenSymbol.Value,
                IsDepositAccount = false
            };

            Connector NtThisConnector = new Connector
            {
                Symbol = "NT" + State.TokenSymbol.Value,
                VirtualBalance = 100_0000,
                Weight = "0.5",
                IsPurchaseEnabled = true,
                IsVirtualBalanceEnabled = true,
                RelatedSymbol = State.TokenSymbol.Value,
                IsDepositAccount = true
            };

            
            State.CasinoConverterContract.Initialize.Send(new CasinoConverter.InitializeInput
            {
                BaseTokenSymbol = State.Connector.Value,
                FeeRate = "0.005",
                ManagerAddress = Context.Sender,
                TokenContractAddress = State.TokenContract.Value,
                FeeReceiverAddress = Context.Sender,
                Connectors = { ELFConnector, ThisConnector, NtThisConnector }
            });

    }

        private void InitializeTokenHolder()
        {

            //State.TokenHolderContract.Value = Context.GetContractAddressByName(SmartContractConstants.TokenHolderContractSystemName);

            State.TokenHolderContract.CreateScheme.Send(new CreateTokenHolderProfitSchemeInput
            {
                Symbol = "CST",
                MinimumLockMinutes = 1440,
            });

        }

        private long PurchaseTokens(long amount, bool isReinvest)
        {
            //Context.Sender;
            //long buyAmount = BuyAmount(amount);
            long buyAmount = amount;

            if (!isReinvest)
                State.TokenContract.TransferFrom.Send(new TransferFromInput
                {
                    From = Context.Sender, // 需要Approve
                    To = Context.Self,
                    Symbol = State.Connector.Value,
                    Amount = amount //ELF的位数为8
                });


            //Issue the token
            State.TokenContract.Issue.Send(new IssueInput
            {
                Amount = buyAmount,
                Symbol = State.TokenSymbol.Value,
                To = Context.Sender
            });


            //State.TokenBalance[Context.Sender] = State.TokenBalance[Context.Sender].Add(buyAmount);
            


            return buyAmount;
        }



        private long BuyAmount(long amount)
        {
            long buyAmount = 0;



            return buyAmount;
        }


        private long GetBalance(string symbol, Address address)
        {
            var res = State.TokenContract.GetBalance.Call(new GetBalanceInput()
            {
                Owner = address,
                Symbol = symbol
            });


            return res.Balance;
        }






















        //备用

        //Distribute可能用不到，TokenHolder里会在一定条件下自动Distribute
        public override Empty DistributeFromProfit(Empty input)
        {
            var amount = 0;

            State.ProfitContract.ContributeProfits.Send(new Profit.ContributeProfitsInput
            {
                SchemeId = schemeId,
                Amount = amount,
                Period = 1,
                Symbol = State.Connector.Value

            });

            return new Empty();
        }


        public override Empty Reinvest(Empty input)
        {
            var dividend = State.DividendBalance[Context.Sender];
            var buyAmount = PurchaseTokens(dividend, true);

            State.DividendBalance[Context.Sender] = 0;


            return new Empty();
        }

        public override Empty WithdrawDividend(Empty input)
        {
            var dividend = State.DividendBalance[Context.Sender];
            Assert(dividend != 0, "Withdraw your mother!");
            State.DividendBalance[Context.Sender] = 0;


            State.TokenContract.Transfer.Send(new TransferInput
            {
                To = Context.Sender,
                Symbol = State.Connector.Value,
                Amount = dividend //ELF的位数为8
            });


            return new Empty();
        }

    }
}