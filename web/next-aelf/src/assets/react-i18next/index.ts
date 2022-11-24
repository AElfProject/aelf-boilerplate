import { LANGUAGE, LOCAL_LANGUAGE_LIST, DEFAULT_LANGUAGE } from './config';
import moment from 'moment';
// import 'moment/locale/zh-cn';
import 'moment/locale/zh-hk';
import i18n from 'i18next';
import en from '../../../public/locales/en-US/common.json';
import zh from '../../../public/locales/zh/common.json';
import { initReactI18next } from 'react-i18next';
import getLanguageDetector from 'lib/languageDetector';
const resources = { en, zh };
export function initLanguage() {
  // Sub-path rule > localStorage rule
  const languageDetector = getLanguageDetector({
    lookupLocalStorage: LANGUAGE,
  });
  const detectedLng = languageDetector.detect() as string;
  // check if detectedLng is in LANGUAGE_LIST
  const ensureLng = LOCAL_LANGUAGE_LIST.includes(detectedLng);
  const languageCurrent = ensureLng ? detectedLng : DEFAULT_LANGUAGE;
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
