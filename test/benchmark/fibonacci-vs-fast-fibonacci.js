/* eslint-disable no-console */
const fibonacci = require('../../src/arithmetic/fibonacci')
var Benchmark = require('benchmark')
var suite = new Benchmark.Suite


// add tests
suite.add('Function#normal', function() {
  fibonacci.normal(5)
})
  .add('Function#tail', function() {
    // eslint-disable-next-line
    fibonacci.tail(5)
  })
  .add('Function#fast', function () {
    fibonacci.fast(5)
  })
  // add listeners
  .on('cycle', function(event) {
    console.log(String(event.target))
  })
  .on('complete', function() {
    console.log('Fastest is ' + this.filter('fastest').map('name'))
  })
  // run async
  .run({ 'async': true })
  