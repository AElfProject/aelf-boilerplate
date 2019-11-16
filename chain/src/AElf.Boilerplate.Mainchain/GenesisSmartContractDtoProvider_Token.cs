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
        public IEnumerable<GenesisSmartContractDto> GetGenesisSmartContractDtosForToken(Address zeroContractAddress)
        {
            var l = new List<GenesisSmartContractDto>();
            l.AddGenesisSmartContract(
                _codes.Single(kv => kv.Key.Contains("MultiToken")).Value,
                TokenSmartContractAddressNameProvider.Name,
                GenerateTokenInitializationCallList(zeroContractAddress));
            return l;
        }

        private SystemContractDeploymentInput.Types.SystemTransactionMethodCallList GenerateTokenInitializationCallList(
            Address issuer)
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
                Issuer = issuer,
            });
            tokenContractCallList.Add(nameof(TokenContractContainer.TokenContractStub.Issue), new IssueInput
            {
                To = Address.FromPublicKey(AsyncHelper.RunSync(_accountService.GetPublicKeyAsync)),
                Amount = _economicOptions.TotalSupply / 10,
                Symbol = _economicOptions.Symbol,
                Memo = "Play!"
            });
            tokenContractCallList.Add(nameof(TokenContractContainer.TokenContractStub.Issue), new IssueInput
            {
                To = Address.FromPublicKey(
                  ByteArrayHelper.HexStringToByteArray("0484dc77d6b059d50156bc1a803203a2733dc591ae1358d7538c001565380b6c477b268a32baa6e609e41c0920b6b0eff3bee7ac3fc72148a3f89cb6579e256fa5")
                  ),
                Amount = _economicOptions.TotalSupply / 10,
                Symbol = _economicOptions.Symbol,
                Memo = "Play 233!"
            });
            return tokenContractCallList;
        }
    }
}