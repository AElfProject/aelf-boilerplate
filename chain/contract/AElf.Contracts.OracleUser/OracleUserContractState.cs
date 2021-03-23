using AElf.Contracts.MultiToken;
using AElf.Contracts.Oracle;
using AElf.Sdk.CSharp.State;
using AElf.Types;

namespace AElf.Contracts.OracleUser
{
    public class OracleUserContractState : ContractState
    {
        internal OracleContractContainer.OracleContractReferenceState OracleContract { get; set; }
        internal TokenContractContainer.TokenContractReferenceState TokenContract { get; set; }

        public SingletonState<TemperatureRecordList> TemperatureRecordList { get; set; }

        // Test whether query id is computed correctly.
        public MappedState<Hash, bool> QueryIdMap { get; set; }
    }
}