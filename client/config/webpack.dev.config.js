const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');

const { baseConfig, projectRootDir } = require('./webpack.base.config.js');

const defaultPort = 8080;
const port = process.env.PORT || defaultPort;

const devConfig = merge.smartStrategy({
  entry: 'prepend'
})(baseConfig, {
  entry: ['react-hot-loader/patch'],

  output: {
    path: projectRootDir
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development')
    }),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ],

  devtool: 'source-map',

  devServer: {
    contentBase: path.join(projectRootDir, 'dist'),
    port,
    inline: true,
    hot: true
  }
});

module.exports = devConfig;
