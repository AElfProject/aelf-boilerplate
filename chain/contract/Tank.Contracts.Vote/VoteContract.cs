using AElf.Contracts.MultiToken;
using AElf.Sdk.CSharp;
using Google.Protobuf.WellKnownTypes;

namespace Tank.Contracts.Vote
{
    /// <summary>
    /// The C# implementation of the contract defined in tank_vote_contract.proto that is located in the "protobuf"
    /// folder.
    /// Notice that it inherits from the protobuf generated code. 
    /// </summary>
    public partial class VoteContract : VoteContractContainer.VoteContractBase
    {
        public override Empty Initialize(InitializeInput input)
        {
            State.TokenContract.Value =
                Context.GetContractAddressByName(SmartContractConstants.TokenContractSystemName);
            return new Empty();
        }
    }
}