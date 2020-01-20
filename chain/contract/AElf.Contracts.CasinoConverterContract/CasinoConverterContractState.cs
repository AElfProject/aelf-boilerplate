﻿using Acs1;
using AElf.Contracts.Genesis;
using AElf.Contracts.MultiToken;
using AElf.Contracts.Parliament;
using AElf.Sdk.CSharp.State;
using AElf.Types;

namespace AElf.Contracts.CasinoConverter
{
    public class CasinoConverterContractState : ContractState
    {
        public StringState BaseTokenSymbol { get; set; }
        public StringState FeeRate { get; set; }
        public Int32State ConnectorCount { get; set; }
        public MappedState<int, string> ConnectorSymbols { get; set; }
        public MappedState<string, Connector> Connectors { get; set; }
        internal TokenContractContainer.TokenContractReferenceState TokenContract { get; set; }
        internal BasicContractZeroContainer.BasicContractZeroReferenceState BasicContractZero { get; set; }
        internal ParliamentContractContainer.ParliamentContractReferenceState ParliamentContract { get; set; }
        public SingletonState<Address> FeeReceiverAddress { get; set; }
        public SingletonState<Address> ManagerAddress { get; set; }
        public MappedState<string, MethodFees> TransactionFees { get; set; }
        public MappedState<string, long> DepositBalance { get; set; }

    }
}