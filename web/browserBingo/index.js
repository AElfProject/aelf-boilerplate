/**
 * @file index.js
 * @author zmh3788
 * @description none
*/

import AElf from 'aelf-sdk';
const sha256 = AElf.utils.sha256;
const defaultPrivateKey = 'a59c14882c023d63e84e5faf36558fdc8dbf1063eed45ce7e507f1cd9bcde1d9';
const wallet = AElf.wallet.getWalletByPrivateKey(defaultPrivateKey);

const aelf = new AElf(new AElf.providers.HttpProvider('http://127.0.0.1:1235'));

if (!aelf.isConnected()) {
    alert('Blockchain Node is not running.');
}

async function init() {
    const {
        GenesisContractAddress
    } = await aelf.chain.getChainStatus();
    const zeroC = await aelf.chain.contractAt(GenesisContractAddress, wallet);

    const multiTokenAddress = await zeroC.GetContractAddressByName.call(sha256('AElf.ContractNames.Token'));
    const bingoGameAddress = await zeroC.GetContractAddressByName.call(sha256('AElf.ContractNames.BingoGameContract'));


    const multiTokenContract = await aelf.chain.contractAt(multiTokenAddress, wallet);
    const bingoGameContract = await aelf.chain.contractAt(bingoGameAddress, wallet);
    return {
        multiTokenContract,
        bingoGameContract
    };
}

init().then(res => {
    const  {
        multiTokenContract,
        bingoGameContract
    } = res;
    const register = document.getElementById('register');
    const balance = document.getElementById('balance');
    const siteBody = document.getElementById('site-body');
    const play = document.getElementById('play');
    const bingo = document.getElementById('bingo');
    const button = document.getElementsByClassName('button');
    const balanceInput = document.getElementById('balance-input');
    const loader = document.getElementById('loader');
    let itemBalance = 0;
    let txId = 0;

    function getBalance() {
        const payload = {
            symbol: 'CARD',
            owner: wallet.address
        };
        multiTokenContract.GetBalance.call(payload, (error, result) => {
            if (result) {
                itemBalance = result.balance;
                balance.innerHTML = itemBalance;
            }
        });
    }

    register.onclick = function () {
        bingoGameContract.Register((error, result) => {
            alert('恭喜你注册成功！');
            siteBody.style.display = 'block';
            register.style.display = 'none';
            getBalance();
        });
    };

    button[0].onclick = function () {
        balanceInput.value = 3000;
    };

    button[1].onclick = function () {
        balanceInput.value = 5000;
    };

    button[2].onclick = function () {
        balanceInput.value = parseInt(itemBalance / 2, 10);
    };

    button[3].onclick = function () {
        balanceInput.value = parseInt(itemBalance, 10);
    };

    play.onclick = function () {
        let reg = /^[1-9]\d*$/;
        const value = balanceInput.value;
        if (reg.test(parseInt(value, 10))) {
            bingoGameContract.Play({value}, (error, result) => {
                if (result) {
                    console.log(result);
                    play.style.display = 'none';
                    loader.style.display = 'inline-block';
                    txId = result.TransactionId;
                    setTimeout(() => {
                        bingo.style.display = 'inline-block';
                        loader.style.display = 'none';
                    }, 20000);
                    alert('耐心等待20s，出现Bingo按钮后点击查看开奖结果！');
                }
            });
        }
        else {
            alert('请输入大于0的正整数！');
        }
    };

    bingo.onclick = function () {
        bingoGameContract.Bingo(txId, (error, result) => {
            if (result) {
                setTimeout(() => {
                    getBalance();
                    play.style.display = 'inline-block';
                    bingo.style.display = 'none';

                }, 4000);
                alert('等待4s, 查看余额变化！');
            }
        });
    };
    getBalance();
});
