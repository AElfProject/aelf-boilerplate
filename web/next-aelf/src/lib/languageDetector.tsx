// a i18next language detection plugin use to detect user language in the browser with support for.
// cookie (set cookie i18next=LANGUAGE)
// sessionStorage (set key i18nextLng=LANGUAGE)
// localStorage (set key i18nextLng=LANGUAGE)
// navigator (set browser language)
// querystring (append ?lng=LANGUAGE to URL)
// htmlTag (add html language tag <html lang="LANGUAGE" ...)
import LanguageDetector, { DetectorOptions } from 'i18next-browser-languagedetector';
const defaultDetectOptions = {
  order: ['querystring', 'cookie', 'localStorage', 'sessionStorage', 'navigator', 'htmlTag'],
};
const getLanguageDetector = (options?: DetectorOptions) => {
  const detectOptions = Object.assign({}, defaultDetectOptions, options);
  return new LanguageDetector({ languageUtils: {} }, detectOptions);
};

export default getLanguageDetector;
