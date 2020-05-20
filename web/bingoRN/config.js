module.exports.config = {
  commonPrivateKey: 'b7a6b643f2a66848cb2229bf26c8330d5384e0eac325709a66f4baacc89d3108',
  lotteryAdminPrivateKey: 'e506064311aefba208d0fefa150fc7d48f1c6f6e00369504dc7ec7784594463d',
  customerAddress: '2hxkDg6Pd2d4yU1A16PTZVMMrEDYEPR8oQojMDwWdax5LsBaxX',
  customerTel: '10086',
  httpProvider: 'https://wallet-test.aelf.io/chain', //'http://192.168.1.4:1235',
  // httpProvider: 'http://1.119.195.50:11105/chain', //'http://192.168.1.4:1235',
  walletURL: 'https://wallet-test.aelf.io',
  // walletURL: 'http://1.119.195.50:11105',
  explorerURL: 'https://explorer-test.aelf.io',
  // explorerURL: 'http://1.119.195.50:11104',
  // contractExplorerURL: 'http://1.119.195.50:11104/contract?#http%3A%2F%2F1.119.195.50%3A11104%2Fviewer%2Faddress.html%23%2Fcontract%2Finfo%3Faddress%3D',
  contractExplorerURL: 'https://explorer-test.aelf.io/contract?#http%3A%2F%2F1.119.195.50%3A11104%2Fviewer%2Faddress.html%23%2Fcontract%2Finfo%3Faddress%3D',
  // contractNames & contractAddressedNeedInit will be init by appInit of `/common/utils/aelfProvider`;
  contractNames: {
    consensusContract: 'AElf.ContractNames.Consensus',
    tokenContract: 'AElf.ContractNames.Token',
  },
  contractAddressedNeedInit: {
    // This is vote contract for example
    bingoGameContract: '2LUmicHyH4RXrMjG4beDwuDsiWJESyLkgkwPdGTR8kahRzq5XS',
    appContract: '2LUmicHyH4RXrMjG4beDwuDsiWJESyLkgkwPdGTR8kahRzq5XS',
  },
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
  passwordReg: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[^]{12,}$/,
  balanceRefreshInterval: 30000,
  splashScreenShowTime: 3000
};
