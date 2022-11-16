import AElf from 'aelf-sdk';

// create a new instance of AElf
// use our test environment url or prod environment url
const aelf = new AElf(new AElf.providers.HttpProvider('https://explorer-test.aelf.io/chain'));

// create a new wallet
const newWallet = AElf.wallet.createNewWallet();

// Get a system contract address, take AElf.ContractNames.Token as an example
const tokenContractName = 'AElf.ContractNames.Token';
export const getTokenContractAddress = async () => {
  // get chain status
  const chainStatus = await aelf.chain.getChainStatus();
  // get genesis contract address
  const GenesisContractAddress = chainStatus.GenesisContractAddress;
  // get genesis contract instance
  const zeroContract = await aelf.chain.contractAt(GenesisContractAddress, newWallet);
  // Get contract address by the read only method `GetContractAddressByName` of genesis contract
  const tokenContractAddress = await zeroContract.GetContractAddressByName.call(AElf.utils.sha256(tokenContractName));
  return tokenContractAddress;
};
// Use token contract for examples to demonstrate how to get a contract instance
export const getContractInstance = async (tokenContractAddress: string) => {
  const tokenContract = await aelf.chain.contractAt(tokenContractAddress, newWallet);
  return tokenContract;
};
