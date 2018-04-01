import {
  create_nature_array
} from './array'

/**
 * 创建随机数组, 非唯一性
 * 
 * @param {Number} min 最小值
 * @param {Number} max 最大值
 * @param {Number} length
 * 
 * @return {Array}
 */
export function random_num (min, max, length) {
  min = Math.max(0, min)
  max = Math.max(0, max)
  const [_min, _max] = [Math.min(max, min), Math.max(min, max)]
  const ret = create_nature_array(length)
  const base = _max - _min
  const mapFn = _min === _max
    ? () => _min
    : () => Math.floor(Math.random() * (base + 1) + _min)
  return ret.map(mapFn)
}

export function random_num_uniq(min, max, length) {
  if (arguments.length < 3) {
    throw new Error('请求参数至少3位') 
  }
  length = parseInt(length)

  if (length <= 0 || Math.abs(max - min) + 1 < length) {
    throw new Error('长度要求在 最大值-最小值 + 1')
  }
  const arr = Array.from({length: max - min + 1}, (v, k) => {
    return min + k
  })
  let ret = []
  while(ret.length < length) {
    let randomIndex = Math.floor(Math.random() * arr.length)
    let delArr = arr.splice(randomIndex, 1)
    ret.push(delArr[0])
  }
  return ret
}