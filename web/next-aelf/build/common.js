const rewritesConfig = require('./rewrites/index');
module.exports = {
  reactStrictMode: true,
  async rewrites() {
    return rewritesConfig;
  },
  images: {
    loader: 'akamai',
    path: '',
  },
  trailingSlash: true,
  // i18n: {
  //   locales: ['en-US', 'zh'],
  //   defaultLocale: 'en-US',
  // },
  productionBrowserSourceMaps: true,
  // sentry: {
  //   hideSourceMaps: true,
  // },
  webpack5: true,
  webpack: (config) => {
    config.resolve.fallback = { fs: false };
    return config;
  },
};
