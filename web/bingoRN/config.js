// We use keystore to store the private key and use information
// You can custom your keystore config for different device.
const keystoreOptions = {
  ios: {
    dklen: 32,
    n: 2048, // 2048 4096 8192 16384
    r: 8,
    p: 1,
    cipher: 'aes-128-ctr'
  },
  android: {
    dklen: 32,
    n: 2048, // 2048 4096 8192 16384
    r: 8,
    p: 1,
    cipher: 'aes-128-ctr'
  }
};

module.exports.config = {
  commonPrivateKey: 'b7a6b643f2a66848cb2229bf26c8330d5384e0eac325709a66f4baacc89d3108',
  customerAddress: '2hxkDg6Pd2d4yU1A16PTZVMMrEDYEPR8oQojMDwWdax5LsBaxX',
  customerTel: 'Just a dev show case, you can input a phone number here.',
  // You can change the params for keystore here
  keystoreOptions,
  // We can not use 127.0.0.1 or localhost in Android. We need use local ip.
  httpProvider: 'http://192.168.199.122:1235', //'http://192.168.1.4:1235',
  // Block chain swagger api
  // httpProvider: 'http://1.119.195.50:11105/chain', //'http://192.168.1.4:1235',
  walletURL: 'http://1.119.195.50:11105',
  explorerURL: 'http://1.119.195.50:11104',
  contractExplorerURL: 'http://1.119.195.50:11104/contract?#http%3A%2F%2F1.119.195.50%3A11104%2Fviewer%2Faddress.html%23%2Fcontract%2Finfo%3Faddress%3D',
  // httpProvider: 'https://wallet-test.aelf.io/chain', //'http://192.168.1.4:1235',
  // walletURL: 'https://wallet-test.aelf.io',
  // explorerURL: 'https://explorer-test.aelf.io',
  // contractExplorerURL: 'https://explorer-test.aelf.io/contract?#http%3A%2F%2F1.119.195.50%3A11104%2Fviewer%2Faddress.html%23%2Fcontract%2Finfo%3Faddress%3D',

  // contractNames & contractAddresses will be init by appInit of `/common/utils/aelfProvider`;
  contractNames: {
    consensusContract: 'AElf.ContractNames.Consensus',
    tokenContract: 'AElf.ContractNames.Token',
  },
  // You want to init in the app
  contractAddresses: {
    // bingoGameContract: 'JRmBduh4nXWi1aXgdUsj5gJrzeZb2LxmrAbf7W99faZSvoAaE',
    // appContract: 'JRmBduh4nXWi1aXgdUsj5gJrzeZb2LxmrAbf7W99faZSvoAaE',
    bingoGameContract: '2LUmicHyH4RXrMjG4beDwuDsiWJESyLkgkwPdGTR8kahRzq5XS',
    appContract: '2LUmicHyH4RXrMjG4beDwuDsiWJESyLkgkwPdGTR8kahRzq5XS',
  },
  address: {
    prefix: 'ELF',
    suffix: 'AELF'
  },
  startPeriod: 0,
  // tokenSymbol: 'AEUSD',
  // tokenDecimal: 3,
  // tokenDecimalFormat: 10 ** 3,
  // feeTokenSymbol: 'AEUSD',
  // feeTokenDecimal: 3,
  // feeTokenDecimalFormat: 10 ** 3,
  tokenSymbol: 'ELF',
  tokenDecimal: 8,
  tokenDecimalFormat: 10 ** 8,
  feeTokenSymbol: 'ELF',
  feeTokenDecimal: 8,
  feeTokenDecimalFormat: 10 ** 8,
  // password check
  passwordReg: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[^]{12,}$/,
  balanceRefreshInterval: 30000,
  splashScreenShowTime: 3000
};
