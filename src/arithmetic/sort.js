

/**
 * 冒泡排序算法
 * 最优情况 O(n), 最差情况 O(n)^2
 * 
 * @param {Array} arr 带排序数组
 * @param {String} sort 排序规则 desc: 降序, asc： 升序
 * 
 * @return {Array} 已排序数组
 */
export function bubble_sort (arr, sort = 'desc') {
  arr = arr.slice()
  for (let i = 0; i < arr.length; i ++) {
    for (let j = 1; j < arr.length - i - i; j++) {
      if (arr[j] > arr[j + 1]) {
        let tmp = arr[j + 1]
        arr[j + 1] = arr[j]
        arr[j] = tmp
      }
    }
  }
  return sort === 'desc' ? arr : arr.reverse()
}
