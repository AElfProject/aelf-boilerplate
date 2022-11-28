import { Card } from 'antd';
import { useEffect, useState } from 'react';
import { ISSRDataProps } from '../types';
import { get } from '../../../utils/axios';

export default function ShowSSRData(props: ISSRDataProps) {
  const [blockHeight, setBlockHeight] = useState(props.datassr);

  useEffect(() => {
    const getBlockHeight = async () => {
      const data = await get('blockChain/blockHeight');
      setBlockHeight(data);
    };
    if (!blockHeight) {
      getBlockHeight();
    }
  }, [blockHeight]);
  return <Card>ssr data: {blockHeight}</Card>;
}
