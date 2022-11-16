import { ConfigProvider } from 'antd';
import { prefixCls } from 'constants/misc';
import { AElfReactProvider } from '@aelf-react/core';
import type { ReactNode } from 'react';
import { initLanguage } from 'assets/react-i18next';
import { useLanguage } from 'assets/react-i18next/i18n-hook';
import { ANTD_LOCAL } from 'assets/react-i18next/config';
ConfigProvider.config({ prefixCls });
initLanguage(localStorage);
export default function ProviderBasic({ children }: { children: ReactNode }) {
  const { language } = useLanguage();
  return (
    <ConfigProvider autoInsertSpaceInButton={false} prefixCls={prefixCls} locale={ANTD_LOCAL[language]}>
      <AElfReactProvider
        appName="example"
        nodes={{
          AELF: { rpcUrl: 'https://explorer-test.aelf.io/chain', chainId: 'AELF' },
          tDVW: { rpcUrl: 'https://explorer-test-side02.aelf.io/chain', chainId: 'tDVW' },
        }}>
        {children}
      </AElfReactProvider>
    </ConfigProvider>
  );
}
