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
          i18n：{t('translation.connect')}
          <br />
          If you want to change next-export-i18n config, please change the logic in ./i18n/index.ts
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
