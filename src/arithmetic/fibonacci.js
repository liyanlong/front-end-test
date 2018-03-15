/**
 * 普通实现
 * @param {number} n 
 * 
 * return number
 */
function normal (n) {
  if (n < 0) {
    return - 1
  }
  if (n === 0) {
    return 0
  }
  if (n === 1 || n === 2) {
    return 1
  }
  return normal(n -1) + normal(n - 2)
}

/**
 * 尾递归优化
 * @param {number} n
 * 
 * return number
 */
function _tail (n, current, next) {
  if (n === 0) {
    return current
  }
  if (n === 1) {
    return next
  }
  return _tail(n - 1, next, current + next)
}

function tail (n) {
  if (n < 0) {
    return -1
  }
  return _tail(n, 0, 1)
}

/**
 * 循环实现
 * @param {number} n
 * 
 * return number
 */
function fast (n) {
  if (n < 0) {
    return -1
  }
  if (n === 0) {
    return 0
  }
  if (n === 1 || n === 2) {
    return 1
  }
  let prevent = 1
  let current = 1
  for (let i = 3; i <= n; i++) {
    let tmp = prevent + current
    prevent = current
    current = tmp
  }
  return current
}

var strategy = {
  normal: normal,
  tail: tail,
  fast: fast
}

exports = module.exports = function fibonacci(n, type) {
  if (strategy[type]) {
    return strategy[type].call(null, n)
  }
  return normal(n)
}

exports.normal = normal
exports.tail = tail
exports.fast = fast
