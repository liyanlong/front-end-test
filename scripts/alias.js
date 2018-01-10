const path = require('path')

const resolve = p => path.resolve(__dirname, '../', p)

module.exports = {
  core: resolve('src/core')
}