using AElf.Contracts.MultiToken;
using AElf.Standards.ACS13;

namespace AElf.Contracts.OracleContract
{
    public partial class OracleContractState
    {
        internal TokenContractContainer.TokenContractReferenceState TokenContract { get; set; }

        internal OracleAggregatorContractContainer.OracleAggregatorContractReferenceState OracleAggregatorContract
        {
            get;
            set;
        }
    }
}