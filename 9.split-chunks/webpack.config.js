const path = require('path')
const glob = require('glob')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const setMPA = () => {
  const entry = {}
  const htmlPlugins = []

  const entryFiles = glob.sync(path.join(__dirname, './src/*/main.js'))

  entryFiles.map(entryFile => {
    const match = entryFile.match(/src\/(.*)\/main\.js/)
    const pageName = match && match[1]

    entry[pageName] = entryFile
    htmlPlugins.push(
      new HtmlWebpackPlugin({
        template: './src/index.html',
        filename: `${pageName}.html`,
        chunks: [pageName, 'vendor', 'commons']
      })
    )
  })

  return {
    entry,
    htmlPlugins
  }
}

const { entry, htmlPlugins } = setMPA()

module.exports = {
  mode: 'development',
  entry,
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: { presets: ['@babel/preset-env', '@babel/preset-react'] }
      }
    ]
  },
  plugins: [...htmlPlugins],
  optimization: {
    splitChunks: {
      minSize: 0, // 生成 chunk 的最小体积（以 bytes 为单位）
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
          name: 'vendor', // false（默认值，自动命名） | string | function
          /**
           * 指定要进行代码分割的 chunk 类型
           * 'async'    默认值，只对异步导入的 chunk 进行分割，也就是 import() 导入
           * 'initial'  只对原始导入的 chunk 进行分割，也就是 import x from 'x' 导入
           * 'all'      以上两者均包括
           */
          chunks: 'all'
        },
        commons: {
          name: 'commons',
          chunks: 'all',
          minChunks: 2, // 拆分前必须共享模块的最小 chunks 数
          priority: -10 // 优先级
        }
      }
    }
  }
}
