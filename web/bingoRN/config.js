module.exports.config = {
  commonPrivateKey: 'b7a6b643f2a66848cb2229bf26c8330d5384e0eac325709a66f4baacc89d3108',
  customerAddress: '2hxkDg6Pd2d4yU1A16PTZVMMrEDYEPR8oQojMDwWdax5LsBaxX',
  customerTel: 'Just a dev show case, you can input a phone number here.',
  // httpProvider: 'https://wallet-test.aelf.io/chain', //'http://192.168.1.4:1235',
  httpProvider: 'http://127.0.0.1:1235', //'http://192.168.1.4:1235',
  // httpProvider: 'http://1.119.195.50:11105/chain', //'http://192.168.1.4:1235',
  walletURL: 'https://wallet-test.aelf.io',
  // walletURL: 'http://1.119.195.50:11105',
  explorerURL: 'https://explorer-test.aelf.io',
  // explorerURL: 'http://1.119.195.50:11104',
  // contractExplorerURL: 'http://1.119.195.50:11104/contract?#http%3A%2F%2F1.119.195.50%3A11104%2Fviewer%2Faddress.html%23%2Fcontract%2Finfo%3Faddress%3D',
  contractExplorerURL: 'https://explorer-test.aelf.io/contract?#http%3A%2F%2F1.119.195.50%3A11104%2Fviewer%2Faddress.html%23%2Fcontract%2Finfo%3Faddress%3D',
  // contractNames & contractAddresses will be init by appInit of `/common/utils/aelfProvider`;
  contractNames: {
    consensusContract: 'AElf.ContractNames.Consensus',
    tokenContract: 'AElf.ContractNames.Token',
  },
  // You want to init in the app
  contractAddresses: {
    bingoGameContract: '2LUmicHyH4RXrMjG4beDwuDsiWJESyLkgkwPdGTR8kahRzq5XS',
    appContract: '2LUmicHyH4RXrMjG4beDwuDsiWJESyLkgkwPdGTR8kahRzq5XS',
  },
  address: {
    prefix: 'ELF',
    suffix: 'AELF'
  },
  startPeriod: 0,
  tokenSymbol: 'ELF',
  tokenDecimal: 8,
  tokenDecimalFormat: 10 ** 8,
  // password check
  passwordReg: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[^]{12,}$/,
  balanceRefreshInterval: 30000,
  splashScreenShowTime: 3000
};
