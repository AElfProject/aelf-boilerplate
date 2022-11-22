let en = require('./en.json');
let zh = require('./zh.json');
const i18n = {
  translations: {
    en,
    zh,
  },
  defaultLang: 'en',
  useBrowserDefault: true,
};
module.exports = i18n;
