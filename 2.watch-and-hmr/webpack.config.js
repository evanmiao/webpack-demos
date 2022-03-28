const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  mode: 'development',
  entry: './src/main.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
  plugins: [new HtmlWebpackPlugin()],
  /**
   * 文件监听的原理：
   * 轮询判断文件的最后编辑时间是否变化
   * 某个文件发生变化，并不会立即告诉监听者，而是先缓存起来，等 aggregateTimeout
   */
  watch: false, // 默认 false
  watchOptions: {
    ignored: /node_modules/, // 默认为空，不监听的文件或文件夹，支持正则匹配
    aggregateTimeout: 300, // 默认 300，监听到文件更改后重新构建前的延迟
    poll: 1000, // 默认 1000，毫秒为单位进行轮询
  },
  /**
   * 模块热替换(hot module replacement 或 HMR)原理：
   * 使用 webpack-dev-server (后面简称 WDS)托管静态资源，同时以 Runtime 方式注入 HMR 客户端代码
   * 浏览器加载页面后，与 WDS 建立 WebSocket 连接
   * Webpack 监听到文件变化后，增量构建发生变更的模块，并通过 WebSocket 发送 hash 事件
   * 浏览器接收到 hash 事件后，请求 manifest 资源文件，确认增量变更范围
   * 浏览器加载发生变更的增量模块
   * Webpack 运行时触发变更模块的 module.hot.accept 回调，执行代码变更逻辑
   */
  devServer: {
    static: './dist',
    hot: true, // webpack-dev-server v4.0.0 开始热模块替换默认开启
  },
}
