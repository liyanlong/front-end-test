const alias = require('../../scripts/alias')
const webpack = require('webpack')
const webpackConfig = {
  resolve: {
    alias: alias
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"development"'
      }
    })
  ],
  devtool: '#inline-source-map'
}

// shared config for all unit tests
module.exports = {
  frameworks: ['mocha'],
  files: [
    './index.js'
  ],
  preprocessors: {
    './index.js': ['webpack', 'sourcemap']
  },
  webpack: webpackConfig,
  webpackMiddleware: {
    noInfo: true
  },
  plugins: [
    'karma-mocha',
    'karma-mocha-reporter',
    'karma-webpack',
    'karma-sourcemap-loader'
  ]
}
