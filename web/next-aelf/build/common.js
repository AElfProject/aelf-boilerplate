const rewritesConfig = require('./rewrites/index');
module.exports = {
  reactStrictMode: true,
  async rewrites() {
    return rewritesConfig;
  },
  images: {
    domains: ['raw.githubusercontent.com'],
  },
  i18n: {
    locales: ['en-US', 'zh'],
    defaultLocale: 'en-US',
  },
  productionBrowserSourceMaps: true,
  sentry: {
    hideSourceMaps: true,
  },
};
