const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

// 为每个包含 CSS 的 JS 文件创建一个单独的 CSS 文件
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
  // 不要在开发环境使用文件指纹，因为不需要在开发环境做持久缓存，而且这样会增加编译时间
  mode: 'production',
  entry: './src/main.js',
  output: {
    /**
     * 文件指纹：
     * hash 和整个项目等构建相关，只要有项目文件有修改，整个项目构建的 hash 值就会更改
     * chunkhash 和 webpack 打包的 chunk 有关，不同的 entry 会生成不同的 chunkhash 值
     * contenthash 根据文件内容来定义 hash ，文件内容不变，则 contenthash 不变
     */
    filename: '[name]_[chunkhash:8].js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.svg$/,
        type: 'asset/resource',
        generator: { filename: 'images/[name]_[hash:8][ext]' },
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin(),
    new MiniCssExtractPlugin({ filename: '[name]_[contenthash:8].css' }),
  ],
}
