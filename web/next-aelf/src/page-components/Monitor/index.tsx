import React from 'react';
import { setEvent } from 'utils/firebase';
import styles from './styles.module.less';
export default function SentryDemo() {
  const sendBthContent = () => {
    setEvent('select_content', {
      content_type: 'btn',
    });
  };
  return (
    <>
      <div className={styles.body}>
        Monitor Demo
        <div>
          <button
            className={styles['sentry-btn']}
            type="button"
            onClick={() => {
              throw new Error('Sentry Frontend Error');
            }}>
            Throw error reporting to Sentry
          </button>
          View Results:{' '}
          <a target="_blank" href="https://sentry.io/">
            here
          </a>
        </div>
        <div>
          <button className={styles['firebase-btn']} type="button" onClick={() => sendBthContent()}>
            Report to Firebase
          </button>
          View Results:{' '}
          <a
            target="_blank"
            href="https://console.firebase.google.com/?utm_source=firebase.google.com&utm_medium=referral">
            here
          </a>
        </div>
      </div>
    </>
  );
}
