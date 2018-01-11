
/**
 * 驼峰写法转下划线写法
 * 
 * @author liyanlong
 * 
 * @param {string} name 变量名
 * @throws {TypeError} 
 * 
 * @return {string}
 */
export function camelCaseToUnderline (name) {
  if (typeof name !== 'string') {
    throw TypeError('传入参数不正确, 要求为字符串类型')
  }
  return name.replace(/[A-Z]/g, function (val, index) {    
    let char = val.toLowerCase()

    // 首字母为大写时无需加入下划线
    return index === 0 ? char : '_' + char
  })
}

/**
 * 下划线写法转驼峰写法
 * 
 * @author liyanlong
 * 
 * @param {String} name
 * @throws {TypeError} 
 * 
 * @return {String}
 */
export function underlineToCamelCase (name) {
  if (typeof name !== 'string') {
    throw TypeError('传入参数不正确, 要求为字符串类型')
  }
  return name.replace(/_([a-z|A-Z])/g, function (matchStr, char, index) {
    if (index > 0) {
      return char.toUpperCase()
    }
    return matchStr
  })
}
