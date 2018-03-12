/* eslint-disable no-console */
var Benchmark = require('benchmark')
var suite = new Benchmark.Suite
var nature_arr = Array.from(Array(100).keys())

suite.add('for-loop-array', function() {
  var sum = 0
  for (var i = 0; i < nature_arr.length; i++) {
    sum += nature_arr[i]
  }
  return sum
}).add('for-in-loop-array', function() {
  var sum = 0
  for (var i in nature_arr) {
    sum += nature_arr[i]
  }
  return sum
}).add('foreach-array', function () {
  var sum = 0
  nature_arr.forEach((val) => {
    sum += val
  })
  return sum
}).add('for-of-array', function () {
  var sum = 0
  for (var i of nature_arr) {
    sum += i
  }
  return sum
}).on('cycle', function (event) {
  console.log(String(event.target))
}).on('complete', function () {
  console.log('Fast is: ' + this.filter('fastest').map('name'))
}).run({ 'async': true })
