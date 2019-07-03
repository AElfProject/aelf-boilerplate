/**
 * @file index.js
 * @author hzz780
 */
const AElf = require('aelf-sdk');
const Wallet = AElf.wallet;
const sha256 = AElf.utils.sha256;

// address: 2hxkDg6Pd2d4yU1A16PTZVMMrEDYEPR8oQojMDwWdax5LsBaxX
// sha256(Buffer.from(sha256(wallet.keyPair.pub.encode()), 'hex')).slice(0, 64);
// e0b40ddc3520d0b5363bd9775014d77e4b8fe832946d0e3825731d89127b813a
const defaultPrivateKey = 'bdb3b39ef4cd18c2697a920eb6d9e8c3cf1a930570beb37d04fb52400092c42b';

const wallet = Wallet.getWalletByPrivateKey(defaultPrivateKey);
const aelf = new AElf(new AElf.providers.HttpProvider(
    'http://127.0.0.1:1235/chain',
    null,
    null,
    null,
    [{
        name: 'Accept',
        value: 'text/plain;v=1.0'
    }]
));

const helloWorldContractName = 'HelloWorldContract';
const {
    GenesisContractAddress
} = aelf.chain.getChainStatus();
const zeroC = aelf.chain.contractAt(GenesisContractAddress, wallet);
const helloWorldContractAddress = zeroC.GetContractAddressByName.call(sha256(helloWorldContractName));
const helloWorldC = aelf.chain.contractAt(helloWorldContractAddress, wallet);

// 初始化token合约方法
const tokenAddress = zeroC.GetContractAddressByName.call(sha256('AElf.ContractNames.Token'));
const tokenContract = aelf.chain.contractAt(tokenAddress, wallet);
tokenContract.GetTokenInfo.call({
    symbol: 'BTC'
});

let createTxId = tokenContract.Create({
    symbol: 'BTC',
    tokenName: 'BTC',
    totalSupply: 100000,
    decimals: 2,
    issuer: wallet.address,
    isBurnable: true
});

aelf.chain.getTxResult(createTxId.TransactionId);

// 发行token 给对应地址
tokenContract.Issue({
    symbol: 'BTC',
    amount: 100000,
    memo: '记事本',
    to: helloWorldContractAddress
});

tokenContract.GetBalance.call({
    symbol: 'BTC',
    owner: helloWorldContractAddress
});

helloWorldC.Hello();

// 演示结束

// 1.Good Way; async
// use `call` to get information is always a good way.
helloWorldC.Hello.call((err, result) => {
    console.log('call: ', err, result);
});
// { Value: 'Hello world!' };

// 2.Bay Way; sync
const result = helloWorldC.Hello();
console.log('not call: ', result);
// return demo:
// {
//     TransactionId: 'd40654c3f95a8a1b163f6d8b9112b0b72273ba74d02d2233b0c869db3847e35a'
// }
aelf.chain.getTxResult(result.TransactionId, (err, result) => {
    console.log(err, result);
});
// {
//     ...
//     ReadableReturnValue: '{ "Value": "Hello world!" }',
//     ...
// }
