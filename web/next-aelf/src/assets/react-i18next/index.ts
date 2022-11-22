import { LANGUAGE, LOCAL_LANGUAGE_LIST, DEFAULT_LANGUAGE } from './config';
const moment = require('moment');
// import 'moment/locale/zh-cn';
require('moment/locale/zh-hk');

const initLanguage = (localStorage: Storage) => {
  const languageCurrent = ensureLanguage(localStorage) || DEFAULT_LANGUAGE;
  moment.locale(languageCurrent.replace('_', '-'));
};

// Sub-path rule > localStorage rule
function ensureLanguage(localStorage: Storage) {
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
export { initLanguage };
