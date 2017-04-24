const webpack = require('webpack')
const path = require('path')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const srcPath = path.join(__dirname, '/src')
const buildPath = path.join(__dirname, '/dist')

module.exports = {
  entry: {
    app: path.join(srcPath, 'index.js'),
    vendors: [ 'react', 'react-dom']
  },
  output: {
    path: buildPath,
    filename: "[name].[hash].bundle.js",
    sourceMapFilename: '[name].[hash].bundle.map',
    publicPath: '/'
  },
  devServer: {
    historyApiFallback: true,
    proxy: {
      '/transfer/*': {
        target: 'http://localhost:8080/',
        pathRewrite: { '.*' : '' }
      }
    }
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                'env', 'react'
              ]
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new CopyWebpackPlugin([
      { from: 'public' }
    ]),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendors',
      fileName: 'vendors.[hash].js',
      minChunks: Infinity
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.join(srcPath, 'index.html'),
      inject: 'body'
    })
  ]
}
