const { merge } = require('webpack-merge')
const baseConfig = require('./webpack.base.config.js')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = merge(baseConfig, {
  mode: 'production',
  plugins: [new MiniCssExtractPlugin()],
  // source map 文件只用于错误报告工具，不要部署到服务器。
  devtool: 'source-map'
})
