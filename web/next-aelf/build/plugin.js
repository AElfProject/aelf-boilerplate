const withLess = require('next-with-less');
const { NEXT_PUBLIC_CSS_APP_PREFIX, NEXT_PUBLIC_BUNDLE_ANALYZER } = process.env;
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: NEXT_PUBLIC_BUNDLE_ANALYZER === 'true',
});
const { withSentryConfig } = require('@sentry/nextjs');
const sentryWebpackPluginOptions = {
  // Additional config options for the Sentry Webpack plugin. Keep in mind that
  // the following options are set automatically, and overriding them is not
  // recommended:
  //   release, url, org, project, authToken, configFile, stripPrefix,
  //   urlPrefix, include, ignore

  silent: true, // Suppresses all logs
  include: '.next',
  configFile: '.sentryclirc',
  urlPrefix: '~/_next',
};
module.exports = [
  [withBundleAnalyzer],
  [
    withLess,
    {
      lessLoaderOptions: {
        lessOptions: {
          modifyVars: {
            '@app-prefix': NEXT_PUBLIC_CSS_APP_PREFIX,
            '@ant-prefix': NEXT_PUBLIC_CSS_APP_PREFIX,
          },
        },
      },
    },
  ],
  (nextConfig) => withSentryConfig(nextConfig, sentryWebpackPluginOptions),
];
