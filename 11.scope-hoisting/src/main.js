/**
 * 分析模块之间的依赖关系，将所有模块按照引用顺序合并到一个函数中
 * 为防止代码冗余，只有被引用一次的模块才会被合并
 * 会重命名一些变量以防止变量名冲突
 *
 * 优点：可以减少函数声明代码和内存开销
 *
 * mode 为 production 默认开启 scope hoisting
 * 必须使用 ES6 模块化，CommonJS 不支持
 */

import msg from './util'
console.log(msg)
