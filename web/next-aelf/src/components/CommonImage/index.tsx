import clsx from 'clsx';
import Image, { ImageProps } from 'next/image';
import styles from './styles.module.less';
export default function CommonImage({ className, style, layout = 'fill', alt = 'img', ...props }: ImageProps) {
  return (
    <div className={clsx(styles['common-img'], className)} style={style}>
      <Image {...props} layout={layout} alt={alt} />
    </div>
  );
}
