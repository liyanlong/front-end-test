/**
 * 检测是否为纯粹的对象
 * 
 * @param {any} obj
 * 
 * @return {Boolean}
 */

export function isPlainObject (obj) {
  if (!obj || typeof obj !=='object' || isWindow(obj) ||  obj.nodeType || (obj instanceof Function)) {
    return false
  }
  return true
}

/**
 * 检测是否为window对象
 * 
 * @param {Object} obj
 * 
 * @return {Window}
 */
export function isWindow (obj) {
  if (typeof window === 'object') {
    return obj instanceof window.constructor && obj.constructor.name === 'Window'
  }
  return false
}

/**
 * 两边去除空格，回车
 * 
 * @param {String} str 
 * 
 * @return {String}
 */
export function trim (str) {
  return String(str).replace(/(^\s*)|(\s*$)/g, '')
}

/**
 * 左边去除空白字符
 * 
 * @param {String} str 
 * 
 * @return {String}
 */
export function ltrim (str) {
  return String(str).replace(/^\s*/, '')
}

/**
 * 右边去除空格
 * 
 * @param {String} str 
 * 
 * @return {String}
 */
export function rtrim (str) {
  return String(str).replace(/\s$/, '')
}
