import {
  create_array
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
  let [_min, _max] = [Math.min(max, min), Math.max(min, max)]
  const ret = create_array(length)
  const base = _max - _min
  const mapFn = _min === _max
    ? () => _min
    : () => Math.floor(Math.random() * (base + 1) + _min)
  return ret.map(mapFn)
}
