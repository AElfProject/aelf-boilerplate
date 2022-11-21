import React from 'react';
import Link from 'next/link';
import styles from './styles.module.less';
export default function Home() {
  return (
    <div className={styles.body}>
      <Link href={`/example`}>
        <a>Framework Usage - demo code</a>
      </Link>
      <br />
      <Link href={`/micro-app`}>
        <a>Micro Frontends - Micro-APP</a>
      </Link>
      <br />
      <Link href={`/monitor`}>
        <a>Monitor - Sentry & Firebase</a>
      </Link>
    </div>
  );
}
