/**
 * @file index.js
 * @author huangzongzhe
 * @description How to use the plugin for hello world
*/

const helloWorldAddress = '4QjhKLWacRXrQYpT7rzf74k5XZFCx8yF3X7FXbzKD4wwEo6';

let wallet;
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

// 1.A way.
// document.addEventListener('NightElf', result => {});
// 2.The better way.
nightElfCheck.check.then(message => {

    console.log('nightElfCheck result', message);
    alert(message);

    const aelf = new window.NightElf.AElf({
        // Enter your test address in this location
        httpProvider: 'http://127.0.0.1:1728/chain',
        appName
    });

    const getChainInformation = document.getElementById('get-chain-information');
    getChainInformation.onclick = () => {
        aelf.chain.getChainInformation((error, result) => {
            console.log('>>>>>>>>>>>>> getChainInformation >>>>>>>>>>>>>');
            console.log(error, result);
        });
    };

    const login = document.getElementById('login');
    login.onclick = () => {
        console.log('login....');

        aelf.login({
            appName,
            chainId: 'AELF',
            payload: {
                method: 'LOGIN',
                contracts: [{
                    chainId: 'AELF',
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
        aelf.chain.contractAtAsync(
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
        window.helloWorldC.Hello.call((err, result) => {
            console.log(err, result);
            alert(result.Value);
        });
    };  
}).catch(error => {
    alert(error.message);
});
