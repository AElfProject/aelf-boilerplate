/**
 * @file index.js
 * @author zmh3788
 * @description none
*/

import AElf from 'aelf-sdk';

const { sha256 } = AElf.utils;
const defaultPrivateKey = 'a59c14882c023d63e84e5faf36558fdc8dbf1063eed45ce7e507f1cd9bcde1d9';
const wallet = AElf.wallet.getWalletByPrivateKey(defaultPrivateKey);

const aelf = new AElf(new AElf.providers.HttpProvider('http://127.0.0.1:1235'));

if (!aelf.isConnected()) {
  alert('Blockchain Node is not running.');
}

function initDomEvent(multiTokenContract, bingoGameContract) {
  const register = document.getElementById('register');
  const balance = document.getElementById('balance');
  const siteBody = document.getElementById('site-body');
  const play = document.getElementById('play');
  const bingo = document.getElementById('bingo');
  const buttonBox = document.querySelector('.button-box');
  const balanceInput = document.getElementById('balance-input');
  const loader = document.getElementById('loader');
  let txId = 0;

  function getBalance() {
    const payload = {
      symbol: 'CARD',
      owner: wallet.address
    };
    return multiTokenContract.GetBalance.call(payload)
      .then(result => {
        const difference = result.balance - balance.innerText;
        balance.innerHTML = result.balance;
        return difference;
      })
      .catch(err => {
        console.log(err);
      });
  }

  register.onclick = function () {
    bingoGameContract.Register()
      .then(
        getBalance
      )
      .then(() => {
        alert('Congratulations on your successful registration！');
        siteBody.style.display = 'block';
        register.style.display = 'none';
      })
      .catch(err => {
        console.log(err);
      });
  };

  buttonBox.onclick = function (e) {
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

  play.onclick = function () {
    const reg = /^[1-9]\d*$/;
    const value = parseInt(balanceInput.value, 10);
    if (reg.test(value)) {
      loader.style.display = 'inline-block';
      bingoGameContract.Play({ value })
        .then(result => {
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
    } else {
      alert('Please enter a positive integer greater than 0!');
    }
  };

  bingo.onclick = function () {
    bingoGameContract.Bingo(txId)
      .then(
        getBalance
      )
      .then(difference => {
        play.style.display = 'inline-block';
        bingo.style.display = 'none';
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
  aelf.chain.getChainStatus()
    .then(res => aelf.chain.contractAt(res.GenesisContractAddress, wallet))
    .then(zeroC => Promise.all([
      zeroC.GetContractAddressByName.call(sha256('AElf.ContractNames.Token')),
      zeroC.GetContractAddressByName.call(sha256('AElf.ContractNames.BingoGameContract'))
    ]))
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

init();
