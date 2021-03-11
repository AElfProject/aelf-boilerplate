using AElf.Contracts.MultiToken;
using AElf.Standards.ACS2;
using AElf.Types;
using Google.Protobuf;
using Google.Protobuf.WellKnownTypes;
using SmartContractConstants = AElf.Sdk.CSharp.SmartContractConstants;

namespace AElf.Contracts.TransferWrapperContract
{
    /// <summary>
    /// The C# implementation of the contract defined in transfer_wrapper_contract.proto that is located in the "protobuf"
    /// folder.
    /// Notice that it inherits from the protobuf generated code. 
    /// </summary>
    public class TransferWrapperContract : TransferWrapperContractContainer.TransferWrapperContractBase
    {
        public override Empty ThroughContractTransfer(ThroughContractTransferInput input)
        {
            Context.SendVirtualInline(HashHelper.ComputeFrom(Context.Sender),
                Context.GetContractAddressByName(SmartContractConstants.TokenContractSystemName),
                nameof(State.TokenContract.Transfer), new TransferInput
                {
                    To = input.To,
                    Amount = input.Amount,
                    Symbol = input.Symbol,
                    Memo = input.Memo
                }.ToByteString());
            return new Empty();
        }

        public override ResourceInfo GetResourceInfo(Transaction txn)
        {
            var args = TransferInput.Parser.ParseFrom(txn.Params);
            var resourceInfo = new ResourceInfo
            {
                WritePaths =
                {
                    GetTokenContractPath("Balances", txn.From.ToString(), args.Symbol),
                    GetTokenContractPath("Balances", args.To.ToString(), args.Symbol),
                },
                ReadPaths =
                {
                    GetTokenContractPath("TokenInfos", args.Symbol),
                    GetTokenContractPath("ChainPrimaryTokenSymbol")
                }
            };

            return resourceInfo;
        }

        private ScopedStatePath GetTokenContractPath(params string[] parts)
        {
            return new ScopedStatePath
            {
                Address = Context.GetContractAddressByName(SmartContractConstants.TokenContractSystemName),
                Path = new StatePath
                {
                    Parts =
                    {
                        parts
                    }
                }
            };
        }
    }
}