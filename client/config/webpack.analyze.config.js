const merge = require('webpack-merge');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
  .BundleAnalyzerPlugin;

const prodConfig = require('./webpack.prod.config.js');

const analyzeConfig = merge(prodConfig, {
  plugins: [new BundleAnalyzerPlugin()]
});

module.exports = analyzeConfig;
