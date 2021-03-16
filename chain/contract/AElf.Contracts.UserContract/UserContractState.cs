using AElf.Contracts.OracleContract;
using AElf.Sdk.CSharp.State;

namespace AElf.Contracts.UserContract
{
    public class UserContractState : ContractState
    {
        internal OracleContractContainer.OracleContractReferenceState OracleContract { get; set; }

        public SingletonState<TemperatureRecordList> TemperatureRecordList { get; set; }
    }
}