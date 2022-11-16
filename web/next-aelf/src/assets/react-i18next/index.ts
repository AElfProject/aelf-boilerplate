import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import en from './languages/en.json';
import zh from './languages/zh.json';
import { LANGUAGE, LOCAL_LANGUAGE_LIST, DEFAULT_LANGUAGE } from './config';
import moment from 'moment';
// import 'moment/locale/zh-cn';
import 'moment/locale/zh-hk';
const resources = { en, zh };

export function initLanguage(localStorage?: Storage) {
  const languageCurrent = ensureLanguage() || DEFAULT_LANGUAGE;
  // TODO: browser language
  // //Get browser language
  // else if (getLocalLanguage() === 'zh') {
  //   lng = LOCAL_LANGUAGE_LIST[1];
  // }

  i18n
    .use(initReactI18next) // passes i18n down to react-i18next
    .init({
      resources,
      lng: languageCurrent,

      keySeparator: false, // we do not use keys in form messages.welcome

      interpolation: {
        escapeValue: false, // react already safes from xss
      },
    });
  moment.locale(languageCurrent.replace('_', '-'));
}
export default i18n;

// Sub-path rule > localStorage rule
function ensureLanguage() {
  let language;
  const languageStorage = localStorage?.getItem(LANGUAGE);
  if (languageStorage && LOCAL_LANGUAGE_LIST.includes(languageStorage)) {
    language = languageStorage;
  }

  // Internationalized: Sub-path
  // https://nextjs.org/docs/advanced-features/i18n-routing#limits-for-the-i18n-config
  window.location.href.match('/zh/');
  if (window?.location) {
    if (window.location.href.match('/zh/')) {
      language = 'zh';
    }
  }
  return language;
}
