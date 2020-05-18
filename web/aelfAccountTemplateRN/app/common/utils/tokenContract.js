import {unitConverter} from './unitConverter';
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
    allowance = unitConverter.toLower(res.allowance,8);

    if(allowance !== -1 && allowance < 500){
      await tokenContract.Approve({
        symbol : tokenSymbol,
        spender: appContractAddress,
        amount : 100000000000,
      });
    }

    // console.log('token allowance:', res, allowance, allowance < 500, approveLock);
    await sleep(3000);
    // console.log('sleep', approveLock);
    approveLock = false;
  } catch (error) {
    await sleep(3000);
    approveLock = false;
    console.log(error);
  }
};
