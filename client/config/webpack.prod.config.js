const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const MinifyPlugin = require('babel-minify-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const {
  baseConfig,
  cssLoaderOptions,
  projectRootDir
} = require('./webpack.base.config.js');

const prodConfig = merge.smart(baseConfig, {
  mode: 'production',
  optimization: {
    minimize: false
  },

  output: {
    path: path.resolve(__dirname, '..', 'dist'),
    publicPath: 'dist/'
  },

  module: {
    rules: [
      {
        test: /\.s[ac]ss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'typings-for-css-modules-loader',
              options: cssLoaderOptions
            },
            'sass-loader'
          ]
        })
      },
      {
        test: /\.(jpe?g|png)$/i,
        use: [
          'file-loader',
          {
            loader: 'image-webpack-loader',
            options: {
              optipng: {
                optimizationLevel: 7
              },
              pngquant: {
                quality: '65-90',
                speed: 4
              },
              mozjpeg: {
                progressive: true,
                quality: 80
              }
            }
          }
        ]
      }
    ]
  },

  devtool: false,

  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    new CleanWebpackPlugin(['dist'], { root: projectRootDir }),
    new ExtractTextPlugin('style.css'),
    new MinifyPlugin()
  ]
});

module.exports = prodConfig;
