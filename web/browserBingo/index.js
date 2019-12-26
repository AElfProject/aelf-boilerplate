/**
 * @file index.js
 * @author zmh3788
 * @description none
*/

import AElf from 'aelf-sdk';

const { sha256 } = AElf.utils;

// const defaultPrivateKey = 'a59c14882c023d63e84e5faf36558fdc8dbf1063eed45ce7e507f1cd9bcde1d9';
const wallet = AElf.wallet.createNewWallet();
// const wallet = AElf.wallet.getWalletByPrivateKey(defaultPrivateKey);
// link to local Blockchain, you can learn how to run a local node in https://docs.aelf.io/main/main/setup
// const aelf = new AElf(new AElf.providers.HttpProvider('http://127.0.0.1:1235'));
const aelf = new AElf(new AElf.providers.HttpProvider('http://127.0.0.1:1235'));

if (!aelf.isConnected()) {
  alert('Blockchain Node is not running.');
}

// add event for dom
function initDomEvent(multiTokenContract, bingoGameContract) {
  const register = document.getElementById('register');
  const balance = document.getElementById('balance');
  const siteBody = document.getElementById('site-body');
  const play = document.getElementById('play');
  const bingo = document.getElementById('bingo');
  const buttonBox = document.querySelector('.button-box');
  const balanceInput = document.getElementById('balance-input');
  const refreshButton = document.getElementById('refresh-button');
  const loader = document.getElementById('loader');
  let txId = 0;

  // Update your card number,Returns the change in the number of your cards
  function getBalance() {
    const payload = {
      symbol: 'CARD',
      owner: wallet.address
    };

    // TODO:
    setTimeout(() => {
      multiTokenContract.GetBalance.call(payload)
        .then(result => {
          console.log('result: ', result);
          const difference = result.balance - balance.innerText;
          balance.innerHTML = result.balance;
          return difference;
        })
        .catch(err => {
          console.log(err);
        });
    }, 3000);

    return multiTokenContract.GetBalance.call(payload)
      .then(result => {
        // console.log('result: ', result);
        const difference = result.balance - balance.innerText;
        // balance.innerHTML = result.balance;
        balance.innerHTML = 'loading...';
        return difference;
      })
      .catch(err => {
        console.log(err);
      });;
  }

  refreshButton.onclick = () => {
    getBalance();
  };

  // register game, update the number of cards, display game interface
  let loading = false;
  register.onclick = () => {
    if (loading) {
      return;
    }
    loading = true;
    loader.style.display = 'inline-block';
    bingoGameContract.Register()
      .then(() => {
        return new Promise(resolve => {
          register.innerText = 'Loading';
          setTimeout(() => {
            getBalance();
            loading = false;
            register.innerText = 'Register';
            loader.style.display = 'none';
            resolve()
          }, 3000);
        });
      })
      .then(() => {
        alert('Congratulations on your successful registration！');
        siteBody.style.display = 'block';
        register.style.display = 'none';
      })
      .catch(err => {
        console.log(err);
      });
  };

  // click button to change the number of bets
  buttonBox.onclick = e => {
    let value;
    switch (e.toElement.innerText) {
      case '3000':
        value = 3000;
        break;
      case '5000':
        value = 5000;
        break;
      case 'Half':
        value = parseInt(balance.innerHTML / 2, 10);
        break;
      case 'All-In':
        value = parseInt(balance.innerHTML, 10);
        break;
      default:
        value = 0;
    }

    balanceInput.value = value;
  };

  // Check the format of the input, start play
  play.onclick = () => {
    const reg = /^[1-9]\d*$/;
    const value = parseInt(balanceInput.value, 10);
    if (reg.test(value) && value <= balance.innerText) {
      loader.style.display = 'inline-block';
      bingoGameContract.Play({ value })
        .then(result => {
          console.log('Play result: ', result);
          play.style.display = 'none';
          txId = result.TransactionId;
          setTimeout(() => {
            bingo.style.display = 'inline-block';
            loader.style.display = 'none';
          }, 400);
          // alert('Wait patiently, click on the results when the Bingo button appears！');
        })
        .catch(err => {
          console.log(err);
        });
    } else if (value > balance.innerText) {
      alert('Please enter a number less than the number of cards you own!');
    } else {
      alert('Please enter a positive integer greater than 0!');
    }
  };

  // return to game results
  bingo.onclick = () => {
    bingoGameContract.Bingo(txId)
      .then(
        getBalance
      )
      .then(difference => {
        play.style.display = 'inline-block';
        bingo.style.display = 'none';
        console.log('difference: ', difference);
        if (difference > 0) {
          alert(`Congratulations！！ You got ${difference} card`);
        } else if (difference < 0) {
          alert(`It’s a pity. You lost ${-difference} card`);
        } else {
          alert('You got nothing');
        }
      })
      .catch(err => {
        console.log(err);
      });
  };
}

function init() {
  document.getElementById('register').innerText = 'Please wait...';
  aelf.chain.getChainStatus()
    // get instance by GenesisContractAddress
    .then(res => aelf.chain.contractAt(res.GenesisContractAddress, wallet))
    // return contract's address which you query by contract's name
    .then(zeroC => Promise.all([
      zeroC.GetContractAddressByName.call(sha256('AElf.ContractNames.Token')),
      zeroC.GetContractAddressByName.call(sha256('AElf.ContractNames.BingoGameContract'))
    ]))
    // return contract's instance and you can call the methods on this instance
    .then(([tokenAddress, bingoAddress]) => Promise.all([
      aelf.chain.contractAt(tokenAddress, wallet),
      aelf.chain.contractAt(bingoAddress, wallet)
    ]))
    .then(([multiTokenContract, bingoGameContract]) => {
      initDomEvent(multiTokenContract, bingoGameContract);
    })
    .catch(err => {
      console.log(err);
    });
}

// run program
init();
