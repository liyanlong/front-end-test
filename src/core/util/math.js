
/**
 * 实现大整数相加算法，两个数用字符串模拟函数原型
 * @param {string} a
 * @param {string} b
 * 
 * @return {string}
 */
export function add (a, b) {
  var str1 = a.split('').reverse();
  var str2 = b.split('').reverse();
  var MAX_LEN = Math.max(str1.length, str2.length);
  var result = Array.apply(null, {length: MAX_LEN});
  for (var i = 0; i < MAX_LEN; i++) {
    if (str1[i] === undefined) {
      str1[i] = 0
    }
    if (str2[i] === undefined) {
      str2[i] = 0
    }
    result[i] = parseInt(str1[i]) + parseInt(str2[i]);
  }
  for (var j = 0; j < result.length; j++) {
    if (result[j] >= 10) {
      if (result[j + 1] === undefined) {
        result[j + 1] = 0;
      }
      result[j] -= 10;
      result[j+1] += 1;      
    }
  }
  return result.reverse().join('');
}