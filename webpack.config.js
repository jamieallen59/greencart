/* eslint-disable no-undef */
const webpack = require('webpack')
const path = require('path')
const fs = require('fs')

const CleanWebpackPlugin = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const WriteFilePlugin = require('write-file-webpack-plugin')

const env = require('./utils/env')

// load the secrets
const alias = {}

const secretsPath = path.join(__dirname, ('secrets.' + env.NODE_ENV + '.js'))

const fileExtensions = ['jpg', 'jpeg', 'png', 'gif', 'eot', 'otf', 'svg', 'ttf', 'woff', 'woff2']

if (fs.existsSync(secretsPath)) {
  alias['secrets'] = secretsPath
}

const options = {
  mode: process.env.NODE_ENV || 'development',
  entry: {
    popup: path.join(__dirname, 'src', 'popup', 'index.js'),
    contentScripts: path.join(__dirname, 'src', 'contentScripts', 'index.js'),
    background: path.join(__dirname, 'src', 'background', 'index.js')
  },
  output: {
    path: path.join(__dirname, 'build'),
    filename: '[name].bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader',
        exclude: /node_modules/
      },
      {
        test: new RegExp('\.(' + fileExtensions.join('|') + ')$'),
        loader: 'file-loader?name=[name].[ext]',
        exclude: /node_modules/
      },
      {
        test: /\.html$/,
        loader: 'html-loader',
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    alias: alias
  },
  plugins: [
    // clean the build folder
    new CleanWebpackPlugin(['build']),
    // expose and write the allowed env vars on the compiled bundle
    new webpack.EnvironmentPlugin(['NODE_ENV']),
    new CopyWebpackPlugin([{
      from: 'src/manifest.json',
      transform: content => {
        // generates the manifest file using the package.json informations
        return Buffer.from(JSON.stringify({
          description: process.env.npm_package_description,
          version: process.env.npm_package_version,
          ...JSON.parse(content.toString())
        }))
      }
    }]),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'src', 'popup', 'index.html'),
      filename: 'popup.html',
      chunks: ['popup']
    }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'src', 'background', 'index.html'),
      filename: 'background.html',
      chunks: ['background']
    }),
    new WriteFilePlugin()
  ]
}

if (env.NODE_ENV === 'development') {
  options.devtool = 'cheap-module-eval-source-map'
}

module.exports = options