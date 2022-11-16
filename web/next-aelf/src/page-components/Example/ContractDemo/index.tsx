import { Card } from 'antd';
import { useEffect, useState } from 'react';
// just fetch api once in strict mode when using `react-query`
import { useQuery } from 'react-query';
import { getContractInstance, getTokenContractAddress } from 'utils/contractInstance';

const fetchAddress = async () => {
  const address = await getTokenContractAddress();
  return address;
};
export default function ContractDemo() {
  const [tokenContract, setTokenContract] = useState('');

  const { data: tokenContractAddress } = useQuery('address', fetchAddress);
  const getContract = async () => {
    if (!tokenContractAddress) return;
    const instance = await getContractInstance(tokenContractAddress);
    setTokenContract(instance);
    console.log('tokenContract:', instance);
  };
  useEffect(() => {
    getContract();
  }, [tokenContractAddress]);

  return (
    <Card title="get contract">
      <div>address: {tokenContractAddress}</div>
      <div>if you want to get contract pls【view console】</div>
    </Card>
  );
}
