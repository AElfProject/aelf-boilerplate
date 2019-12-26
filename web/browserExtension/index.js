/**
 * @file index.js
 * @author huangzongzhe
 * @description How to use the plugin for hello world
 */

const AElf = window.AElf;
const Wallet = AElf.wallet;
const sha256 = AElf.utils.sha256;

// address: 2hxkDg6Pd2d4yU1A16PTZVMMrEDYEPR8oQojMDwWdax5LsBaxX
const defaultPrivateKey = 'bdb3b39ef4cd18c2697a920eb6d9e8c3cf1a930570beb37d04fb52400092c42b';

const endpoint = 'http://127.0.0.1:1235';

let wallet = Wallet.getWalletByPrivateKey(defaultPrivateKey);
const aelf = new AElf(new AElf.providers.HttpProvider(endpoint));

if (!aelf.isConnected()) {
  alert('Blockchain Node is not running.');
}

const helloWorldContractName = 'AElf.ContractNames.HelloWorldContract';

const appName = 'hello world';

let nightElfInstance = null;
class NightElfCheck {
  constructor() {
    const readyMessage = 'NightElf is ready';
    let resovleTemp = null;
    this.check = new Promise((resolve, reject) => {
      if (window.NightElf) {
        resolve(readyMessage);
      }
      setTimeout(() => {
        reject({
          error: 200001,
          message: 'timeout / can not find NightElf / please install the extension'
        });
      }, 1000);
      resovleTemp = resolve;
    });
    document.addEventListener('NightElf', result => {
      console.log('test.js check the status of extension named nightElf: ', result);
      resovleTemp(readyMessage);
    });
  }
  static getInstance() {
    if (!nightElfInstance) {
      nightElfInstance = new NightElfCheck();
      return nightElfInstance;
    }
    return nightElfInstance;
  }
}

const nightElfCheck = NightElfCheck.getInstance();

aelf.chain.getChainStatus().then(async result => {
  const {
    GenesisContractAddress
  } = result;
  const zeroC = await aelf.chain.contractAt(GenesisContractAddress, wallet);
  const helloWorldAddress = await zeroC.GetContractAddressByName.call(sha256(helloWorldContractName));

  // 1.ugly way.
  // document.addEventListener('NightElf', result => {});
  // 2.The better way.
  nightElfCheck.check.then(message => {
    console.log('nightElfCheck result', message);
    alert(message);

    const aelf = new window.NightElf.AElf({
      // Enter your test address in this location
      httpProvider: [
        endpoint
      ],
      appName
    });

    let chainId;
    const getChainStatus = document.getElementById('get-chain-status');
    getChainStatus.onclick = () => {
      aelf.chain.getChainStatus((error, result) => {
        console.log('>>>>>>>>>>>>> getChainStatus >>>>>>>>>>>>>');
        console.log(error, result);
        chainId = result.ChainId;
      });
    };

    const login = document.getElementById('login');
    login.onclick = () => {

      if (!chainId) {
        alert('please click getChainStatus at first');
        return;
      }
      console.log('login....');

      aelf.login({
        appName,
        chainId: chainId,
        payload: {
          method: 'LOGIN',
          contracts: [{
            chainId: chainId,
            contractAddress: helloWorldAddress,
            contractName: 'hello world',
            description: 'hello world contract',
            github: ''
          }]
        }
      }, (err, result) => {
        console.log('>>>>>>> login >>>>>>>>>>>>', err, result);
        wallet = JSON.parse(result.detail);
      });
    };

    const initContract = document.getElementById('init');
    initContract.onclick = () => {

      if (!wallet) {
        alert('please click login at first');
        return;
      }

      aelf.chain.contractAt(
        helloWorldAddress,
        wallet,
        (error, result) => {
          console.log('>>>>>>>>>>>>> contractAtAsync >>>>>>>>>>>>>');
          console.log(error, result);
          window.helloWorldC = result;
        }
      );
    };

    const helloDom = document.getElementById('hello');
    helloDom.onclick = () => {

      if (!window.helloWorldC) {
        alert('please click init contract at first');
        return;
      }

      window.helloWorldC.Hello.call((err, result) => {
        console.log(err, result);
        alert(result.Value);
      });
    };
  }).catch(error => {
    alert(error.message);
  });
});
