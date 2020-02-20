﻿using System;
using System.Globalization;
using System.Linq;
using AElf.Contracts.MultiToken;
using AElf.Sdk.CSharp;
using AElf.Types;
using Google.Protobuf.WellKnownTypes;
//using AElf.Contracts.Consensus.AEDPoS;

namespace AElf.Contracts.CasinoConverter
{
    public partial class CasinoConverterContract : CasinoConverterContractContainer.CasinoConverterContractBase
    {
        private const string NtTokenPrefix = "nt";

        #region Actions

        /// <summary>
        /// Initialize the contract information.
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        public override Empty Initialize(InitializeInput input)
        {
            Assert(IsValidSymbol(input.BaseTokenSymbol), $"Base token symbol is invalid. {input.BaseTokenSymbol}");
            Assert(State.TokenContract.Value == null, "Already initialized.");
            State.TokenContract.Value = input.TokenContractAddress != null
                ? input.TokenContractAddress
                : Context.GetContractAddressByName(SmartContractConstants.TokenContractSystemName);

            State.FeeReceiverAddress.Value = input.FeeReceiverAddress != null
                ? input.FeeReceiverAddress
                : Context.Sender;

            State.BaseTokenSymbol.Value = input.BaseTokenSymbol != string.Empty
                ? input.BaseTokenSymbol
                : Context.Variables.NativeSymbol;

            State.ManagerAddress.Value = input.ManagerAddress != null
                ? input.ManagerAddress
                : Context.Sender;

            var feeRate = AssertedDecimal(input.FeeRate);
            Assert(IsBetweenZeroAndOne(feeRate), "Fee rate has to be a decimal between 0 and 1.");
            State.FeeRate.Value = feeRate.ToString(CultureInfo.InvariantCulture);

            var count = State.ConnectorCount.Value;
            foreach (var connector in input.Connectors)
            {
                if (connector.IsDepositAccount)
                    AssertValidConnectorWeight(connector);
                else
                    AssertValidConnectorAndNormalizeWeight(connector);
                State.ConnectorSymbols[count] = connector.Symbol;
                State.Connectors[connector.Symbol] = connector;
                count = count.Add(1);
            }

            State.ConnectorCount.Value = count;


            ////
            //Approve Casino
            State.TokenContract.Approve.Send(new ApproveInput
            {
                Spender = State.ManagerAddress.Value,
                Symbol = "ELF",
                Amount = 10000000000000000
            });


            return new Empty();
        }

        public override Empty UpdateConnector(Connector input)
        {
            AssertPerformedByManager();
            Assert(!string.IsNullOrEmpty(input.Symbol), "input symbol can not be empty'");
            var targetConnector = State.Connectors[input.Symbol];
            Assert(targetConnector != null, "Can not find target connector.");
            Assert(!targetConnector.IsPurchaseEnabled, "connector can not be updated because it has been actived");
            //AssertValidTokenOwnShip(targetConnector.IsDepositAccount?targetConnector.RelatedSymbol:targetConnector.Symbol,Context.Sender);
            if (!string.IsNullOrEmpty(input.Weight))
            {
                var weight = AssertedDecimal(input.Weight);
                Assert(IsBetweenZeroAndOne(weight), "Connector Shares has to be a decimal between 0 and 1.");
                targetConnector.Weight = input.Weight.ToString(CultureInfo.InvariantCulture);
            }

            if (targetConnector.IsDepositAccount && input.VirtualBalance > 0)
                targetConnector.VirtualBalance = input.VirtualBalance;
            State.Connectors[input.Symbol] = targetConnector;
            return new Empty();
        }


        public override Empty AddPairConnectors(PairConnector pairConnector)
        {
            AssertPerformedByManager();
            Assert(!string.IsNullOrEmpty(pairConnector.ResourceConnectorSymbol),
                "resource token symbol should not be empty");
            var nativeConnectorSymbol = NtTokenPrefix.Append(pairConnector.ResourceConnectorSymbol);
            Assert(State.Connectors[pairConnector.ResourceConnectorSymbol] == null,
                "resource token symbol has been existed");
            //AssertValidTokenOwnShip(pairConnector.ResourceConnectorSymbol, Context.Sender);
            var resourceConnector = new Connector
            {
                Symbol = pairConnector.ResourceConnectorSymbol,
                IsPurchaseEnabled = false,
                RelatedSymbol = nativeConnectorSymbol,
                Weight = pairConnector.ResourceWeight
            };
            AssertValidConnectorAndNormalizeWeight(resourceConnector);
            var nativeTokenToResourceConnector = new Connector
            {
                Symbol = nativeConnectorSymbol,
                VirtualBalance = pairConnector.NativeVirtualBalance,
                IsVirtualBalanceEnabled = true,
                IsPurchaseEnabled = false,
                RelatedSymbol = pairConnector.ResourceConnectorSymbol,
                Weight = pairConnector.NativeWeight,
                IsDepositAccount = true
            };
            AssertValidConnectorWeight(nativeTokenToResourceConnector);
            int count = State.ConnectorCount.Value;
            State.ConnectorSymbols[++count] = resourceConnector.Symbol;
            State.Connectors[resourceConnector.Symbol] = resourceConnector;
            State.ConnectorSymbols[++count] = nativeTokenToResourceConnector.Symbol;
            State.Connectors[nativeTokenToResourceConnector.Symbol] = nativeTokenToResourceConnector;
            State.ConnectorCount.Value = count;
            return new Empty();
        }

