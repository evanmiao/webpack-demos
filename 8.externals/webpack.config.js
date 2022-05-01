const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  mode: 'development',
  entry: './src/main.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true
  },
  plugins: [new HtmlWebpackPlugin({ template: './src/index.html' })],
  externalsType: 'script',
  externals: {
    vue: ['https://unpkg.com/vue@next', 'Vue']
  }
}