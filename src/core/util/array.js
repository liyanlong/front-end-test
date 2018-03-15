import {
  isPlainObject,
  isNative
} from './util'

/**
 * 简单去重, 使用 indexOf
 */
export function array_unique (...args) {
  const sourceArr = Array.prototype.concat.apply([], args)
  const result = []
  sourceArr.forEach((item) => {
    if (!~result.indexOf(item)) {
      result.push(item)
    }
  })
  return result
}

/**
 * 循环去重，使用 ===
 * 
 * @return {Array}
 */
export function array_unique2 (...args) {
  const sourceArr = Array.prototype.concat.apply([], args)
  const result = []
  for (let i = 0, len1 = sourceArr.length; i < len1; i++) {
    let hasExist = false
    for (let j = 0, len2 = result.length; j <len2; j++) {
      if (sourceArr[i] === result[j]) {
        hasExist = true
        break
      }
    }
    if (!hasExist) {
      result.push(sourceArr[i])
    }
  }
  return result
}

/**
 * 数组去重
 * 支持对象 [{a: 1}, {b: 1}, {a: 1}] 去重 => [{a: 1}, {b: 1}]
 * 
 * @author liyanlong
 * 
 * @return {Array}
 */

export function extend_array_unique (...args) {
  const sourceArr = Array.prototype.concat.apply([], args)
  const tmp = {}
  const result = []
  
  function data2key (obj) {
    let keyStr = ''
    if (!isPlainObject(obj)) {
      return typeof obj + ':' + obj
    }
    Object.keys(obj).sort().forEach((key) => {
      if (keyStr !== '') {
        keyStr += ','
      }
      keyStr += typeof obj[key] 
      if (isPlainObject(obj[key])) {
        keyStr += '::' + data2key(obj[key]) + '=' + obj[key]
      } else {
        keyStr += ':' + key + '=' + obj[key]
      }
    })
    return keyStr
  }

  sourceArr.forEach((item) => {
    let key = data2key(item)
    if (1 !== tmp[key]) {
      tmp[key] = 1
      result.push(item)
    }
  })

  return result
}

/**
 * ES5的方法创建一个自然数组
 * @param {*} length 
 */
export function create_nature_array (length = 0) {
  if (isNative(Array.from)) {
    return Array.from(Array(length).keys())
  }
  return Array.apply(null, {length}).map((v, k) => k)
}
