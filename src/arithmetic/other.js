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
