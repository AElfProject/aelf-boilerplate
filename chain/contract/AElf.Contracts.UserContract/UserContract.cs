using AElf.Types;
using Google.Protobuf.WellKnownTypes;

namespace AElf.Contracts.UserContract
{
    public class UserContract : UserContractContainer.UserContractBase
    {
        public override Empty QueryTemperature(Address input)
        {
            State.OracleContract.Value = input;
            return new Empty();
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