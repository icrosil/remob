const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackCleanupPlugin = require('webpack-cleanup-plugin');

module.exports = {
  entry: ['./example/index.js'],
  output: {
    filename: '[chunkhash].bundle.js',
    path: path.resolve(__dirname, '../', 'build'),
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader',
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new webpack.ProgressPlugin(),
    new HtmlWebpackPlugin({
      template: './example/index.html',
      fileName: 'index.html',
      title: 'remob',
      inject: 'body',
    }),
    new WebpackCleanupPlugin(),
  ],
  devtool: 'source-map',
};
