const rewritesConfig = require('./rewrites/index');
module.exports = {
  reactStrictMode: true,
  async rewrites() {
    return rewritesConfig;
  },
  images: {
    loader: 'akamai',
    path: '',
    domains: ['raw.githubusercontent.com'],
    // Static image urls uncompatible with SSG, so replacing to url-loader
    disableStaticImages: true,
  },
  trailingSlash: true,
  productionBrowserSourceMaps: true,
  sentry: {
    hideSourceMaps: true,
  },
  webpack5: true,
  webpack: (config) => {
    config.resolve.fallback = { fs: false };
    config.module.rules.push({
      test: /\.(jpe?g|png|gif|svg|webp)$/i,
      use: [
        {
          loader: 'url-loader',
          options: {
            name: 'static/img/[name]-[hash:5].[ext]',
            limit: 8192,
          },
        },
      ],
    });
    return config;
  },
};
