using System.Collections.Generic;
using System.Linq;
using Acs0;
using AElf.Contracts.MultiToken;
using AElf.Kernel.Token;
using AElf.OS.Node.Application;
using AElf.Types;
using Volo.Abp.Threading;

namespace AElf.Blockchains.MainChain
{
    public partial class GenesisSmartContractDtoProvider
    {
        public IEnumerable<GenesisSmartContractDto> GetGenesisSmartContractDtosForToken()
        {
            var l = new List<GenesisSmartContractDto>();
            l.AddGenesisSmartContract(
                _codes.Single(kv => kv.Key.Contains("MultiToken")).Value,
                TokenSmartContractAddressNameProvider.Name,
                GenerateTokenInitializationCallList());
            return l;
        }

        private SystemContractDeploymentInput.Types.SystemTransactionMethodCallList GenerateTokenInitializationCallList()
        {
            var tokenContractCallList = new SystemContractDeploymentInput.Types.SystemTransactionMethodCallList();
            tokenContractCallList.Add(nameof(TokenContractContainer.TokenContractStub.Create), new CreateInput
            {
                Symbol = _economicOptions.Symbol,
                Decimals = _economicOptions.Decimals,
                IsBurnable = _economicOptions.IsBurnable,
                TokenName = _economicOptions.TokenName,
                TotalSupply = _economicOptions.TotalSupply,
                // Set the contract zero address as the issuer temporarily.
                Issuer = _smartContractAddressService.GetZeroSmartContractAddress(),
            });
            tokenContractCallList.Add(nameof(TokenContractContainer.TokenContractStub.Issue), new IssueInput
            {
                To = Address.FromPublicKey(AsyncHelper.RunSync(_accountService.GetPublicKeyAsync)),
                Amount = _economicOptions.TotalSupply,
                Symbol = _economicOptions.Symbol,
                Memo = "Play!"
            });
            return tokenContractCallList;
        }
    }
}