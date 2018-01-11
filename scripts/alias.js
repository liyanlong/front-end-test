const path = require('path')

const resolve = p => path.resolve(__dirname, '../', p)

module.exports = {
  '@': resolve('src'),
  core: resolve('src/core')
}