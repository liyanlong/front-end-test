/**
 * 走台阶问题，每次可以走1步或者2步，走到第n个台阶有多少种方式
 * @param {number} lessStep 
 * @param {string} currentRoute 
 * @param {array} routes 
 * 
 * @return {array}
 */
export function gotoStep (lessStep, currentRoute, routes) {
  currentRoute = currentRoute || '';
  if (lessStep >= 2) {
    gotoStep(lessStep - 1, currentRoute + '1', routes);
    gotoStep(lessStep - 2, currentRoute + '2', routes);
  } else if (lessStep == 1) {
    gotoStep(lessStep - 1, currentRoute + '1', routes);
  } else if (lessStep === 0) {
    routes.push(currentRoute);
  }
  return routes;
}


/**
 * 大字符串查找长度大于等于2的连续出现的子字符串
 * 
 * 要求：
 * 1. 子字符串出现次数 大于2
 * 2. 同出现次数情况下， 选取子字符串最长的字符串
 * 3. 同出现次数，同字符串长度情况下，选取最先找到的字符串
 */