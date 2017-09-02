/* eslint-disable max-len */
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const ALIASES = {
  tools: path.resolve(__dirname, 'tools'),
  src: path.resolve(__dirname, 'src'),
  actions: path.resolve(__dirname, 'src/actions'),
  components: path.resolve(__dirname, 'src/components'),
  constant: path.resolve(__dirname, 'src/constants'),
  containers: path.resolve(__dirname, 'src/containers'),
  images: path.resolve(__dirname, 'src/images'),
  reducers: path.resolve(__dirname, 'src/reducers'),
  store: path.resolve(__dirname, 'src/store'),
  styles: path.resolve(__dirname, 'src/styles'),
  utils: path.resolve(__dirname, 'src/utils'),
};

module.exports = {
  devtool: 'eval-source-map',
  entry: [
    'babel-polyfill',
    'webpack-dev-server/client?http://localhost:5000',
    'webpack/hot/only-dev-server',
    'react-hot-loader/patch',
    path.join(__dirname, 'src/index.js')
  ],
  output: {
    path: path.join(__dirname, '/dist/'),
    filename: '[name].js',
    publicPath: '/'
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/index.tpl.html',
      inject: 'body',
      filename: 'index.html'
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development')
    }),
    new webpack.NamedModulesPlugin()
  ],
  resolve: {
    alias: ALIASES,
    extensions: ['*', '.js', '.jsx', '.json', '.css', '.scss'],
    modules: [path.resolve(__dirname, 'src'), 'node_modules']
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'eslint-loader'
      },
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.json?$/,
        loader: 'json-loader'
      },
      {
        test: /\.scss|css$/,
        loader:
          'style-loader!css-loader?modules&localIdentName=[name]---[local]---[hash:base64:5]!sass-loader'
      },
      {
        test: /\.woff(2)?(\?[a-z0-9#=&.]+)?$/,
        loader: 'url?limit=10000&mimetype=application/font-woff'
      },
      { test: /\.(ttf|eot|svg)(\?[a-z0-9#=&.]+)?$/, loader: 'file-loader' }
    ]
  }
};
