const AElf = require('aelf-sdk');
const {config} = require('./config.js');
const {
  sha256
} = AElf.utils;

module.exports.getContractAddresses = function (zeroC) {
  const { contractNames } = config;
  const contractNameAddressKeyValues = {};
  const promise = Object.entries(contractNames).map(([contractName, addressName]) => {
    return zeroC.GetContractAddressByName.call(sha256(addressName)).then(result => {
      contractNameAddressKeyValues[contractName] = result;
    });
  });
  return Promise.all(promise).then(() => contractNameAddressKeyValues);
};

module.exports.getContract = function (aelf, wallet, contractNameAddressKeyValues) {
  const contractInstances = {};
  const { contractAddresses } = config;
  const promise = Object.entries(contractNameAddressKeyValues).map(([contractName, contractAdress]) => {
    return aelf.chain.contractAt(contractAdress, wallet).then(contractInstance => {
      contractInstances[contractName] = contractInstance;
    });
  });

  const otherPromise = Object.entries(contractAddresses).map(([contractName, contractAdress]) => {
    return aelf.chain.contractAt(contractAdress, wallet).then(contractInstance => {
      contractInstances[contractName] = contractInstance;
    });
  });

  return Promise.all([...promise, ...otherPromise]).then(() => {
    return contractInstances;
  });
};

module.exports.getOtherContracts = function (aelf, wallet) {
  const { contractAddresses } = config;
  const contractInstances = {};
  const promise = Object.entries(contractAddresses).map(([contractName, contractAdress]) => {
    return aelf.chain.contractAt(contractAdress, wallet).then(contractInstance => {
      contractInstances[contractName] = contractInstance;
    });
  });
  return Promise.all(promise).then(() => {
    return contractInstances;
  });
};

