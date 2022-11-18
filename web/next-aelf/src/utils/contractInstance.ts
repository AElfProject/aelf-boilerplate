import AElf from 'aelf-sdk';

// create a new instance of AElf
// use our test environment url or prod environment url
const aelf = new AElf(new AElf.providers.HttpProvider('https://explorer-test.aelf.io/chain'));

// create a new wallet
const newWallet = AElf.wallet.createNewWallet();

// get a system contract address, take AElf.ContractNames.Token as an example
const tokenContractName = 'AElf.ContractNames.Token';

export const getTokenContractAddress = async () => {
  // get chain status
  const chainStatus = await aelf.chain.getChainStatus();
  // get genesis contract address
  const GenesisContractAddress = chainStatus.GenesisContractAddress;
  // get genesis contract instance
  const zeroContract = await aelf.chain.contractAt(GenesisContractAddress, newWallet);
  // get contract address by the read only method `GetContractAddressByName` of genesis contract
  const tokenContractAddress = await zeroContract.GetContractAddressByName.call(AElf.utils.sha256(tokenContractName));
  return tokenContractAddress;
};

/**
 * use token contract for examples to demonstrate how to get a contract instance.
 * @param tokenContractAddress address of token contract
 * @returns a contract instance.
 */
export const getContractInstance = async (tokenContractAddress: string) => {
  const tokenContract = await aelf.chain.contractAt(tokenContractAddress, newWallet);
  return tokenContract;
};

/**
 * get the balance of an address, this would not send a transaction,
 * or store any data on the chain, or required any transaction fee, only get the balance
 * with `.call` method, `aelf-sdk` will only call read-only method
 * @param tokenContract token contract instance
 * @returns balance info include symbol,owner and balance
 */
export const getBalance = async (tokenContract: any) => {
  const result = await tokenContract.GetBalance.call({
    symbol: 'ELF',
    owner: '7s4XoUHfPuqoZAwnTV7pHWZAaivMiL8aZrDSnY9brE1woa8vz',
  });
  return result;
};
/**
 * with no `.call`, `aelf-sdk` will sign and send a transaction to the chain, and return a transaction id.
 * make sure you have enough transaction fee `ELF` in your wallet
 * @param tokenContract token contract instance
 * @returns transaction id
 */
export const getTransactionId = async (tokenContract: any) => {
  const transactionId = await tokenContract.Transfer({
    symbol: 'ELF',
    to: '7s4XoUHfPuqoZAwnTV7pHWZAaivMiL8aZrDSnY9brE1woa8vz',
    amount: '1000000000',
    memo: 'transfer in demo',
  });
  return transactionId.TransactionId;
};
