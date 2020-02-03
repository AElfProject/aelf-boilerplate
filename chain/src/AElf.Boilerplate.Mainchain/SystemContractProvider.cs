using System;
using System.Collections.Generic;
using System.Linq;
using AElf.Contracts.Deployer;

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
                typeof(Contracts.Configuration.ConfigurationContract)
            }.Select(t => t.Assembly.Location).ToList();
        }
    }
}