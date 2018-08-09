const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const projectRootDir = path.resolve(__dirname, '..');

const cssLoaderOptions = {
  modules: true,
  sourceMap: true,
  importLoaders: 1,
  localIdentName: '[name]__[local]--[hash:base64:5]',
  camelCase: true,
  namedExport: true
};

const baseConfig = {
  mode: 'development',

  entry: [path.resolve(projectRootDir, 'src/index.tsx')],

  output: {
    path: path.resolve(projectRootDir, 'dist'),
    filename: 'bundle.js',
    chunkFilename: '[name].bundle.js',
    publicPath: '/'
  },

  module: {
    rules: [
      {
        test: /\.[jt]sx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'awesome-typescript-loader',
          options: {
            useBabel: true,
            useCache: true
          }
        }
      },
      { enforce: 'pre', test: /\.js$/, loader: 'source-map-loader' },
      {
        test: /\.s[ac]ss$/,
        use: [
          'style-loader',
          {
            loader: 'typings-for-css-modules-loader',
            options: cssLoaderOptions
          },
          'sass-loader'
        ]
      },
      {
        test: /\.worker\.[jt]s$/,
        loader: 'worker-loader'
      },
      {
        test: /\.(jpe?g|png)$/i,
        loader: 'file-loader'
      },
      {
        test: /\.svg$/i,
        use: [
          'raw-loader',
          {
            loader: 'image-webpack-loader',
            options: {
              svgo: {
                plugins: [
                  { removeDimensions: true },
                  { removeViewBox: true },
                  { cleanupIDs: false }
                ]
              }
            }
          }
        ]
      }
    ]
  },

  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
    alias: {
      src: path.resolve(projectRootDir, 'src'),
      assets: path.resolve(projectRootDir, 'assets')
    }
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(projectRootDir, 'src/index.html')
      // filename: path.resolve(projectRootDir, 'index.html')
    }),
    new webpack.NamedModulesPlugin()
  ]
};

module.exports = {
  baseConfig,
  projectRootDir,
  cssLoaderOptions
};
