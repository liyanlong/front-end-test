(function (root, factory) {
  
  if (typeof define === 'function' && define.amd) {
    // AMD
    define([], factory);
  } else if (typeof exports === 'object') {
    module.exports = factory();
  } else {
    root.Drag = factory();
  }
})(this, function factory() {

  var defaultOptions = {

  }

  function extend (target, source) {
    for (var name in source) {
      if (typeof target[name] === 'undefined') {
        target[name] = source[name]
      }
    }
    return target;
  }

  function Drag (id, options) {
    options = extend(options || {}, defaultOptions);
    this.$el = document.querySelector(id);
  }

  Drag.prototype.init = function () {

  };

  Drag.prototype.addEventListener = function () {

  };

  Drag.prototype.destroy = function () {

  };

  return Drag;
});
