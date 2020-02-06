using System.Collections.Generic;
using System.Linq;
using Acs0;
using AElf.Contracts.Election;
using AElf.Kernel.Consensus.AEDPoS;
using AElf.OS.Node.Application;
using AElf.Types;

namespace AElf.Blockchains.MainChain
{
    public partial class GenesisSmartContractDtoProvider
    {
        public IEnumerable<GenesisSmartContractDto> GetGenesisSmartContractDtosForElection()
        {
            var l = new List<GenesisSmartContractDto>();

            l.AddGenesisSmartContract(
                _codes.Single(kv=>kv.Key.Contains("Election")).Value,
                ElectionSmartContractAddressNameProvider.Name, GenerateElectionInitializationCallList());

            return l;
        }

        private SystemContractDeploymentInput.Types.SystemTransactionMethodCallList
            GenerateElectionInitializationCallList()
        {
            var electionContractMethodCallList =
                new SystemContractDeploymentInput.Types.SystemTransactionMethodCallList();
            electionContractMethodCallList.Add(nameof(ElectionContractContainer.ElectionContractStub.InitialElectionContract),
                new InitialElectionContractInput
                {
                    MaximumLockTime = 1080 * 86400,
                    MinimumLockTime = 90 * 86400
                });
            return electionContractMethodCallList;
        }
    }
}