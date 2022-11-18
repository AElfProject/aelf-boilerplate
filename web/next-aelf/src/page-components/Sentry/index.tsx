import React from 'react';
import styles from './styles.module.less';
export default function SentryDemo() {
  return (
    <>
      <div className={styles.body}>
        Sentry Demo
        <button
          className={styles['sentry-btn']}
          type="button"
          onClick={() => {
            throw new Error('Sentry Frontend Error');
          }}>
          Throw error
        </button>
      </div>
    </>
  );
}
