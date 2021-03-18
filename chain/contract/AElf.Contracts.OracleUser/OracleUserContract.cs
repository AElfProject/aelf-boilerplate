using AElf.Contracts.MultiToken;
using AElf.Contracts.Oracle;
using AElf.Sdk.CSharp;
using AElf.Types;
using Google.Protobuf.WellKnownTypes;

namespace AElf.Contracts.OracleUser
{
    public class OracleUserContract : OracleUserContractContainer.OracleUserContractBase
    {
        public override Hash QueryTemperature(QueryTemperatureInput input)
        {
            State.OracleContract.Value = input.OracleContractAddress;

            var payment = 10_00000000;
            if (State.TokenContract.Value == null)
            {
                State.TokenContract.Value =
                    Context.GetContractAddressByName(SmartContractConstants.TokenContractSystemName);
            }

            State.TokenContract.Approve.Send(new ApproveInput
            {
                Spender = State.OracleContract.Value,
                Amount = payment,
                Symbol = "AELINK"
            });

            var queryInput = new QueryInput
            {
                AggregatorContractAddress = input.AggregatorContractAddress,
                UrlToQuery = "www.temperature.com",
                AttributeToFetch = "temperature",
                CallbackInfo = new CallbackInfo
                {
                    ContractAddress = Context.Self,
                    MethodName = nameof(RecordTemperature)
                },
                DesignatedNodeList = new AddressList {Value = {input.DesignatedNodes}},
                Payment = payment
            };
            State.OracleContract.Query.Send(queryInput);
            return HashHelper.ComputeFrom(queryInput);
        }

        public override Empty RecordTemperature(TemperatureRecord input)
        {
            Assert(Context.Sender == State.OracleContract.Value, "No permission.");
            var currentList = State.TemperatureRecordList.Value ?? new TemperatureRecordList();
            currentList.Value.Add(input);
            State.TemperatureRecordList.Value = currentList;
            return new Empty();
        }

        public override TemperatureRecordList GetHistoryTemperatures(Empty input)
        {
            return State.TemperatureRecordList.Value;
        }
    }
}