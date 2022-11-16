import React from 'react';
import styles from './styles.module.less';
import { useLanguage } from 'assets/react-i18next/i18n-hook';
export default function MicroApp() {
  const { t } = useLanguage();
  return (
    <>
      <div className={styles.body}>Micro-APP Demo</div>
    </>
  );
}