        public override Empty Buy(BuyInput input)
        {
            Assert(IsValidSymbol(input.Symbol), "Invalid symbol.");
            var toConnector = State.Connectors[input.Symbol];
            Assert(toConnector != null, "[Buy]Can't find to connector.");
            Assert(toConnector.IsPurchaseEnabled, "can't purchase");
            Assert(!string.IsNullOrEmpty(toConnector.RelatedSymbol), "can't find related symbol'");
            var fromConnector = State.Connectors[toConnector.RelatedSymbol];
            Assert(fromConnector != null, "[Buy]Can't find from connector.");
            var amountToPay = BancorHelper.GetAmountToPayFromReturn(
                GetSelfBalance(fromConnector), GetWeight(fromConnector),
                GetSelfBalance(toConnector), GetWeight(toConnector),
                input.Amount);
            var fee = 0;// Convert.ToInt64(amountToPay * GetFeeRate());

            var amountToPayPlusFee = amountToPay.Add(fee);
            Assert(input.PayLimit == 0 || amountToPayPlusFee <= input.PayLimit, "Price not good.");

            if (false && fee > 0)
            {
                HandleFee(fee);
            }

            // Transfer base token
            State.TokenContract.TransferFrom.Send(
                new TransferFromInput()
                {
                    Symbol = State.BaseTokenSymbol.Value,
                    From = Context.Sender,
                    To = Context.Self,
                    Amount = amountToPay,
                });
            State.DepositBalance[fromConnector.Symbol] = State.DepositBalance[fromConnector.Symbol].Add(amountToPay);
            // Transfer bought token
            State.TokenContract.Transfer.Send(
                new TransferInput
                {
                    Symbol = input.Symbol,
                    To = Context.Sender,
                    Amount = input.Amount
                });

            Context.Fire(new TokenBought
            {
                Symbol = input.Symbol,
                BoughtAmount = input.Amount,
                BaseAmount = amountToPay,
                FeeAmount = fee
            });
            return new Empty();
        }

        public override Empty Sell(SellInput input)
        {
            Assert(IsValidSymbol(input.Symbol), "Invalid symbol.");
            var fromConnector = State.Connectors[input.Symbol];
            Assert(fromConnector != null, "[Sell]Can't find from connector.");
            Assert(fromConnector.IsPurchaseEnabled, "can't purchase");
            Assert(!string.IsNullOrEmpty(fromConnector.RelatedSymbol), "can't find related symbol'");
            var toConnector = State.Connectors[fromConnector.RelatedSymbol];
            Assert(toConnector != null, "[Sell]Can't find to connector.");
            var amountToReceive = BancorHelper.GetReturnFromPaid(
                GetSelfBalance(fromConnector), GetWeight(fromConnector),
                GetSelfBalance(toConnector), GetWeight(toConnector),
                input.Amount
            );

            var fee = 0;// Convert.ToInt64(amountToReceive * GetFeeRate());

            if (Context.Sender == Context.GetContractAddressByName(SmartContractConstants.TreasuryContractSystemName))
            {
                fee = 0;
            }

            var amountToReceiveLessFee = amountToReceive.Sub(fee);
            Assert(input.ReceiveLimit == 0 || amountToReceiveLessFee >= input.ReceiveLimit, "Price not good.");

            // Pay fee
            if (fee > 0)
            {
                HandleFee(fee);
            }

            // Transfer base token
            State.TokenContract.Transfer.Send(
                new TransferInput()
                {
                    Symbol = State.BaseTokenSymbol.Value,
                    To = Context.Sender,
                    Amount = amountToReceiveLessFee
                });
            State.DepositBalance[toConnector.Symbol] =
                State.DepositBalance[toConnector.Symbol].Sub(amountToReceiveLessFee);
            // Transfer sold token
            State.TokenContract.TransferFrom.Send(
                new TransferFromInput()
                {
                    Symbol = input.Symbol,
                    From = Context.Sender,
                    To = Context.Self,
                    Amount = input.Amount
                });
            Context.Fire(new TokenSold()
            {
                Symbol = input.Symbol,
                SoldAmount = input.Amount,
                BaseAmount = amountToReceive,
                FeeAmount = fee
            });
            return new Empty();
        }

