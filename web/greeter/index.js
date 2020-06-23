import AElf from 'aelf-sdk';

const { sha256 } = AElf.utils;

const wallet = AElf.wallet.createNewWallet();

const aelf = new AElf(new AElf.providers.HttpProvider('http://127.0.0.1:1235'));

const greeterContractAddress = '2LUmicHyH4RXrMjG4beDwuDsiWJESyLkgkwPdGTR8kahRzq5XS';

window.greeterContract = null;

async function pollMining(txId, times = 0, delay = 2000, timeLimit = 10) {
    const currentTime = times + 1;
    await new Promise(resolve => {
        setTimeout(() => {
            resolve();
        }, delay);
    });
    let tx;
    try {
        tx = await aelf.chain.getTxResult(txId);
    } catch (e) {
        if (e.Status) {
            return e;
        }
        throw new Error('Network Error');
    }
    if (tx.Status === 'PENDING' && currentTime <= timeLimit) {
        const result = await pollMining(txId, currentTime, delay, timeLimit);
        return result;
    }
    if (tx.Status === 'PENDING' && currentTime > timeLimit) {
        return tx;
    }
    if (tx.Status === 'MINED') {
        return tx;
    }
    return tx;
}

async function getGreeterContract(walletInstance) {
    if (!window.greeterContract) {
        window.greeterContract = await aelf.chain.contractAt(greeterContractAddress, walletInstance);
    }
    return window.greeterContract;
}

function initDomEvent() {
    const refresh = document.getElementById('refresh');
    const chainInfo = document.getElementById('chaininfo');
    const greet = document.getElementById('greet');
    const greetResponse = document.getElementById('greetResponse');
    const greetToButton = document.getElementById('greetToButton');
    const getGreeted = document.getElementById('getGreeted');

    refresh.onclick = () => {
        aelf.chain.getChainStatus()
            .then(res => {
                if (!res) {
                    throw new Error('Error occurred when getting chain status');
                }
                chainInfo.innerHTML = JSON.stringify(res, undefined, 2);
            })
            .catch(err => {
                console.log(err);
            });
    };

    greet.onclick = () => {
        getGreeterContract(wallet)
            .then(greeterContract => greeterContract.Greet.call())
            .then(ret => {
                greetResponse.innerHTML = JSON.stringify(ret, null, 2);
            })
            .catch(err => {
                console.log(err);
            });
    };

    greetToButton.onclick = () => {
        const nameToGreet = document.getElementById('nameToGreet');
        const greetToResponse = document.getElementById('greetToResponse');

        getGreeterContract(wallet)
            .then(greeterContract => greeterContract.GreetTo({
                value: nameToGreet.value
            }))
            .then(tx => pollMining(tx.TransactionId))
            .then(ret => {
                const returnValue = window.greeterContract.GreetTo.unpackOutput(ret.ReturnValue);
                greetToResponse.innerHTML = returnValue.name;
            })
            .catch(err => {
                console.log(err);
            });
    };

    getGreeted.onclick = () => {
        const greeted = document.getElementById('greeted');

        getGreeterContract(wallet)
            .then(greeterContract => greeterContract.GetGreetedList.call())
            .then(ret => {
                greeted.innerHTML = JSON.stringify(ret, null, 2);
            })
            .catch(err => {
                console.log(err);
            });
    };
}

// run the Greeter front end
window.onload = () => {
    initDomEvent();
};
