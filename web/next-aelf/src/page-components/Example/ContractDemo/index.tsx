import { Card } from 'antd';
import { useEffect, useState } from 'react';
// just fetch api once in strict mode when using `react-query`
import { useQuery } from 'react-query';
import { getBalance, getContractInstance, getTokenContractAddress, getTransactionId } from 'utils/contractInstance';

const fetchAddress = async () => {
  const address = await getTokenContractAddress();
  return address;
};
export default function ContractDemo() {
  const [balance, setBalance] = useState('');
  const [transactionId, setTransactionId] = useState('');
  const { data: tokenContractAddress } = useQuery('address', fetchAddress);
  const getInfo = async () => {
    if (!tokenContractAddress) return;
    const tokenContract = await getContractInstance(tokenContractAddress);
    Promise.allSettled([getBalance(tokenContract), getTransactionId(tokenContract)]).then((results) => {
      if (results[0].status === 'fulfilled') {
        setBalance(JSON.stringify(results[0].value));
      }
      if (results[1].status === 'fulfilled') {
        setTransactionId(results[1].value);
      }
    });
  };

  useEffect(() => {
    getInfo();
  }, [tokenContractAddress]);

  return (
    <Card title="get contract">
      <div>address: {tokenContractAddress}</div>
      <div>balance: {balance}</div>
      <div>transactionId: {transactionId}</div>
    </Card>
  );
}
