import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import styles from './styles.module.less';

const LinkComponent = ({ children, skipLocaleHandling, ...rest }: any) => {
  const router = useRouter();
  const locale = rest.locale || router.query.locale || '';

  let href = rest.href || router.asPath;
  if (href.indexOf('http') === 0) skipLocaleHandling = true;
  if (locale && !skipLocaleHandling) {
    href = href ? `/${locale}${href}` : router.pathname.replace('[locale]', locale);
  }

  return (
    <>
      <Link href={href}>
        <span {...rest} className={styles['link-title']}>
          {children}
        </span>
      </Link>
    </>
  );
};

export default LinkComponent;
