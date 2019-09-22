

/**
 * 冒泡排序算法
 * 最优情况 O(n), 最差情况 O(n)^2
 * example: [12, 0, 5, 3]
 * 第一次外循环: [0, 12, 5, 3]
 * 第二次外循环: [0, 3, 12, 5]
 * 第三次外循环: [0, 3, 5, 12]
 * @param {Array} arr 带排序数组
 * @param {String} sort 排序规则 desc: 降序, asc： 升序
 * 
 * @return {Array} 已排序数组
 */
export function bubble_sort (arr, sort = 'asc') {
  arr = arr.slice()
  for (let i = 0; i < arr.length; i++) {
    for (let j = i; j < arr.length; j++) {
      // 最小值在第一位
      if (arr[j] > arr[j + 1]) {
        let tmp = arr[j + 1]
        arr[j + 1] = arr[j]
        arr[j] = tmp
      }
    }
  }
  return sort === 'asc' ? arr : arr.reverse()
}
