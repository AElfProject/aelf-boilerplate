using AElf.Contracts.Association;
using AElf.Contracts.MultiToken;
using AElf.Contracts.Oracle;
using AElf.Sdk.CSharp.State;
using AElf.Types;

namespace AElf.Contracts.Report
{
    public partial class ReportContractState : ContractState
    {
        internal OracleContractContainer.OracleContractReferenceState OracleContract { get; set; }

        internal TokenContractContainer.TokenContractReferenceState TokenContract { get; set; }
        internal AssociationContractContainer.AssociationContractReferenceState AssociationContract { get; set; }

        public SingletonState<string> OracleTokenSymbol { get; set; }
        public SingletonState<long> ReportFee { get; set; }
        public MappedState<Hash, Address> OriginQueryManagerMap { get; set; }
    }
}