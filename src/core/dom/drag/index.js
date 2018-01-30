function initDragEl (el) {
  if (!(el instanceof HTMLElement)) {
    el = document.querySelector(el);
  }
  var canMove = false;

  el.style.position = 'absolute';
  
  el.addEventListener('mousedown', function (event) {
    canMove = true;

  }, false);

  el.addEventListener('mousemove', function (event) {
    var target = event.target;
    var left = event.clientX - target.offsetLeft;
    var top = event.clientY - target.offsetTop;
    if (canMove) {
      target.style.left = left + 'px';
      target.style.top = top + 'px';
    }
  }, false);

  el.addEventListener('mouseup', function (event) {
    canMove = false;
  }, false);
}