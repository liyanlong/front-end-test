/**
 * 走台阶问题，每次可以走1步或者2步，走到第n个台阶有多少种方式
 * @param {number} lessStep 
 * @param {string} currentRoute 
 * @param {array} routes 
 * 
 * @return {array}
 */
export function gotoStep (lessStep, currentRoute, routes) {
  currentRoute = currentRoute || ''
  if (lessStep >= 2) {
    gotoStep(lessStep - 1, currentRoute + '1', routes)
    gotoStep(lessStep - 2, currentRoute + '2', routes)
  } else if (lessStep === 1) {
    gotoStep(lessStep - 1, currentRoute + '1', routes)
  } else if (lessStep === 0) {
    routes.push(currentRoute)
  }
  return routes
}

/**
 * 目前有一个大文本字符串, 匹配其中出现至少2个文字的子字符串
 * 匹配规则：
 * 1. 出现最多次数的字符串
 * 2. 如果出现同次数字符串， 取最长的子字符串
 * 3. 如果出现同次数且字符串长度相同的子字符串，选取最先匹配的子字符串
 * 
 * @param bigStr
 * 
 * @return {str}
 */
// export function getMaxLenSubstr (bigStr) {
// }
