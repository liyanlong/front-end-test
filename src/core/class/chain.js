/**
 * 简单职责链定义
 * @param {*} fn 
 */
function Chain(fn)
{
  try {
    this.ret = fn.apply(this)
  } catch (err) {
    this.err = err
  }
}
Chain.prototype.then = function (fn, errFn) {
  var self = this
  var chain = new Chain(function () {
    if (self.ret instanceof Error) {
      return errFn.call(self, self.err)
    } else {
      return fn.call(self, self.ret)
    }
  })
  return chain
}

Chain.prototype.catch = function (fn) {
  return this.then(function () {}, fn)
}

Chain.prototype.done = function (fn) {
  this.then(fn)
}

export default Chain
