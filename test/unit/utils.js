
let id = 0
export const createElm = function(name) {
  const elm = document.createElement(name || 'div')
  elm.id = 'app' + ++id
  document.body.appendChild(elm)
  return elm
}
