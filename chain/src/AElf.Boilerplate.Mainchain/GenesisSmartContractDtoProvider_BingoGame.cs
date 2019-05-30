using System.Collections.Generic;
using AElf;
using AElf.Kernel;
using AElf.Kernel.Consensus.AEDPoS;
using AElf.Kernel.Token;
using AElf.OS.Node.Application;
using BingoGameContract;

namespace AElf.Blockchains.MainChain
{
    public partial class GenesisSmartContractDtoProvider
    {
        public IEnumerable<GenesisSmartContractDto> GetGenesisSmartContractDtosForBingoGame(Address zeroContractAddress)
        {
            var l = new List<GenesisSmartContractDto>();

            l.AddGenesisSmartContract<BingoGameContract.BingoGameContract>(
                Hash.FromString("BingoGameContract"), GenerateBingoGameInitializationCallList());

            return l;
        }

        private SystemContractDeploymentInput.Types.SystemTransactionMethodCallList GenerateBingoGameInitializationCallList()
        {
            var bingoGameContractMethodCallList = new SystemContractDeploymentInput.Types.SystemTransactionMethodCallList();
            bingoGameContractMethodCallList.Add(nameof(BingoGameContract.BingoGameContract.InitialBingoGame),
                new InitialBingoGameInput
                {
                    TokenContractSystemName = TokenSmartContractAddressNameProvider.Name,
                    ConsensusContractSystemName = ConsensusSmartContractAddressNameProvider.Name
                });
            return bingoGameContractMethodCallList;
        }
    }
}