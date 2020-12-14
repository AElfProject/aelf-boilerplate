using System;
using AElf.Sdk.CSharp.State;
using AElf.Types;

namespace GameStoreContract
{
    /// <summary>
    /// The state class of the contract, it inherits from the AElf.Sdk.CSharp.State.ContractState type. 
    /// </summary>
    public partial class GameStoreContractState : ContractState
    {
        public SingletonState<Address> Admin { get; set; }
        public BoolState Initialized { get; set; }

        /// <summary>
        /// Game name -> Game info.
        /// </summary>
        public MappedState<string, GameInfo> GameInfoMap { get; set; }

        public SingletonState<StringList> GameNameList { get; set; }

        public MappedState<Address, StringList> BoughtGameMap { get; set; }
    }
}