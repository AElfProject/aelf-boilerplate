import { Popover, PopoverProps } from 'antd';
import clsx from 'clsx';
import styles from './styles.module.less';
export default function CommonPopover(props: PopoverProps) {
  return <Popover {...props} overlayClassName={clsx(styles['common-popover'], props.overlayClassName)} />;
}
