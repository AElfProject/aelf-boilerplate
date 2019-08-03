/**
 * @file index.js
 * @author huangzongzhe
 * @description How to use the plugin for hello world
 */

const { AElf } = window;
const Wallet = AElf.wallet;
const { sha256 } = AElf.utils;

// address: 65dDNxzcd35jESiidFXN5JV8Z7pCwaFnepuYQToNefSgqk9
const defaultPrivateKey = 'bdb3b39ef4cd18c2697a920eb6d9e8c3cf1a930570beb37d04fb52400092c42b';
const wallet = Wallet.getWalletByPrivateKey(defaultPrivateKey);
const aelf = new AElf(new AElf.providers.HttpProvider('http://127.0.0.1:1235'));

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
      console.log(
        'test.js check the status of extension named nightElf: ',
        result
      );
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

function initDomEvent(helloWorldAddress) {
  const aelfNightElf = new window.NightElf.AElf({
    // Enter your test address in this location
    httpProvider: ['http://127.0.0.1:1235'],
    appName
  });

  let chainId = null;
  let walletNightElf = null;
  const getChainStatus = document.getElementById('get-chain-status');
  const login = document.getElementById('login');
  const initContract = document.getElementById('init');
  const helloDom = document.getElementById('hello');

  getChainStatus.onclick = () => {
    aelfNightElf.chain
      .getChainStatus()
      .then(res => {
        console.log('>>>>>>>>>>>>> getChainStatus >>>>>>>>>>>>>');
        console.log(res);
        chainId = res.ChainId;
      })
      .catch(err => {
        console.log(err);
      });
  };

  login.onclick = () => {
    if (!chainId) {
      alert('please click getChainStatus at first');
      return;
    }
    console.log('login....');

    const loginParameter = {
      appName,
      chainId,
      payload: {
        method: 'LOGIN',
        contracts: [
          {
            chainId,
            contractAddress: helloWorldAddress,
            contractName: 'hello world',
            description: 'hello world contract',
            github: ''
          }
        ]
      }
    };

    aelfNightElf.login(loginParameter)
      .then(result => {
        console.log('>>>>>>> login >>>>>>>>>>>>', result);
        walletNightElf = JSON.parse(result.detail);
      })
      .catch(err => {
        console.log(err);
      });
  };

  initContract.onclick = () => {
    if (!walletNightElf) {
      alert('please click login at first');
      return;
    }

    aelfNightElf.chain.contractAt(helloWorldAddress, walletNightElf)
      .then(result => {
        console.log('>>>>>>>>>>>>> contractAtAsync >>>>>>>>>>>>>');
        console.log(result);
        window.helloWorldC = result;
      })
      .catch(err => {
        console.log(err);
      });
  };

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
}


aelf.chain
  .getChainStatus()
  .then(res => aelf.chain.contractAt(res.GenesisContractAddress, wallet))
  .then(zeroC => zeroC.GetContractAddressByName.call(sha256(helloWorldContractName)))
  .then(helloWorldAddress => {
    const nightElfCheck = NightElfCheck.getInstance();
    nightElfCheck.check
      .then(message => {
        // check plug-in
        console.log('nightElfCheck result', message);
        alert(message);

        initDomEvent(helloWorldAddress);
      })
      .catch(err => {
        console.log(err.message);
      });
  })
  .catch(err => {
    console.log(err);
  });
