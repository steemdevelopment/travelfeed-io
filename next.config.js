const withCSS = require('@zeit/next-css');
const withOffline = require('next-offline');
const nextEnv = require('next-env');
const dotenvLoad = require('dotenv-load');
// https://github.com/zeit/next-plugins/tree/master/packages/next-bundle-analyzer
const withBundleAnalyzer = require('@zeit/next-bundle-analyzer');

dotenvLoad();

const withNextEnv = nextEnv();

module.exports = withNextEnv(
  withOffline(
    withCSS(
      withBundleAnalyzer({
        analyzeServer: ['server', 'both'].includes(process.env.BUNDLE_ANALYZE),
        analyzeBrowser: ['browser', 'both'].includes(
          process.env.BUNDLE_ANALYZE,
        ),
        bundleAnalyzerConfig: {
          server: {
            analyzerMode: 'static',
            reportFilename: '../bundles/server.html',
          },
          browser: {
            analyzerMode: 'static',
            reportFilename: '../bundles/client.html',
          },
        },
        dontAutoRegisterSw: true,
      }),
    ),
  ),
);
