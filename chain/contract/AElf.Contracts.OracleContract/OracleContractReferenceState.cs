using AElf.Contracts.MultiToken;
using AElf.Contracts.Parliament;

namespace AElf.Contracts.OracleContract
{
    public partial class OracleContractState
    {
        internal TokenContractContainer.TokenContractReferenceState TokenContract { get; set; }
        internal ParliamentContractContainer.ParliamentContractReferenceState ParliamentContract { get; set; }
    }
}