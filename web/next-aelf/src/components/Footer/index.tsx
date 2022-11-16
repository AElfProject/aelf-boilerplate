import styles from './styles.module.less';
// import clsx from 'clsx';
import useMediaQueries from 'hooks/useMediaQueries';

function FooterMD() {
  return <div>中等Footer, 手机端, Pad端</div>;
}

function FooterPC() {
  return <div>PC端 Footer</div>;
}

export default function Footer() {
  const isMd = useMediaQueries('md');

  return (
    <div className={styles['footer-container']}>
      <div className={styles.footer}>{!isMd ? <FooterPC /> : <FooterMD />}</div>
    </div>
  );
}
