#!/usr/bin/env node
const fs = require('fs')
const path = require('path')
const { spawn } = require('child_process')
const lcovFile = path.resolve(__dirname, '../coverage/lcov.info')

if (fs.existsSync(lcovFile)) {
  fs.readFile(lcovFile, {
    encoding: 'utf8',
    flg: 'r'
  }, function (err, data) {
    if (err) throw err
    const coveralls = spawn('node', ['./node_modules/coveralls/bin/coveralls'])
    coveralls.stdin.write(data)
    coveralls.stdin.end()
    coveralls.stdout.pipe(process.stdout)
  })
} else {
  throw new Error(lcovFile + ' not exists')
}