/**
 * 一个模块可能有多个方法，只要其中某个方法用到了，则整个文件都会被打包到 bundle
 * tree shaking 就是只把用到的方法打入 bundle，没用到的方法会在 uglify 阶段被擦除
 *
 * mode 为 production 默认开启 tree shaking
 * 必须使用 ES6 模块化，CommonJS 不支持
 */

import { foo, bar } from './util'

/**
 * DCE (Dead code elimination)
 * 1. 代码不会被执行
 * 2. 代码执行的结果不会被用到
 * 3. 代码只会影响死变量（只写不读）
 */
if (false) {
  console.log('This code is never executed.')
}

;(function () {
  return 'This is IIFE.'
})()

let msg = foo()

// 只有 bar 被打包
console.log(bar())
