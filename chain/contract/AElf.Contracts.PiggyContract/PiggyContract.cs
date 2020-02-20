using System;
using System.Collections.Generic;
using System.Linq;
using AElf.Contracts.MultiToken;
using AElf.Sdk.CSharp;
using AElf.Types;
using Google.Protobuf.WellKnownTypes;

namespace AElf.Contracts.PiggyContract
{
    
    public partial class PiggyContract : PiggyContractContainer.PiggyContractBase
    {
        
        public override GetStatusOutput GetStatus(Empty input)
        {

            var res = State.TokenContract.GetBalance.Call(new GetBalanceInput()
            {
                Owner = Context.Self,
                Symbol = "ELF"
            });

            return new GetStatusOutput
            {
                TokenSymbol = "ELF",
                Result = res.ToString()
            };
        }
        //Convert all incomming ELFs to Dividend Tokens.

        public override Empty Deposit(DepositInput input)
        {
            State.TokenContract.Value = Context.GetContractAddressByName(SmartContractConstants.TokenContractSystemName);

            State.TokenContract.TransferToContract.Send(new TransferToContractInput
            {
                Symbol = "ELF",
                Amount = input.Amount 
            });

            Context.Fire(new DataOutput{
                    Result = Context.Sender.ToString()+":"+Context.Self.ToString()+":"+input.Amount.ToString()
                    });

            return new Empty();
        }


        public override Empty Withdraw(WithdrawInput input)
        {
            State.TokenContract.Value = Context.GetContractAddressByName(SmartContractConstants.TokenContractSystemName);

            State.TokenContract.Transfer.Send(new TransferInput
            {
                To = Context.Sender,
                Symbol = "ELF",
                Amount = input.Amount //ELF的位数？？
            });

            Context.Fire(new DataOutput{
                    Result = Context.Sender.ToString()+":"+Context.Self.ToString()+":"+input.Amount.ToString()
                    });

            return new Empty();
        }




    }
}