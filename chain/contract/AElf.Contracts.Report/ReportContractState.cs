using AElf.Contracts.MultiToken;
using AElf.Contracts.Oracle;
using AElf.Sdk.CSharp.State;

namespace AElf.Contracts.Report
{
    public partial class ReportContractState : ContractState
    {
        internal OracleContractContainer.OracleContractReferenceState OracleContract { get; set; }

        internal TokenContractContainer.TokenContractReferenceState TokenContract { get; set; }
    }
}