/**
 * @file index.js
 * @author zmh3788
 * @description none
*/

import AElf from 'aelf-sdk';

const { sha256 } = AElf.utils;


const wallet = AElf.wallet.getWalletByPrivateKey('845dadc4609852818f3f7466b63adad0504ee77798b91853fdab6af80d3a4eba');
const bingoAddress = '2LUmicHyH4RXrMjG4beDwuDsiWJESyLkgkwPdGTR8kahRzq5XS';
// const wallet = AElf.wallet.getWalletByPrivateKey(defaultPrivateKey);
// link to local Blockchain, you can learn how to run a local node in https://docs.aelf.io/main/main/setup
// const aelf = new AElf(new AElf.providers.HttpProvider('http://127.0.0.1:1235'));
const aelf = new AElf(new AElf.providers.HttpProvider('http://127.0.0.1:1235'));

if (!aelf.isConnected()) {
  alert('Blockchain Node is not running.');
}

// add event for dom
function initDomEvent(tokenContract, bingoGameContract) {
  const balance = document.getElementById('balance');
  const feeBalance = document.getElementById('fee-balance');
  const play = document.getElementById('play');
  const buttonBox = document.querySelector('#button-box');
  const balanceInput = document.getElementById('balance-input');
  const loader = document.getElementById('loader');
  let txId = 0;
  const betTypeMap = {"small": 1, "big": 2};
  let betType;
  const betTypeSwitch = document.querySelector("#small-big");

   // when input text change, whether play button is active
  balanceInput.oninput = () => {
    if(isNaN(Number(balance.innerHTML))){
      play.classList.remove("active");
      return;
    }
  const reg = /^[1-9]\d*$/;
    if(!reg.test(balanceInput.value)){
      document.querySelector("#input-alert").innerText = "* Please input valid number !! Leading zero not allowed !!";
      play.classList.remove("active");
      return;
    } else if(balanceInput.value > balance.innerText){
      document.querySelector("#input-alert").innerText = "* betting number excceds your current balance !!";
      play.classList.remove("active");
    }
    else{
    document.querySelector("#input-alert").innerText = "";
    play.classList.add("active");
    }
  }
  balanceInput.onchange = () => {
    if(!balanceInput.value){
      document.querySelector("#input-alert").innerText = "* Please input a number !!";
      play.classList.remove("active");
      return;
    }
  }

  // Update your card number,Returns the change in the number of your cards
  function getBalance() {
    const payload = {
      symbol: 'ELF',
      owner: wallet.address
    };

    // TODO:
    setTimeout(() => {
      tokenContract.GetBalance.call(payload)
        .then(result => {
          console.log('result: ', result);
          // console.log(balance.innerText);
          // const difference = result.balance - balance.innerText;
          balance.innerHTML = result.balance;
          // return difference;
        })
        .catch(err => {
          console.log(err);
        });
    }, 0);

    // return multiTokenContract.GetBalance.call(payload)
    //   .then(result => {
    //     // console.log('result: ', result);
    //     const difference = result.balance - balance.innerText;
    //     // balance.innerHTML = result.balance;
    //     balance.innerHTML = 'loading...';
    //     return difference;
    //   })
    //   .catch(err => {
    //     console.log(err);
    //   });;
  }


  getBalance();

  betType = betTypeMap[document.querySelector("#small-big .active").innerHTML.toLowerCase()];

  // switch bet type
  betTypeSwitch.onclick = e => {
    // console.log(e.currentTarget.children);
    Array.from(e.currentTarget.children).forEach( ele => {
      ele.classList.remove("active");
      }
    )
    e.target.classList.add("active");
    betType = betTypeMap[e.target.innerHTML.toLowerCase()];
    // console.log(e.target.innerHTML.toLowerCase());
  }

  // click button to change the number of bets
  buttonBox.onclick = e => {
    if(isNaN(Number(balance.innerHTML))){
      play.classList.remove("active");
      return;
     }
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
        return;
    }

    balanceInput.value = value;
    document.querySelector("#input-alert").innerText = "";
    play.classList.add("active");
  };



  // Check the format of the input, start play
  play.onclick = async () => {
    if(!play.classList.contains("active")){
      return;
    }

    // display waiting spinner...
    document.querySelector("#spinner-container").style.display = "block";

    // play input
    const playInput = {
      buyAmount: +balanceInput.value,
      buyType: betType,
      tockenSymbol: 'ELF',
    };


    // get allowance
    const allowance = await tokenContract.GetAllowance.call({
      symbol : 'ELF',
      owner : wallet.address,
      spender: bingoGameContract.address
    });

    console.log("allowance", allowance.allowance);

    if(allowance.allowance < +balanceInput.value){
      // approve some elf
      const approveTxId = await tokenContract.Approve({
        symbol :  'ELF', 
        spender: bingoGameContract.address, 
        amount : +balanceInput.value, 
      });

      // check approve result, in every second
      let approveResult;
      let approveCheckInterval = setInterval(async () => {
        approveResult = await aelf.chain.getTxResult(approveTxId.TransactionId);
        console.log("approving", approveResult.Status);
        if(approveResult.Status == 'MINED') {

          console.log("allowance new", allowance.allowance);
          bingoGameContract.Play(playInput)
        .then(playTxId => {
        console.log('Play result: ', playTxId.TransactionId);

        // stop displaying waiting spinner...
        document.querySelector("#spinner-container").style.display = "none";
        balanceInput.value = '';
        play.classList.remove("active");
        })
        .catch(err => {
        console.log(err);
        });
          clearInterval(approveCheckInterval);}
      }, 1000)
    }else{
      bingoGameContract.Play(playInput)
        .then(playTxId => {
        console.log('Play result: ', playTxId.TransactionId);

        // stop displaying waiting spinner...
        document.querySelector("#spinner-container").style.display = "none";
        balanceInput.value = '';
        play.classList.remove("active");
        })
        .catch(err => {
        console.log(err);
        });
    }


    
    
  };

}



function init() {
  // document.getElementById('register').innerText = 'Please wait...';
  aelf.chain.getChainStatus()
    // get instance by GenesisContractAddress
    .then(res => aelf.chain.contractAt(res.GenesisContractAddress, wallet))
    // return contract's address which you query by contract's name
    .then(zeroC => zeroC.GetContractAddressByName.call(sha256('AElf.ContractNames.Token')))
    // return contract's instance and you can call the methods on this instance
    .then(tokenAddress => Promise.all([
      aelf.chain.contractAt(tokenAddress, wallet),
      aelf.chain.contractAt(bingoAddress, wallet, {sync: true})
    ]))
    .then(([tokenContract, bingoGameContract]) => {
      initDomEvent(tokenContract, bingoGameContract);
    })
    .catch(err => {
      console.log(err);
    });
}

// run program
init();
