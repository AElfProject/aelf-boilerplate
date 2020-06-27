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

const ELF = "ELF";
const tokenContractNamespace = "AElf.ContractNames.Token";
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
  const prize = document.getElementById("prize");
  const lastBetType = document.getElementById("last-bet-type");
  const lastBetAmount = document.getElementById("last-bet-amount");
  const play = document.getElementById("play");
  const buttonBox = document.querySelector("#button-box");
  const balanceInput = document.getElementById("balance-input");

  let txId = 0;
  const betTypeMap = { small: 1, big: 2 };
  let betType;
  const betTypeSwitch = document.querySelector("#small-big");
  const nav = document.querySelector("nav");
  const childSelector = document.querySelector("#child-selector");

  const betCntMax = 50;
  const playBingoInterval = 30;

  // when input text change, whether play button is active
  balanceInput.oninput = () => {
    if (isNaN(Number(balance.innerHTML))) {
      play.classList.remove("active");
      return;
    }
    // const reg = /^[1-9]\d*$/;
    const reg_special = /^[1-9]\d*e\d*$/; // get rid of scientific number e.g. "2e3" deemed as 2000
    if (balanceInput.value == '' || reg_special.test(balanceInput.value)||isNaN(Number(balanceInput.value))) {
      document.querySelector("#input-alert").innerText =
        "* Please input valid number !!";
      play.classList.remove("active");
      return;
    } else if (balanceInput.value > balance.innerText) {
      document.querySelector("#input-alert").innerText =
        "* Betting number exceeds your current balance !!";
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
    tokenContract.GetBalance.call({
      symbol: ELF,
      owner: wallet.address,
    })
      .then((result) => {
        balance.innerHTML = Number(result.balance).toFixed(2);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  async function getAllowanceAmount() {
    allowanceWeb.innerHTML = Number(
      (
        await tokenContract.GetAllowance.call({
          symbol: ELF,
          owner: wallet.address,
          spender: bingoGameContract.address,
        })
      ).allowance
    ).toFixed(2);
  }

  async function getUnBingoBouts() {
    return await bingoGameContract.GetPlayerInformation.call(wallet.address);
  }
  async function getBingoBouts() {
    return await bingoGameContract.GetPlayerInformationCompleted.call(
      wallet.address
    );
  }

  async function refreshBet(){
    let unBingoBouts = (await getUnBingoBouts()).bouts;
    let bingoBouts = (await getBingoBouts()).bouts;

    let lottery = document.querySelector("#lottery ul");
    lottery.innerHTML = "";
    let unBingo = document.querySelector("#waiting-for-draw ul");
    unBingo.innerHTML = "";

    // refresh Lottery
    let lotteryCnt =  bingoBouts.length >= betCntMax ? betCntMax : bingoBouts.length
    for(let i = 1; i <= lotteryCnt; i++){
      let bingoBout = bingoBouts[bingoBouts.length - i];
      let bingoPlayTime = new Date();
      bingoPlayTime.setTime(Number(bingoBout.betTime.seconds) * 1000);

      lottery.innerHTML += `<li>
                            <div>
                              <div>
                                <p name="outcome" class="${Number(bingoBout.award) > 0 ? "is-win" : ""}">${Number(bingoBout.award) > 0 ? "WIN" : "LOSE"}</p>
                                <p name="amount">${bingoBout.award}<span>    AEUSD</span></p>
                              </div>
                              <p><span>Bet Type:</span> ${bingoBout.boutType == "1" ? "SMALL" : "BIG"}</p>
                              <p><span>Bet Amount:</span> ${bingoBout.amount}</p>
                              <p><span>Time:</span> ${bingoPlayTime.toLocaleString()}</p>
                              <p><span>Draw Type:</span> Middle</p>
                              <p>
                                <span>Tx Id:</span>    ${bingoBout.playId}
                              </p>
                            </div>
                          </li>`
    }

    // refresh unBingo
    let unBingoCnt =  unBingoBouts.length >= betCntMax ? betCntMax : unBingoBouts.length
    for(let i = 1; i <= unBingoCnt; i++){
      let unBingoBout = unBingoBouts[unBingoBouts.length - i];
      let unBingoPlayTime = new Date();
      unBingoPlayTime.setTime(Number(unBingoBout.betTime.seconds) * 1000);

      unBingo.innerHTML += `<li>
                              <div>
                                <p><span>Bet Type:</span> ${unBingoBout.boutType == "1" ? "SMALL" : "BIG"}</p>
                                <p><span>Bet Amount:</span> ${unBingoBout.amount}</p>
                                <p><span>Time:</span> ${unBingoPlayTime.toLocaleString()}</p>
                                <p>
                                  <span>Tx Id:</span>
                                  ${unBingoBout.playId}
                                </p>
                              </div>
                            </li>`

    }

    // determine which "No Txs" on Bet page should stop displaying
    if(lotteryCnt != 0){
      document.querySelectorAll("#bet-result .no-txs")[0].style.display = "none";
    } else {
      document.querySelectorAll("#bet-result .no-txs")[0].style.display = "block";
    }

    if(unBingoCnt != 0){
      document.querySelectorAll("#bet-result .no-txs")[1].style.display = "none";
    } else {
      document.querySelectorAll("#bet-result .no-txs")[1].style.display = "block";
    }
  }


  function getPrize() {
    tokenContract.GetBalance.call({
      symbol: ELF,
      owner: bingoGameContract.address,
    }).then((result) => {
      prize.innerHTML = Number(result.balance).toFixed(2);
    });
  }
  function getLastBet() {
    getBingoBouts().then((info) => {
      console.log(info);
      lastBetType.innerHTML =
        info.bouts[info.bouts.length - 1].boutType == "1" ? "SMALL" : "BIG";
      lastBetAmount.innerHTML = Number(
        info.bouts[info.bouts.length - 1].amount
      ).toFixed(2);
    });
  }

  // display "No Txs" on Bet page when bouts info not generated or all of them are eliminated
  document.querySelectorAll("#bet-result .no-txs").forEach(e => {
    e.style.display = "block";
  })

  // display balance, allowance, prize pool, and last bet
  // balance
  getBalance();
  // allowance
  getAllowanceAmount();
  // prize
  getPrize();
  // last bet
  getLastBet();

  // refresh bet page
  refreshBet();

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

  // switch nav
  nav.onclick = (e) => {
    Array.from(e.currentTarget.children).forEach((ele) => {
      ele.classList.remove("active");
    });
    e.target.classList.add("active");
    
    if(e.target.innerHTML == "Home"){
      document.querySelector("#bingo-body").style.display = "flex";
      document.querySelector("#bet-result").style.display = "none";
    } else if(e.target.innerHTML == "Bet"){
      document.querySelector("#bingo-body").style.display = "none";
      document.querySelector("#bet-result").style.display = "flex";
    } else if(e.target.innerHTML == "Me"){
      document.querySelector("#bingo-body").style.display = "none";
      document.querySelector("#bet-result").style.display = "none";
    }

  };

  //switch child selector if it displays
  childSelector.onclick = (e) => {
    Array.from(e.currentTarget.children).forEach((ele) => {
      ele.classList.remove("active");
    });
    e.target.classList.add("active");
    
    if(e.target.innerHTML == "Lottery"){
      document.querySelector("#lottery").style.display = "block";
      document.querySelector("#waiting-for-draw").style.display = "none";
    } else if(e.target.innerHTML == "Waiting for Draw"){
      document.querySelector("#lottery").style.display = "none";
      document.querySelector("#waiting-for-draw").style.display = "block";
    } 
  };

  // click button to change the number of bets
  buttonBox.onclick = (e) => {
    if (isNaN(Number(balance.innerHTML))) {
      play.classList.remove("active");
      return;
    }
    let value;
    switch (e.toElement.innerText) {
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
      // 1 elf can be divided into 10**8 parts
      buyAmount: (+balanceInput.value).toFixed(8),
      buyType: betType,
      tokenSymbol: ELF,
    };

    // get allowance
    const allowance = await tokenContract.GetAllowance.call({
      symbol: ELF,
      owner: wallet.address,
      spender: bingoGameContract.address,
    });

    console.log("allowance", allowance.allowance);

    if (allowance.allowance < +balanceInput.value) {
      // approve some elf
      const approveTxId = await tokenContract.Approve({
        symbol: ELF,
        spender: bingoGameContract.address,
        amount: +balanceInput.value,
      });

      // check approve result, in every second
      let approveResult;
      let approveCheckTimeout = setTimeout(async function f() {
        approveResult = await aelf.chain.getTxResult(approveTxId.TransactionId);
        console.log("approving", approveResult.Status);
        if (approveResult.Status == "MINED") {
          clearTimeout(approveCheckTimeout);
          console.log("allowance new", allowance.allowance);

          playBingo(playInput);
        } else {
          setTimeout(f, 1000);
        }
      }, 1000);
    } else {
      playBingo(playInput);
    }
  };

  async function playBingo(playInput) {
    let playTxId = await bingoGameContract.Play(playInput);

    // stop displaying waiting spinner... reset the input
    document.querySelector("#spinner-container").style.display = "none";
    balanceInput.value = "";
    play.classList.remove("active");

    console.log("============ play bingo ==============");

    let playResult;

    let playCheckTimeout = setTimeout(async function f() {
      playResult = await aelf.chain.getTxResult(playTxId.TransactionId);
      console.log("playing", playResult.Status);
      if (playResult.Status == "MINED") {
        // clearInterval(playCheckInterval);
        console.log("play result", playResult);

        // set a 30s timeout api for bingo
        console.log("wait for 30s.......");
        setTimeout(() => {
          bingoGameContract.Bingo(playTxId.TransactionId).then((r) => {
            console.log("bingoTxId", r.TransactionId);

            // check if bingo finished
            let bingoResult;
            let bingoCheckTimeout = setTimeout(async function g() {
              bingoResult = await aelf.chain.getTxResult(r.TransactionId);
              console.log("bingo", bingoResult.Status);
              if (bingoResult.Status == "MINED") {
                console.log("bingo result", bingoResult);

                console.log(
                  bingoGameContract.Bingo.unpackOutput(bingoResult.ReturnValue)
                );

                clearTimeout(bingoCheckTimeout);
                // change the balance
                getBalance();
                // prize
                getPrize();
                // last bet
                getLastBet();

                // change bet page state after BINGO
                refreshBet()

              } else {
                setTimeout(g, 1000);
              }
            }, 1000);
          });
        }, playBingoInterval * 1000);
        clearTimeout(playCheckTimeout);

        // change allowance amount on web
        getAllowanceAmount();

        // change bet page state after PLAY
        refreshBet()

      } else {
        setTimeout(f, 1000);
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
      zeroC.GetContractAddressByName.call(sha256(tokenContractNamespace))
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