        private void HandleFee(long fee)
        {
            var donateFee = fee.Div(2);
            var burnFee = fee.Sub(donateFee);

            // Transfer to fee receiver.
            State.TokenContract.TransferFrom.Send(
                new TransferFromInput
                {
                    Symbol = State.BaseTokenSymbol.Value,
                    From = Context.Sender,
                    To = State.FeeReceiverAddress.Value,
                    Amount = donateFee
                });

            // Transfer to self contract then burn
            State.TokenContract.TransferFrom.Send(
                new TransferFromInput
                {
                    Symbol = State.BaseTokenSymbol.Value,
                    From = Context.Sender,
                    To = Context.Self,
                    Amount = burnFee
                });
            State.TokenContract.Burn.Send(
                new BurnInput
                {
                    Symbol = State.BaseTokenSymbol.Value,
                    Amount = burnFee
                });
        }

        public override Empty SetFeeRate(StringValue input)
        {
            AssertPerformedByManager();
            var feeRate = AssertedDecimal(input.Value);
            Assert(IsBetweenZeroAndOne(feeRate), "Fee rate has to be a decimal between 0 and 1.");
            State.FeeRate.Value = feeRate.ToString(CultureInfo.InvariantCulture);
            return new Empty();
        }

        public override Empty SetManagerAddress(Address input)
        {
            AssertPerformedByManager();
            Assert(input != null && input != new Address(), "Input is not a valid address.");
            State.ManagerAddress.Value = input;
            return new Empty();
        }

        public override Empty EnableConnector(ToBeConnectedTokenInfo input)
        {
            Assert(IsValidSymbol(input.TokenSymbol), "Invalid symbol.");
            var fromConnector = State.Connectors[input.TokenSymbol];
            Assert(fromConnector != null, "[EnableConnector]Can't find from connector.");
            Assert(!string.IsNullOrEmpty(fromConnector.RelatedSymbol), "can't find related symbol'");
            var toConnector = State.Connectors[fromConnector.RelatedSymbol];
            Assert(toConnector != null, "[EnableConnector]Can't find to connector.");
            var needDeposit = GetNeededDeposit(input);
            if (needDeposit.NeedAmount > 0)
            {
                State.TokenContract.TransferFrom.Send(
                    new TransferFromInput
                    {
                        Symbol = State.BaseTokenSymbol.Value,
                        From = Context.Sender,
                        To = Context.Self,
                        Amount = needDeposit.NeedAmount,
                    });
            }
            if (input.AmountToTokenConvert > 0)
            {
                State.TokenContract.TransferFrom.Send(
                    new TransferFromInput
                    {
                        Symbol = input.TokenSymbol,
                        From = Context.Sender,
                        To = Context.Self,
                        Amount = input.AmountToTokenConvert
                    });
            }
            State.DepositBalance[toConnector.Symbol] = needDeposit.NeedAmount;
            toConnector.IsPurchaseEnabled = true;
            fromConnector.IsPurchaseEnabled = true;
            return new Empty();
        }

        //启用分裂盘功能
        public override Empty EnableReferral(EnableReferralInput input)
        {
            var referralToken = input.ReferralToken;
            string childToken = String.Empty;


            Assert(State.ReferralTokens[referralToken] != null, "No this referrak token");
            State.ChildToFather[Context.Sender] = State.ReferralTokens[referralToken];


            do
            {
                childToken = RandomString(8);

            } while (State.ReferralTokens[childToken] != null);

            State.ReferralTokens[childToken] = Context.Sender;
            State.AddressReferralTokens[Context.Sender] = childToken;

            
            return new Empty();

        }


