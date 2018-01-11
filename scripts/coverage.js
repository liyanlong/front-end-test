#!/usr/bin/env node
const fs = require('fs')
const path = require('path')
const coveralls = require('coveralls')

const iconvFile = path.resolve(__dirname, './coverage/iconv.info')

function handleInputCb (err) {
  if (err) {
    throw err;
  }
}

if (fs.existsSync(iconvFile)) {
  fi.readFile(iconvFile, {
    encoding: 'utf8',
    flg: 'r'
  }, function (err, data) {
    if (err) throw err
    coveralls.handleInput(data, handleInputCb)
  })
}
console.log('coverage end')
