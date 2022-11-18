import enUS from 'antd/lib/locale/en_US';
import zh_HK from 'antd/lib/locale/zh_HK';
const LANGUAGE = 'I18N_LANGUAGE';
const LOCAL_LANGUAGE = [
  { language: 'en', title: 'English' },
  { language: 'zh', title: '繁体中文' },
];
const LOCAL_LANGUAGE_LIST = LOCAL_LANGUAGE.map((i) => i.language);
const DEFAULT_LANGUAGE = LOCAL_LANGUAGE_LIST[0];

const getLocalLanguage = () => {
  let lang = navigator.language;
  lang = lang.slice(0, 2);

  return lang;
};
const ANTD_LOCAL: { [key: string]: any } = {
  zh: zh_HK,
  en: enUS,
};
export { LANGUAGE, LOCAL_LANGUAGE, LOCAL_LANGUAGE_LIST, getLocalLanguage, ANTD_LOCAL, DEFAULT_LANGUAGE };
