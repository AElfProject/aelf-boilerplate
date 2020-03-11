using System;
using AElf.Sdk.CSharp.State;
using AElf.Types;

namespace AElf.Contracts.Consensus.SingleConsensusContract
{
    public class SingleConsensusState : ContractState
    {
        public MappedState<long, Address> Miners { get; set; }
    }
}