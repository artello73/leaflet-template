// webpack.config.js

const webpack = require('webpack');
const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { SourceMapDevToolPlugin } = require('webpack');

module.exports = {
  mode: 'development',
  devServer: {
    historyApiFallback: true,
    contentBase: [path.join(__dirname, 'public'), path.join(__dirname, 'dist')],
    open: true,
    compress: true,
    hot: true,
    port: 8080,
    writeToDisk: true,
  },
  entry: {
    main: path.resolve(__dirname, './src/js/index.js'),
  },

  output: {
    path: path.resolve(__dirname, './dist'),
    publicPath: './public',
    // filename: '[name].bundle.js',
    filename: 'bundle.js',
  },
  module: {
    rules: [
      // CSS, PostCSS, Sass
      {
        test: /\.(scss|css)$/,
        use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader'],
      },
      {
        test: /\.(png|svg|jpe?g|gif|woff2?|ttf|eot)$/,
        type: 'asset/resource',
      },
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              [
                '@babel/preset-env',
                {
                  targets: ['chrome 87'],
                },
              ],
            ],

            plugins: [
              '@babel/plugin-proposal-private-methods',
              '@babel/plugin-proposal-class-properties',
              '@babel/plugin-proposal-object-rest-spread',
            ],
          },
        },
      },
      {
        test: /\.js$/,
        enforce: 'pre',
        use: ['source-map-loader'],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.ProvidePlugin({
      L: 'leaflet',
      'window.L': 'leaflet',
    }),
    new SourceMapDevToolPlugin({
      filename: '[file].map',
    }),
  ],
};