        public override Empty ReferralBuy(BuyInput input)
        {
            Assert(State.AddressReferralTokens[Context.Sender] != null, "You need a father referral");
            Assert(IsValidSymbol(input.Symbol), "Invalid symbol.");
            var toConnector = State.Connectors[input.Symbol];
            Assert(toConnector != null, "[Buy]Can't find to connector.");
            Assert(toConnector.IsPurchaseEnabled, "can't purchase");
            Assert(!string.IsNullOrEmpty(toConnector.RelatedSymbol), "can't find related symbol'");
            var fromConnector = State.Connectors[toConnector.RelatedSymbol];
            Assert(fromConnector != null, "[Buy]Can't find from connector.");
            var amountToPay = BancorHelper.GetAmountToPayFromReturn(
                GetSelfBalance(fromConnector), GetWeight(fromConnector),
                GetSelfBalance(toConnector), GetWeight(toConnector),
                input.Amount);
            var fee = 0;

            var amountToPayPlusFee = amountToPay.Add(fee);
            Assert(input.PayLimit == 0 || amountToPayPlusFee <= input.PayLimit, "Price not good.");

            if (false && fee > 0)
            {
                HandleFee(fee);
            }

            // Transfer base token
            State.TokenContract.TransferFrom.Send(
                new TransferFromInput()
                {
                    Symbol = State.BaseTokenSymbol.Value,
                    From = Context.Sender,
                    To = Context.Self,
                    Amount = amountToPay,
                });
            State.DepositBalance[fromConnector.Symbol] = State.DepositBalance[fromConnector.Symbol].Add(amountToPay);
            
            
            
            // Transfer bought token    先不转，等推荐足够人了再转
            State.TokenContract.Transfer.Send(
                new TransferInput
                {
                    Symbol = input.Symbol,
                    To = Context.Sender,
                    Amount = input.Amount
                });

            Context.Fire(new TokenBought
            {
                Symbol = input.Symbol,
                BoughtAmount = input.Amount,
                BaseAmount = amountToPay,
                FeeAmount = fee
            });
            return new Empty();
        }





        #endregion Actions




        #region Helpers

        private static decimal AssertedDecimal(string number)
        {
            try
            {
                return decimal.Parse(number);
            }
            catch (FormatException)
            {
                throw new InvalidValueException($@"Invalid decimal ""{number}""");
            }
        }

        private static bool IsBetweenZeroAndOne(decimal number)
        {
            return number >= decimal.Zero && number < decimal.One;
        }

        private static bool IsValidSymbol(string symbol)
        {
            return symbol.Length > 0 &&
                   symbol.All(c => c >= 'A' && c <= 'Z');
        }

        private decimal GetFeeRate()
        {
            return decimal.Parse(State.FeeRate.Value);
        }

        private long GetSelfBalance(Connector connector)
        {
            long realBalance;
            if (connector.IsDepositAccount)
            {
                realBalance = State.DepositBalance[connector.Symbol];
            }
            else
            {
                realBalance = State.TokenContract.GetBalance.Call(
                    new GetBalanceInput()
                    {
                        Owner = Context.Self,
                        Symbol = connector.Symbol
                    }).Balance;
            }

            if (connector.IsVirtualBalanceEnabled)
            {
                return connector.VirtualBalance.Add(realBalance);
            }

            return realBalance;
        }

        private decimal GetWeight(Connector connector)
        {
            return decimal.Parse(connector.Weight);
        }

        private void AssertValidTokenOwnShip(string symbol, Address sender)
        {
            var tokenInfo = State.TokenContract.GetTokenInfo.Call(new GetTokenInfoInput
            {
                Symbol = symbol
            });
            Assert(tokenInfo != null, $"token: {symbol} does not exist");
            Assert(tokenInfo.Issuer == sender, "connector must be in control of token issuer");
        }
        private void AssertPerformedByManager()
        {
            Assert(Context.Sender == State.ManagerAddress.Value, "Only manager can perform this action.");
        }

        private void AssertValidConnectorAndNormalizeWeight(Connector connector)
        {
            AssertValidConnectorSymbol(connector);
            AssertValidConnectorWeight(connector);
        }

        private void AssertValidConnectorSymbol(Connector connector)
        {
            Assert(IsValidSymbol(connector.Symbol), "Invalid symbol.");
        }
        private void AssertValidConnectorWeight(Connector connector)
        {
            var weight = AssertedDecimal(connector.Weight);
            Assert(IsBetweenZeroAndOne(weight), "Connector Shares has to be a decimal between 0 and 1.");
            connector.Weight = weight.ToString(CultureInfo.InvariantCulture);
        }


        //new helper

        private string RandomString(int length)
        {
            string constant = "1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNPQRSTUVWXYZ";
            string checkCode = String.Empty;

            Random rd = new Random();
            for (int i = 0; i < length; i++)
            {
                checkCode += constant[rd.Next(62)].ToString();
            }
            return checkCode;
        }

        #endregion
    }
}