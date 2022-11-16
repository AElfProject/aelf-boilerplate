import React from 'react';
import { Card } from 'antd';
import styles from './styles.module.less';
import { useLanguage } from 'assets/react-i18next/i18n-hook';
import Wallet from './Wallet';
import MediaQuery from './MediaQuery';
import AxiosDemo from './AxiosDemo';
import { Counter } from './ReduxDemo/Counter';
import Contract from './ContractDemo';
export default function Home() {
  const { t } = useLanguage();
  return (
    <>
      <div className={styles.body}>
        <Wallet />
        <br />
        <Card title="i18n" bordered={false}>
          i18n：{t('Connect')}
          <br />
          If you want to use Sub-path Routing, please change the logic in ./src/i18n/index.ts
        </Card>
        <br />
        <MediaQuery />
        <br />
        <AxiosDemo />
        <br />
        <Counter />
        <br />
        <Contract />
      </div>
    </>
  );
}
