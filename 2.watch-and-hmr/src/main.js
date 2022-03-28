import printMe from './print.js'

if (module.hot) {
  module.hot.accept('./print.js', () => {
    console.log('接收到 printMe 更新')
    printMe()
  })
}
