using AElf.Sdk.CSharp.State;
using AElf.Types;

namespace AElf.Contracts.Oracle
{
    /// <summary>
    /// The state class of the contract, it inherits from the AElf.Sdk.CSharp.State.ContractState type. 
    /// </summary>
    public partial class OracleContractState : ContractState
    {
        public SingletonState<bool> Initialized { get; set; }

        public SingletonState<long> DefaultExpirationSeconds { get; set; }

        public SingletonState<Address> Controller { get; set; }

        public SingletonState<int> AggregateThreshold { get; set; }

        public SingletonState<int> RevealThreshold { get; set; }

        public SingletonState<long> MinimumOracleNodesCount { get; set; }

        public MappedState<Hash, QueryRecord> QueryRecords { get; set; }

        public MappedState<Hash, Address> UserAddresses { get; set; }

        public MappedState<Hash, int> ResponseCount { get; set; }

        public MappedState<Hash, Address, Hash> CommitmentMap { get; set; }

        public MappedState<Hash, ResultList> ResultListMap { get; set; }

        public MappedState<Hash, AddressList> HelpfulNodeListMap { get; set; }
    }
}