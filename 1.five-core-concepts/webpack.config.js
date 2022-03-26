const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  mode: 'development',

  // 相当于 entry: { main: './src/main.js' },
  entry: './src/main.js',

  // 数组多入口，只输出一个 bundle
  // entry: ['./src/main.js', './src/test.js'],

  // 对象多入口，有几个入口就输出几个 bundle ，名称是对象 key 值
  // entry: { main: './src/main.js', test: './src/test.js' },

  output: {
    filename: 'bundle.js',
    // 输出多个 bundle 使用 [name] 占位符
    // filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '', // 服务器下资源引用的根目录
    assetModuleFilename: 'images/[name][ext]', // 资源模块输出文件名，默认为 [hash][ext][query]
    clean: true, // 打包前清空输出目录，相当于 clean-webpack-plugin 插件的作用，webpack 5 新增
  },

  /**
   * webpack 开箱即用只支持 JS 和 JSON 两种文件类型，通过 loaders 去支持其它文件类型并且把它们转化成有效的模块，并且可以添加到依赖图中。
   * loaders 本身是一个函数，接受源文件作为参数，返回转换的结果。
   */
  module: {
    /**
     * Webpack 5 新增资源模块（asset module），它是一种模块类型，允许使用资源文件（字体，图标等）而无需配置额外 loader。支持以下四个配置：
     * asset/resource  发送一个单独的文件并导出 URL。之前通过使用 file-loader 实现。
     * asset/inline    导出一个资源的 data URI。之前通过使用 url-loader 实现。
     * asset/source    导出资源的源代码。之前通过使用 raw-loader 实现。
     * asset           在导出一个 data URI 和发送一个单独的文件之间自动选择。之前通过使用 url-loader，并且配置资源体积限制实现。
     */
    rules: [
      {
        test: /\.(png|jpg|jpeg|gif|svg)$/,
        type: 'asset',
        parser: {
          dataUrlCondition: {
            maxSize: 10 * 1024, // 超过 10kb 不转 base64
          },
        },
      },
      {
        test: /\.(woff2?|eot|ttf|otf)$/,
        type: 'asset/resource',
        // Rule.generator.filename 与 output.assetModuleFilename 相同，并且仅适用于 asset 和 asset/resource 模块类型。
        generator: { filename: 'fonts/[name][ext]' },
      },
      {
        test: /\.css$/,
        /**
         * loader 支持链式调用。链中的每个 loader 会将转换应用在已处理过的资源上。
         * 一组链式的 loader 将按照相反的顺序执行。
         * 链中的第一个 loader 将其结果（也就是应用过转换后的资源）传递给下一个 loader，依此类推。
         * 最后，链中的最后一个 loader，返回 webpack 所期望的 JavaScript。
         */
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(sass|scss)$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.js$/,
        loader: 'babel-loader', // 只使用一个 loader 时推荐写法
        options: { presets: ['@babel/preset-env', '@babel/preset-react'] },
      },
    ],
  },

  /**
   * 插件⽤于 bundle ⽂件的优化，资源管理和环境变量注⼊
   * 作⽤于整个构建过程
   */
  plugins: [new HtmlWebpackPlugin({ template: './src/index.html' })],
}
