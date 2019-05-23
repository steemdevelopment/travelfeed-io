const withCSS = require("@zeit/next-css");
// https://github.com/zeit/next-plugins/tree/master/packages/next-bundle-analyzer
const withBundleAnalyzer = require("@zeit/next-bundle-analyzer");
module.exports = withCSS(
  withBundleAnalyzer({
    analyzeServer: ["server", "both"].includes(process.env.BUNDLE_ANALYZE),
    analyzeBrowser: ["browser", "both"].includes(process.env.BUNDLE_ANALYZE),
    bundleAnalyzerConfig: {
      server: {
        analyzerMode: "static",
        reportFilename: "../bundles/server.html"
      },
      browser: {
        analyzerMode: "static",
        reportFilename: "../bundles/client.html"
      }
    },
    experimental: {
      amp: false
    }
  })
);
