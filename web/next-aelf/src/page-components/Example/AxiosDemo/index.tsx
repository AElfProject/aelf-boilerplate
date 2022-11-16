import React from 'react';
import { Card, Button } from 'antd';
import useAxios from 'axios-hooks';
import { API, useAxiosTDVW } from '../../../utils/axios';
export default function AxiosDemo() {
  const [{ data: autoData, loading: autoLoading, error: autoError }] = useAxios(API.GET.BLOCK_HEIGHT);
  const [{ data: manualData, loading: manualLoading, error: manualError }, manualExecute] = useAxios(
    API.GET.BLOCK_HEIGHT,
    {
      manual: true,
    },
  );
  const [{ data: dataTDVW, loading: loadingTDVW, error: errorTDVW }, executeTDVW] = useAxiosTDVW(API.GET.BLOCK_HEIGHT, {
    manual: true,
  });

  if (autoError || manualError || errorTDVW) {
    return (
      <Card title="Axios hooks" bordered={false}>
        Error: {JSON.stringify(autoError || manualError)}
      </Card>
    );
  }
  return (
    <Card title="Axios hooks" bordered={false}>
      自动查询的数据：{autoLoading ? 'loading' : autoData}
      <br />
      <Button onClick={manualExecute}>手动查询</Button>
      手动查询的数据：{manualLoading ? 'loading' : manualData}
      <br />
      <Button onClick={executeTDVW}>手动调用另一个Axios实例</Button>
      另一个Axios实例：{loadingTDVW ? 'loading' : dataTDVW}
    </Card>
  );
}
