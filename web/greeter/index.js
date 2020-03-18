
import AElf from 'aelf-sdk';

const { sha256 } = AElf.utils;

const wallet = AElf.wallet.createNewWallet();

const aelf = new AElf(new AElf.providers.HttpProvider('http://127.0.0.1:1235'));

//if (!aelf.isConnected()) {
//  alert('Blockchain Node is not running.');
//}

function initDomEvent() {
    const send = document.getElementById('send');
    const refresh = document.getElementById('refresh');
    const chainInfo = document.getElementById('chaininfo');

    refresh.onclick = () => {
        aelf.chain.getChainStatus()
        // get instance by GenesisContractAddress
        .then(res => chainInfo.innerHTML = JSON.stringify(res, undefined, 2))
        .catch(err => {
            console.log(err);
        });
    }

}

function init() {
    initDomEvent();
}

// run the Greeter front end
init();