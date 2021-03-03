using AElf.Contracts.MultiToken;

namespace AElf.Contracts.OracleContract
{
    public partial class OracleContractState
    {
        internal TokenContractContainer.TokenContractReferenceState TokenContract { get; set; }
    }
}