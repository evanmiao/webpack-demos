const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')

module.exports = {
  mode: 'development',
  entry: './src/main.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: { presets: ['@babel/preset-env', '@babel/preset-react'] },
      },
    ],
  },
  optimization: {
    minimize: true, // 开发环境下启用
    minimizer: [
      // webpack 5 自带最新版本 terser-webpack-plugin，如果需要自定义配置，仍需安装
      `...`, // webpack 5 可以使用 `...` 扩展现有的 minimizer（即 `terser-webpack-plugin`）
      new CssMinimizerPlugin(),
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Webpack App', // 自定义模版使用 <%= htmlWebpackPlugin.options.title %> 接收
      filename: 'index.html',
      template: path.join(__dirname, 'src/index.html'), // 可使用 ejs 语法
      /**
       * chunks 注入位置
       * true | 'head' | 'body' | false
       * 设为 true 时取决于 scriptLoading
       */
      inject: true,
      scriptLoading: 'defer', // 'blocking' | 'defer' | 'module'
      chunks: ['main'],
      minify: true, // using html-minifier-terser 默认生产环境 true，开发环境 false
      meta: {}, // 注入 meta 信息
    }),
    new MiniCssExtractPlugin(),
  ],
}
