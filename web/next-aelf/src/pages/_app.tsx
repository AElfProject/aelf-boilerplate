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

initAxios();
export default function APP({ Component, pageProps }: AppProps) {
  const queryClient = new QueryClient();
  const router = useRouter();
  useEffect(() => {
    // init micro-app
    microApp.start();

    /**
     * BUG FIX
     * When using nextjs 11, child application jumps internally, and the base cannot monitor,
     * will failed to return to the correct child application page when clicking the forward and back buttons of the browser
     * Solving the problem by listening to the popstate event and replacing it with the next route when the address changes
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
