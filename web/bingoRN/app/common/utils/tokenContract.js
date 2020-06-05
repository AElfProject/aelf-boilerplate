import {unitConverter} from './unitConverter';
import {config} from './config';
const {tokenDecimalFormat, tokenDecimal} = config;
let approveLock = false;

function sleep(sleepTime) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, sleepTime);
  });
}

module.exports.approveApp = async (tokenContract, tokenSymbol, userAddress, appContractAddress) => {
  if (approveLock) {
    return;
  }
  approveLock = true;

  let allowance = -1;
  try {
    const res = await tokenContract.GetAllowance.call({
      symbol : tokenSymbol,
      owner : userAddress,
      spender: appContractAddress
    });
    allowance = unitConverter.toLower(res.allowance, tokenDecimal);
    if(allowance !== -1 && allowance < 50000){
      const tx = await tokenContract.Approve({
        symbol : tokenSymbol,
        spender: appContractAddress,
        amount : 50000 * tokenDecimalFormat,
      });
      console.log('approveApp tx', tokenSymbol, appContractAddress, tokenDecimalFormat, tx);
    }

    // console.log('token allowance:', res, allowance, allowance < 500, approveLock);
    await sleep(3000);
    // console.log('sleep', approveLock);
    approveLock = false;
  } catch (error) {
    console.log('approveApp res:', error);
    await sleep(3000);
    approveLock = false;
    console.log(error);
  }
};
