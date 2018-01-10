var Benchmark = require('benchmark');
var suite = new Benchmark.Suite;

function MyObject() {}
function foo (arg1, arg2) {
  return typeof this;
}

// add tests
suite.add('Function#CallObject', function() {
  var object = new MyObject();
  foo.call(object, 1, 2);
})
.add('Function#CallNull', function() {
  var object = new MyObject();
  foo.call(null, 1, 2);
})
// add listeners
.on('cycle', function(event) {
  console.log(String(event.target));
})
.on('complete', function() {
  console.log('Fastest is ' + this.filter('fastest').map('name'));
})
// run async
.run({ 'async': true });