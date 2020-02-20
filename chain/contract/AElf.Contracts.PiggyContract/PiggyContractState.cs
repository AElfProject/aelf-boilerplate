using AElf.Sdk.CSharp.State;
using AElf.Contracts.MultiToken;
using AElf.Types;
using Google.Protobuf.WellKnownTypes;
using Acs1;
using AElf.Contracts.Parliament;


namespace AElf.Contracts.PiggyContract
{
    public class PiggyContractState : ContractState
    {

        /*=====================================
        =            CONFIGURABLES            =
        =====================================*/
        
        //Tokenconverter可能用不到
        internal TokenContractContainer.TokenContractReferenceState TokenContract { get; set; }

        internal ParliamentContractContainer.ParliamentContractReferenceState ParliamentContract { get; set; }



        //For Acs1
        public MappedState<string, MethodFees> TransactionFees { get; set; }
        public SingletonState<AuthorityInfo> MethodFeeController { get; set; }




    }
}