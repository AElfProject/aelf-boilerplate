const rewritesConfig = require('./rewrites/index');
module.exports = {
  reactStrictMode: true,
  async rewrites() {
    return rewritesConfig;
  },
  images: {
    domains: ['raw.githubusercontent.com'],
  },
  // i18n:
  //   process.env.MODE === 'CSR'
  //     ? undefined
  //     : {
  //         locales: ['en-US', 'zh'],
  //         defaultLocale: 'en-US',
  //       },
  productionBrowserSourceMaps: true,
  sentry: {
    hideSourceMaps: true,
  },
  // for js、css
  // assetPrefix: '.',
  // for <Image>
  // images: {
  //   loader: 'imgix',
  //   path: '/',
  // },
};
