/**
 * @file index.js
 * @author zmh3788
 * @description none
 */

import AElf from "aelf-sdk";

const { sha256 } = AElf.utils;

const wallet = AElf.wallet.getWalletByPrivateKey(
  "845dadc4609852818f3f7466b63adad0504ee77798b91853fdab6af80d3a4eba"
);
const bingoAddress = "2LUmicHyH4RXrMjG4beDwuDsiWJESyLkgkwPdGTR8kahRzq5XS";
// const wallet = AElf.wallet.getWalletByPrivateKey(defaultPrivateKey);
// link to local Blockchain, you can learn how to run a local node in https://docs.aelf.io/main/main/setup
// const aelf = new AElf(new AElf.providers.HttpProvider('http://127.0.0.1:1235'));
const aelf = new AElf(new AElf.providers.HttpProvider("http://127.0.0.1:1235"));

if (!aelf.isConnected()) {
  alert("Blockchain Node is not running.");
}

// add event for dom
function initDomEvent(tokenContract, bingoGameContract) {
  const balance = document.getElementById("balance");
  const allowanceWeb = document.getElementById("allowance");
  const feeBalance = document.getElementById("fee-balance");
  const play = document.getElementById("play");
  const buttonBox = document.querySelector("#button-box");
  const balanceInput = document.getElementById("balance-input");
  const loader = document.getElementById("loader");
  let txId = 0;
  const betTypeMap = { small: 1, big: 2 };
  let betType;
  const betTypeSwitch = document.querySelector("#small-big");

  // when input text change, whether play button is active
  balanceInput.oninput = () => {
    if (isNaN(Number(balance.innerHTML))) {
      play.classList.remove("active");
      return;
    }
    const reg = /^[1-9]\d*$/;
    if (!reg.test(balanceInput.value)) {
      document.querySelector("#input-alert").innerText =
        "* Please input valid number !! Leading zero not allowed !!";
      play.classList.remove("active");
      return;
    } else if (balanceInput.value > balance.innerText) {
      document.querySelector("#input-alert").innerText =
        "* betting number excceds your current balance !!";
      play.classList.remove("active");
    } else {
      document.querySelector("#input-alert").innerText = "";
      play.classList.add("active");
    }
  };
  balanceInput.onchange = () => {
    if (!balanceInput.value) {
      document.querySelector("#input-alert").innerText =
        "* Please input a number !!";
      play.classList.remove("active");
      return;
    }
  };

  // Update your card number,Returns the change in the number of your cards
  function getBalance() {
    const payload = {
      symbol: "ELF",
      owner: wallet.address,
    };
    setTimeout(() => {
      tokenContract.GetBalance.call(payload)
        .then((result) => {
          // console.log('result: ', result);
          // console.log(balance.innerText);
          // const difference = result.balance - balance.innerText;
          balance.innerHTML = result.balance;
          // return difference;
        })
        .catch((err) => {
          console.log(err);
        });
    }, 0);
  }

  getBalance();

  betType =
    betTypeMap[
      document.querySelector("#small-big .active").innerHTML.toLowerCase()
    ];

  // switch bet type
  betTypeSwitch.onclick = (e) => {
    // console.log(e.currentTarget.children);
    Array.from(e.currentTarget.children).forEach((ele) => {
      ele.classList.remove("active");
    });
    e.target.classList.add("active");
    betType = betTypeMap[e.target.innerHTML.toLowerCase()];
    // console.log(e.target.innerHTML.toLowerCase());
  };

  // click button to change the number of bets
  buttonBox.onclick = (e) => {
    if (isNaN(Number(balance.innerHTML))) {
      play.classList.remove("active");
      return;
    }
    let value;
    switch (e.toElement.innerText) {
      case "3000":
        value = 3000;
        break;
      case "5000":
        value = 5000;
        break;
      case "Half":
        value = parseInt(balance.innerHTML / 2, 10);
        break;
      case "All-In":
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
    if (!play.classList.contains("active")) {
      return;
    }

    // display waiting spinner...
    document.querySelector("#spinner-container").style.display = "block";

    // play input
    const playInput = {
      buyAmount: +balanceInput.value,
      buyType: betType,
      tokenSymbol: "ELF",
    };

    // get allowance
    const allowance = await tokenContract.GetAllowance.call({
      symbol: "ELF",
      owner: wallet.address,
      spender: bingoGameContract.address,
    });

    console.log("allowance", allowance.allowance);

    if (allowance.allowance < +balanceInput.value) {
      // approve some elf
      const approveTxId = await tokenContract.Approve({
        symbol: "ELF",
        spender: bingoGameContract.address,
        amount: +balanceInput.value,
      });

      // check approve result, in every second
      let approveResult;
      let approveCheckTimeout = setTimeout(async function f(){
        approveResult = await aelf.chain.getTxResult(approveTxId.TransactionId);
        console.log("approving", approveResult.Status);
        if (approveResult.Status == "MINED") {
          clearTimeout(approveCheckTimeout);
          console.log("allowance new", allowance.allowance);

          playBingo(playInput);
        } else{

          setTimeout(f, 1000);
        }
      }, 1000);
    } else {
      playBingo(playInput);
    }
  };

  // get player information every 1s
  let playerInformation = bingoGameContract.GetPlayerInformation.call(
    wallet.address
  ).then((r) => {
    console.log("playerInformation", r);
  });
  let playerInformationCompleted = bingoGameContract.GetPlayerInformationCompleted.call(
    wallet.address
  ).then((r) => {
    console.log("playerInformationCompleted", r);
  });

  // get bingo Award
  // bingoGameContract.GetAward.call("d53c3b10d1470717f2e1ec8eadc4480e7e05e8425b349f1bfacd7c53003b9673")
  //                 .then(r => {
  //                   console.log("award", r);
  //                 })

  async function playBingo(playInput) {
    let playTxId = await bingoGameContract.Play(playInput);

    // stop displaying waiting spinner... reset the input
    document.querySelector("#spinner-container").style.display = "none";
    balanceInput.value = "";
    play.classList.remove("active");

    console.log("============ play bingo ==============");

    let playResult;

    let playCheckTimeout = setTimeout(async function f(){
      playResult = await aelf.chain.getTxResult(playTxId.TransactionId);
      console.log("playing", playResult.Status);
      if (playResult.Status == "MINED") {
        // clearInterval(playCheckInterval);
        console.log("play result", playResult);
        // change allowance amount on web
        allowanceWeb.innerHTML = (
          await tokenContract.GetAllowance.call({
            symbol: "ELF",
            owner: wallet.address,
            spender: bingoGameContract.address,
          })
        ).allowance;

        // set a 30s timeout api for bingo
        console.log("wait for 30s.......");
        setTimeout(() => {
          bingoGameContract.Bingo(playTxId.TransactionId).then((r) => {
            console.log("bingoTxId", r.TransactionId);

            // check if bingo finished
            let bingoResult;
            let bingoCheckTimeout = setTimeout(async function g(){
              bingoResult = await aelf.chain.getTxResult(r.TransactionId);
              console.log("bingo", bingoResult.Status);
              if (bingoResult.Status == "MINED") {
                console.log("bingo result", bingoResult);
                clearTimeout(bingoCheckTimeout);
                // change the balance
                getBalance();
              } else{

                setTimeout(g, 1000);
              }
            }, 1000);
          });
        }, 30000);
        clearTimeout(playCheckTimeout);
      }else{

        setTimeout(f ,1000);
      }
    }, 1000);
  }
}

function init() {
  // document.getElementById('register').innerText = 'Please wait...';
  aelf.chain
    .getChainStatus()
    // get instance by GenesisContractAddress
    .then((res) => aelf.chain.contractAt(res.GenesisContractAddress, wallet))
    // return contract's address which you query by contract's name
    .then((zeroC) =>
      zeroC.GetContractAddressByName.call(sha256("AElf.ContractNames.Token"))
    )
    // return contract's instance and you can call the methods on this instance
    .then((tokenAddress) =>
      Promise.all([
        aelf.chain.contractAt(tokenAddress, wallet),
        aelf.chain.contractAt(bingoAddress, wallet, { sync: true }),
      ])
    )
    .then(([tokenContract, bingoGameContract]) => {
      initDomEvent(tokenContract, bingoGameContract);
    })
    .catch((err) => {
      console.log(err);
    });
}

// run program
init();
