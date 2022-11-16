import { useTranslation } from 'react-i18next';
import { useCallback, useMemo } from 'react';
import { LANGUAGE, LOCAL_LANGUAGE_LIST } from './config';
import moment from 'moment';

export function useLanguage() {
  const { i18n, t } = useTranslation();
  // https://nextjs.org/docs/advanced-features/i18n-routing#limits-for-the-i18n-config
  // const { locale } = useRouter();
  // console.log('locale:', locale);
  const changeLanguage = useCallback(
    (value: string) => {
      if (i18n.language !== value && LOCAL_LANGUAGE_LIST.includes(value)) {
        if (value === 'zh') {
          moment.locale('zh-hk');
        } else {
          moment.locale(value);
        }
        i18n.changeLanguage(value);
        localStorage.setItem(LANGUAGE, value);
      }
    },
    [i18n],
  );
  return useMemo(() => ({ language: i18n.language, changeLanguage, t }), [changeLanguage, i18n.language, t]);
}
