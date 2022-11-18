import { Select, SelectProps } from 'antd';
import clsx from 'clsx';
import IconFont from 'components/IconFont';
import React from 'react';
import styles from './styles.module.less';
export default function CommonSelect({ className, dropdownClassName, ...props }: SelectProps) {
  return (
    <Select
      clearIcon={<IconFont onClick={(e) => e.stopPropagation()} type="ErrorClose" />}
      suffixIcon={<IconFont className="pointer-events-none" type="Search" />}
      getPopupContainer={(triggerNode) => triggerNode}
      dropdownClassName={clsx(styles['select-dropdown'], dropdownClassName)}
      className={clsx(styles.select, className)}
      {...props}
    />
  );
}
