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
        template: path.join(__dirname, `src/${pageName}/index.html`),
        filename: `${pageName}.html`,
        chunks: [pageName]
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
  plugins: [...htmlPlugins]
}
