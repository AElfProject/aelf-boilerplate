import styles from './styles.module.less';
// import clsx from 'clsx';
import useMediaQueries from 'hooks/useMediaQueries';

function FooterMD() {
  return <div>Medium Footer in Phone and Pad</div>;
}

function FooterPC() {
  return <div>Footer in PC</div>;
}

export default function Footer() {
  const isMd = useMediaQueries('md');

  return (
    <div className={styles['footer-container']}>
      <div className={styles.footer}>{!isMd ? <FooterPC /> : <FooterMD />}</div>
    </div>
  );
}
