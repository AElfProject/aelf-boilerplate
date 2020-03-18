
import AElf from 'aelf-sdk';

const { sha256 } = AElf.utils;

const wallet = AElf.wallet.createNewWallet();

const aelf = new AElf(new AElf.providers.HttpProvider('http://127.0.0.1:1235'));

//if (!aelf.isConnected()) {
//  alert('Blockchain Node is not running.');
//}

var pollMining = async function(transactionId) {
    console.log(`>> Waiting for ${transactionId} the transaction to be mined.`);
  
    for (var i = 0; i < 10; i++) {
        const currentResult = await aelf.chain.getTxResult(transactionId);
        // console.log('transaction status: ' + currentResult.Status);
  
        if (currentResult.Status === 'MINED')
            return currentResult;
  
        await new Promise(resolve => setTimeout(resolve, 2000))
        .catch(function () {
            console.log("Promise Rejected");
       });;
    }
  }

function initDomEvent() {
    const send = document.getElementById('send');
    const refresh = document.getElementById('refresh');
    const chainInfo = document.getElementById('chaininfo');
    const greet = document.getElementById('greet');
    const greetResponse = document.getElementById('greetResponse');
    const greetToButton = document.getElementById('greetToButton');
    const getGreeted = document.getElementById('getGreeted');

    refresh.onclick = () => {
        aelf.chain.getChainStatus()
        // get instance by GenesisContractAddress
        .then(res => chainInfo.innerHTML = JSON.stringify(res, undefined, 2))
        .catch(err => {
            console.log(err);
        });
    }

    greet.onclick = () => { 
        aelf.chain.getChainStatus()
        .then(res => aelf.chain.contractAt(res.GenesisContractAddress, wallet))
        .then(zeroC => zeroC.GetContractAddressByName.call(sha256('AElf.ContractNames.Greeter')))
        .then(greeterAddress => aelf.chain.contractAt(greeterAddress, wallet))
        .then(greeterContract => greeterContract.Greet.call())
        .then(ret => greetResponse.innerHTML = JSON.stringify(ret))
        .catch(err => {
            console.log(err);
        });
    };

    greetToButton.onclick = () => {
        const nameToGreet = document.getElementById('nameToGreet');
        const greetToResponse = document.getElementById('greetToResponse');
        console.log(nameToGreet.value);

        aelf.chain.getChainStatus()
        .then(res => aelf.chain.contractAt(res.GenesisContractAddress, wallet))
        .then(zeroC => zeroC.GetContractAddressByName.call(sha256('AElf.ContractNames.Greeter')))
        .then(greeterAddress => aelf.chain.contractAt(greeterAddress, wallet))
        .then(greeterContract => greeterContract.GreetTo({ value: nameToGreet.value }))
        .then(tx => pollMining(tx.TransactionId))
        .then(ret => greetToResponse.innerHTML = ret.ReadableReturnValue)
        .catch(err => {
            console.log(err);
        });
    };

    getGreeted.onclick = () => {
        const greeted = document.getElementById('greeted');

        aelf.chain.getChainStatus()
        .then(res => aelf.chain.contractAt(res.GenesisContractAddress, wallet))
        .then(zeroC => zeroC.GetContractAddressByName.call(sha256('AElf.ContractNames.Greeter')))
        .then(greeterAddress => aelf.chain.contractAt(greeterAddress, wallet))
        .then(greeterContract => greeterContract.GetGreetedList.call())
        .then(ret => greeted.innerHTML = JSON.stringify(ret))
        .catch(err => {
            console.log(err);
        });

    };

}

function init() {
    initDomEvent();
}

// run the Greeter front end
init();