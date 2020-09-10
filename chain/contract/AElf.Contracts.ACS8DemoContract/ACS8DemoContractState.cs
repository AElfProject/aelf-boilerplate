using AElf.Standards.ACS8;
using AElf.Contracts.TokenConverter;
using AElf.Sdk.CSharp.State;

namespace AElf.Contracts.ACS8DemoContract
{
    public class ACS8DemoContractState : ContractState
    {
        internal TokenConverterContractContainer.TokenConverterContractReferenceState TokenConverterContract
        {
            get;
            set;
        }
    }
}