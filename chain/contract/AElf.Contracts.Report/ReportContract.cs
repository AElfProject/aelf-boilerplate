using System;
using AElf.Types;
using Google.Protobuf.WellKnownTypes;

namespace AElf.Contracts.Report
{
    public partial class ReportContract : ReportContractContainer.ReportContractBase
    {
        public override Empty Initialize(Address input)
        {
            State.OracleContract.Value = input;
            return new Empty();
        }
    }
}