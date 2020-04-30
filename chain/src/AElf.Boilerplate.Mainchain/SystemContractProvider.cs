using System;
using System.Collections.Generic;
using System.Linq;
using AElf.Boilerplate.ContractDeployer;

namespace AElf.Boilerplate.MainChain
{
    public class SystemContractProvider : ISystemContractProvider
    {
        public IEnumerable<string> GetSystemContractDllPaths()
        {
            return new List<Type>
            {
                typeof(Contracts.Profit.ProfitContract),
                typeof(Contracts.Vote.VoteContract),
                typeof(Contracts.Election.ElectionContract),
                typeof(Contracts.Consensus.AEDPoS.AEDPoSContract),
                typeof(Contracts.MultiToken.TokenContract),
                typeof(Contracts.Configuration.ConfigurationContract),
                typeof(Contracts.Treasury.TreasuryContract),
                typeof(Contracts.Parliament.ParliamentContract),
                typeof(Contracts.Association.AssociationContract),
                typeof(Contracts.Referendum.ReferendumContract),
                typeof(Contracts.Economic.EconomicContract),
                typeof(Contracts.TokenHolder.TokenHolderContract),
                typeof(Contracts.TokenConverter.TokenConverterContract),
                typeof(Contracts.CrossChain.CrossChainContract),
            }.Select(t => t.Assembly.Location).ToList();
        }
    }
}