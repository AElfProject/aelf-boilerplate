import React, { useEffect, useState } from 'react';
import { useAElfReact } from '@aelf-react/core';
import { Card, Button } from 'antd';
import { AElfContextType } from '@aelf-react/core/dist/types';
import styles from './../styles.module.less';
export default function Wallet() {
  const { account, activate, deactivate, connectEagerly, aelfBridges }: AElfContextType = useAElfReact();
  const [chainStatus, setChainStatus] = useState<any>({ message: '尚未初始化' });
  // It will evoke login window if logout when using activate.
  useEffect(() => {
    if (!activate && !account) {
      return;
    }
    activate();
  }, [activate, account]);
  // Use connectEagerly to link wallet quickly and get data.
  // It will throw error and not evoke login window if logout.
  // useEffect(() => {
  //   if (!connectEagerly) {
  //     return;
  //   }
  //   connectEagerly({
  //     AELF: { rpcUrl: 'https://explorer-test.aelf.io/chain', chainId: 'AELF' },
  //   });
  // }, [connectEagerly]);
  return (
    <Card title="wallet operation" bordered={false}>
      current wallet: {account}
      <div className={styles['wallet-operation']}>
        <Button onClick={() => activate()}>Logout</Button>
        <Button onClick={() => deactivate()}>Login</Button>
      </div>
      <div>Chain Info: {JSON.stringify(chainStatus)}</div>
      <Button
        onClick={async () => {
          if (!aelfBridges) {
            alert('Not yet initialized');
            return;
          }
          const chainStatus = await aelfBridges['AELF'].chain.getChainStatus();
          setChainStatus(chainStatus);
        }}>
        Chain Operation - get main chain data
      </Button>
      <Button
        onClick={async () => {
          if (!aelfBridges) {
            alert('Not yet initialized');
            return;
          }
          const chainStatus = await aelfBridges['tDVW'].chain.getChainStatus();
          setChainStatus(chainStatus);
        }}>
        Chain Operation - get side chain data
      </Button>
    </Card>
  );
}
