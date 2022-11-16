import React, { useEffect, useState } from 'react';
import { useAElfReact } from '@aelf-react/core';
import { Card, Button } from 'antd';
import { AElfContextType } from '@aelf-react/core/dist/types';
import styles from './../styles.module.less';
export default function Wallet() {
  const { account, activate, deactivate, connectEagerly, aelfBridges }: AElfContextType = useAElfReact();
  const [chainStatus, setChainStatus] = useState<any>({ message: '尚未初始化' });
  // 使用activate 链接钱包, 如果钱包没有登录，会唤起钱包登录窗口
  useEffect(() => {
    if (!activate && !account) {
      return;
    }
    activate();
  }, [activate, account]);
  // 使用connectEagerly 快速链接钱包，获取钱包数据, 如果钱包没有登录，会抛出error，不会唤起登录窗口
  // useEffect(() => {
  //   if (!connectEagerly) {
  //     return;
  //   }
  //   connectEagerly({
  //     AELF: { rpcUrl: 'https://explorer-test.aelf.io/chain', chainId: 'AELF' },
  //   });
  // }, [connectEagerly]);
  return (
    <Card title="钱包操作" bordered={false}>
      当前钱包： {account}
      <div className={styles['wallet-operation']}>
        <Button onClick={() => activate()}>登录</Button>
        <Button onClick={() => deactivate()}>登出</Button>
      </div>
      <div>Chain Info: {JSON.stringify(chainStatus)}</div>
      <Button
        onClick={async () => {
          if (!aelfBridges) {
            alert('尚未初始化');
            return;
          }
          const chainStatus = await aelfBridges['AELF'].chain.getChainStatus();
          setChainStatus(chainStatus);
        }}>
        链操作 - 获取主链数据
      </Button>
      <Button
        onClick={async () => {
          if (!aelfBridges) {
            alert('尚未初始化');
            return;
          }
          const chainStatus = await aelfBridges['tDVW'].chain.getChainStatus();
          setChainStatus(chainStatus);
        }}>
        链操作 - 获取侧链数据
      </Button>
    </Card>
  );
}
