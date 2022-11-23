import LanguageDetector from 'i18next-browser-languagedetector';

const languageDetector = new LanguageDetector(
  { languageUtils: {} },
  {
    order: ['querystring', 'cookie', 'localStorage', 'sessionStorage', 'navigator', 'htmlTag'],
  },
);

export default languageDetector;
