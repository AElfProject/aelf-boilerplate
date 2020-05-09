const AElf = require('aelf-sdk');
const {config} = require('./config');
const {getContract, getContractAddresses} = require('./getContract');

const { contractAddressedNeedInit } = config;

// link to Blockchain
const aelf = new AElf(new AElf.providers.HttpProvider(config.httpProvider));

async function initContracts(privateKey) {

  const chainStatus = await aelf.chain.getChainStatus();
  const {
    // directly accessible information
    GenesisContractAddress
  } = chainStatus;
  const wallet = AElf.wallet.getWalletByPrivateKey(privateKey);
  const zeroC = await aelf.chain.contractAt(GenesisContractAddress, wallet);
  const contractNameAddressSets = await getContractAddresses(zeroC);

  return await getContract(aelf, wallet, {
    ...contractNameAddressSets,
    ...contractAddressedNeedInit
  });
}

async function appInit(privateKeyInput) {
  const privateKey = privateKeyInput || config.commonPrivateKey;
  try {
    return await initContracts(privateKey);
  } catch (error) {
    // TODO: show Error message
    console.warn(error);
  }
}

module.exports.appInit = appInit;

module.exports.aelfInstance = aelf;
