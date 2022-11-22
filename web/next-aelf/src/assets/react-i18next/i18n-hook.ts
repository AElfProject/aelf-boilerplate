import i18n, { useTranslation, useSelectedLanguage } from 'next-export-i18n';
import { useCallback, useMemo } from 'react';
import { LANGUAGE, LOCAL_LANGUAGE_LIST } from './config';
import moment from 'moment';
export function useLanguage() {
  const { t } = useTranslation();
  let { lang } = useSelectedLanguage();
  const changeLanguage = useCallback(
    (value: string) => {
      if (i18n.language !== value && LOCAL_LANGUAGE_LIST.includes(value)) {
        if (value === 'zh') {
          moment.locale('zh-hk');
        } else {
          moment.locale(value);
        }
        localStorage.setItem(LANGUAGE, value);
      }
    },
    [i18n],
  );
  return useMemo(() => ({ language: lang, changeLanguage, t }), [changeLanguage, i18n.language, t]);
}
