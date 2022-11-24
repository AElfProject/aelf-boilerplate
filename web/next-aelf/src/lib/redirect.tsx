import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import getLanguageDetector from './languageDetector';
import i18nextConfig from '../../next-i18next.config';

export const useRedirect = (to?: string) => {
  const router = useRouter();
  to = to || router.route;
  const [calledPush, setCalledPush] = useState(false);
  const { locales, defaultLocale } = i18nextConfig.i18n;
  locales.splice(locales.indexOf(defaultLocale), 1);
  locales.push(defaultLocale);
  // language detection
  useEffect(() => {
    // prevent twice redirect
    if (calledPush) return;
    const languageDetector = getLanguageDetector();
    const detectedLng = languageDetector.detect() as string;
    for (const locale of locales) {
      // eslint-disable-next-line no-undef
      if (detectedLng?.startsWith(locale)) {
        setCalledPush(true);
        languageDetector.cacheUserLanguage(detectedLng);
        router.replace('/' + locale + to);
        return;
      }
    }

    setCalledPush(true);
    router.replace('/' + detectedLng + to);
  });

  return <></>;
};

export const Redirect = () => {
  useRedirect();
  return <></>;
};

// eslint-disable-next-line react/display-name
export const getRedirect = (to: string) => () => {
  useRedirect(to);
  return <></>;
};
