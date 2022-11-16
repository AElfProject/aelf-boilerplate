import type { AppProps } from 'next/app';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import '../styles/globals.less';
import '../styles/common.less';
import '../styles/antd.less';
import Header from 'components/Header';
import dynamic from 'next/dynamic';
import PageHead from 'components/PageHead';
import { Provider as ReduxProvider } from 'react-redux';
import microApp from '@micro-zoe/micro-app';

import { store } from '../redux/store';
import Footer from '../components/Footer';
import initAxios from '../utils/axios';
const Provider = dynamic(import('hooks/Providers/ProviderBasic'), { ssr: false });
import { QueryClientProvider, QueryClient } from 'react-query';

// import '../utils/vconsole';
initAxios();
export default function APP({ Component, pageProps }: AppProps) {
  const queryClient = new QueryClient();
  const router = useRouter();
  useEffect(() => {
    // 初始化micro-app
    microApp.start();

    /**
     * BUG FIX
     * 在nextjs 11下，子应用内部跳转，基座无法监听，导致点击浏览器前进、后退按钮，无法回退到正确的子应用页面
     * 通过监听popstate事件，在地址变化时重新替换为next路由来解决这个问题
     */
    window.addEventListener('popstate', () => {
      const { href, origin } = window.location;
      router.replace(href.replace(origin, ''));
    });
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <PageHead title={'Next Demo'} />
      <ReduxProvider store={store}>
        <Provider>
          <Header />
          <div className="page-component">
            <div className="bg-body">
              <Component {...pageProps} />
            </div>
          </div>
        </Provider>
      </ReduxProvider>
      <Footer />
    </QueryClientProvider>
  );
}
