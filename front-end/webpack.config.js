const HtmlWebpackPlugin = require('html-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: './src/index.tsx',
  devtool: 'eval-source-map',
  // externals: ['fs'],
  resolve: {
    // fallback: {
    //   net: false,
    //   async_hooks: false,
    // },
    extensions: ['.js', '.ts', '.tsx'],
    alias: {
      process: 'process/browser',
    },
  },

  devServer: {
    historyApiFallback: true,
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          { loader: 'css-loader', options: { modules: true } },
        ],
      },
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: 'index.html',
    }),
    new Dotenv(),
    new NodePolyfillPlugin(),
    new MiniCssExtractPlugin(),
  ],
};
