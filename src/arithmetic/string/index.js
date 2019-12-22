
/**
 * 组合字符串abc, 输出不同格式的结果 abc, acb, bac, bca, cab, cba => A32 = 3 * 2 * 1= 6

 * @param {*} str 
 */
function combineStr2Arr(str) {
  const list = [];
  _join('', str.split(''));

  function _join(str, arr) {
    if (arr.length == 0) {
      list.push(str);
      return str;
    }
    for (let i = 0; i < arr.length; i++) {
      const newStr = str + arr[i];
      const newArr = arr.slice(0);
      newArr.splice(i, 1);
      _join(newStr, newArr);
    }
  }

  return list;
}

// const list = combineStr2Arr('abcd');
// console.info(list);