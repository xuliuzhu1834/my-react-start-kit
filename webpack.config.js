
const DefinePlugin = require('webpack/lib/DefinePlugin');
const CompressionPlugin = require("compression-webpack-plugin");
const webpack = require('webpack');

module.exports = {
  entry: {
    app: ['./src/entry.jsx'],
    common: [
      'react', 'react-dom', 'react-router',
      'redux', 'react-redux','object-assign', 'redux-saga',
      'react-router-redux', 'whatwg-fetch', 'babel-polyfill',
    ],
  },
  output: {
    path: `${__dirname}/dist`,
    filename: '[name].bundle.js',
    publicPath: './dist/',
  },
  resolve: {
    extensions: ['', '.js', '.jsx', '.json'],
  },
  module: {
    loaders: [
      {
        test: /\.js(x$|$)/,
        loaders: ['babel'],
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        loaders: ['style', 'css?modules&localIdentName=[name]__[local]-[hash:base64:5]'],
      },
      {
        test: /\.json/,
        loaders: ['json'],
      },
      {
        test: /\.(png|jpg|jpeg|gif)$/,
        loaders: ['file?name=[hash:base64:7].[ext]'],
      },
    ],
  },
  plugins: [
    new DefinePlugin({
      process: {
        env: {
          CURRENT_VERSION: JSON.stringify(process.env.CURRENT_VERSION || '内部测试'),
          NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'development'),
         // BASE_URI: JSON.stringify(process.env.BASE_URI || '/index.php/Home'),
        },
      },
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: ['common', 'manifest'],
      filename: '[name].chunk.js',
      minChunks: Infinity,
    }),
  ].concat((() => {
    if (process.env.NODE_ENV === 'production') {
      return [
        new webpack.optimize.UglifyJsPlugin({
          minimize: true,
          mangle: true,
          compress: {
            warnings: false, // Suppress uglification warnings
            pure_getters: true,
            unsafe: true,
            unsafe_comps: true,
            screw_ie8: true
          },
          output: {
            comments: false,
          },
          exclude: [/\.min\.js$/gi],
        }),
        new CompressionPlugin({
          asset: "[path].gz[query]",
          algorithm: "gzip",
          test: /\.js$|\.css$|\.html$/,
          threshold: 10240,
          minRatio: 0
        }),
      ];
    }
    return [];
  })()),
  externals: { },
};
