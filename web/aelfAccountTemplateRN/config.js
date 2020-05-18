module.exports.config = {
  commonPrivateKey: 'b7a6b643f2a66848cb2229bf26c8330d5384e0eac325709a66f4baacc89d3108',
  lotteryAdminPrivateKey: 'e506064311aefba208d0fefa150fc7d48f1c6f6e00369504dc7ec7784594463d',
  customerAddress: '2hxkDg6Pd2d4yU1A16PTZVMMrEDYEPR8oQojMDwWdax5LsBaxX',
  customerTel: '10086',
  httpProvider: 'https://wallet-test.aelf.io/chain', //'http://192.168.1.4:1235',
  walletURL: 'https://wallet-test.aelf.io',
  explorerURL: 'https://explorer-test.aelf.io',
  // contractNames & contractAddressedNeedInit will be init by appInit of `/common/utils/aelfProvider`;
  contractNames: {
    consensusContract: 'AElf.ContractNames.Consensus',
    tokenContract: 'AElf.ContractNames.Token',
  },
  contractAddressedNeedInit: {
    // This is vote contract for example
    appContract: '2aoPatvMevjmhwsU1S9pkH2vnkNAuaiUaiU6JDroKNKe3fBQns',
  },
  contractAddresses: {
    appContract: '2aoPatvMevjmhwsU1S9pkH2vnkNAuaiUaiU6JDroKNKe3fBQns',
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
