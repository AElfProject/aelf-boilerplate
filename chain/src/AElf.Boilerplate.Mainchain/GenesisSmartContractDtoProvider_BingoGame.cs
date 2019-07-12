using System.Collections.Generic;
using System.Linq;
using Acs0;
using AElf;
using AElf.Kernel;
using AElf.Kernel.Consensus;
using AElf.Kernel.Consensus.AEDPoS;
using AElf.Kernel.Token;
using AElf.OS.Node.Application;
using AElf.Types;
using AElf.Contracts.BingoGameContract;

namespace AElf.Blockchains.MainChain
{
    public partial class GenesisSmartContractDtoProvider
    {
        public IEnumerable<GenesisSmartContractDto> GetGenesisSmartContractDtosForBingoGame(Address zeroContractAddress)
        {
            var l = new List<GenesisSmartContractDto>();

            l.AddGenesisSmartContract(
                _codes.Single(kv => kv.Key.Contains("Bingo")).Value,
                Hash.FromString("AElf.ContractNames.BingoGameContract"), GenerateBingoGameInitializationCallList());

            return l;
        }

        private SystemContractDeploymentInput.Types.SystemTransactionMethodCallList
            GenerateBingoGameInitializationCallList()
        {
            var bingoGameContractMethodCallList =
                new SystemContractDeploymentInput.Types.SystemTransactionMethodCallList();
            bingoGameContractMethodCallList.Add(
                nameof(BingoGameContractContainer.BingoGameContractStub.InitialBingoGame),
                new InitialBingoGameInput
                {
                    TokenContractSystemName = TokenSmartContractAddressNameProvider.Name,
                    ConsensusContractSystemName = ConsensusSmartContractAddressNameProvider.Name
                });
            return bingoGameContractMethodCallList;
        }
    }
}