import React from 'react';
import { Card } from 'antd';
import useMediaQueries from '../../../hooks/useMediaQueries';
export default function MediaQuery() {
  // xs: 370,
  // md: 580,
  // xl: 942,
  // xxl: 1160,
  const isXs = useMediaQueries('xs');
  const isMd = useMediaQueries('md');
  const isXl = useMediaQueries('xl');
  const isXxl = useMediaQueries('xxl');
  return (
    <Card title="媒体查询 - 变动页面大小" bordered={false}>
      媒体查询：
      {isXs && 'Is XS'}
      {isMd && 'Is Middle'}
      {isXl && 'Is XL'}
      {isXxl && 'Is XXL'}
      {!isXs && !isMd && !isXl && !isXxl && 'more than XXL'}
    </Card>
  );
}
