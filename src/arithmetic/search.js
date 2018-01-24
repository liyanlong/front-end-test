/**
 * 二分查找算法
 * 时间复杂度O(log2n)
 * 
 * @param {String} search 
 * @param {Array} arr
 * 
 * @return {Number} 下标index
 */

export function binary_search (search, arr) {
  let low = 0
  let high = arr.length - 1
  if (arr[low] === search) {
    return low
  }
  if (arr[high] === search) {
    return high
  }
  while (low <= high) {
    let mid = Math.ceil((high + low) / 2)
    if (search === arr[mid]) {
      return mid
    } else if (search < arr[mid]) {
      high = mid
    } else if (search > arr[mid]) {
      low = mid
    } else {
      return -1
    }
  }
}
