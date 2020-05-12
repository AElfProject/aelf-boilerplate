using System.Collections.Generic;
using AElf.Boilerplate.ContractDeployer;
using AElf.CrossChain;
using AElf.EconomicSystem;
using AElf.GovernmentSystem;
using AElf.Kernel;
using AElf.Kernel.Consensus;
using AElf.Kernel.Proposal;
using AElf.Kernel.Token;
using AElf.Types;

namespace AElf.Boilerplate.TestBase
{
    public class SystemContractProvider : ISystemContractProvider
    {
        public Dictionary<Hash, string> GetSystemContractInfo()
        {
            return new Dictionary<Hash, string>
            {
                {
                    ProfitSmartContractAddressNameProvider.Name,
                    typeof(Contracts.Profit.ProfitContract).Assembly.Location
                },
                {VoteSmartContractAddressNameProvider.Name, typeof(Contracts.Vote.VoteContract).Assembly.Location},
                {
                    ElectionSmartContractAddressNameProvider.Name,
                    typeof(Contracts.Election.ElectionContract).Assembly.Location
                },
                {
                    ConsensusSmartContractAddressNameProvider.Name,
                    typeof(Contracts.Consensus.AEDPoS.AEDPoSContract).Assembly.Location
                },
                {
                    TokenSmartContractAddressNameProvider.Name,
                    typeof(Contracts.MultiToken.TokenContract).Assembly.Location
                },
                {
                    ConfigurationSmartContractAddressNameProvider.Name,
                    typeof(Contracts.Configuration.ConfigurationContract).Assembly.Location
                },
                {
                    TreasurySmartContractAddressNameProvider.Name,
                    typeof(Contracts.Treasury.TreasuryContract).Assembly.Location
                },
                {
                    ParliamentSmartContractAddressNameProvider.Name,
                    typeof(Contracts.Parliament.ParliamentContract).Assembly.Location
                },
                {
                    AssociationSmartContractAddressNameProvider.Name,
                    typeof(Contracts.Association.AssociationContract).Assembly.Location
                },
                {
                    ReferendumSmartContractAddressNameProvider.Name,
                    typeof(Contracts.Referendum.ReferendumContract).Assembly.Location
                },
                {
                    EconomicSmartContractAddressNameProvider.Name,
                    typeof(Contracts.Economic.EconomicContract).Assembly.Location
                },
                {
                    TokenHolderSmartContractAddressNameProvider.Name,
                    typeof(Contracts.TokenHolder.TokenHolderContract).Assembly.Location
                },
                {
                    TokenConverterSmartContractAddressNameProvider.Name,
                    typeof(Contracts.TokenConverter.TokenConverterContract).Assembly.Location
                },
                {
                    CrossChainSmartContractAddressNameProvider.Name,
                    typeof(Contracts.CrossChain.CrossChainContract).Assembly.Location
                }
            };
        }
    }
}