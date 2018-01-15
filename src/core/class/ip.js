
export class Ip {

  static validIp (ip) {
    return /^(((\d{1,2})|(1\d{1,2})|(2[0-4]\d)|(25[0-5]))\.){3}((\d{1,2})|(1\d{1,2})|(2[0-4]\d)|(25[0-5]))$/.test(ip)
  }
  /**
   * 将ip转换为number数值, 当前只考虑 IPV4
   * 
   */
  static stringify(ip) {
    if (!Ip.validIp(ip)) {
      throw new TypeError('ip格式不正确')
    }
    const numbers = ip.split('.')
    let i = 4
    let number = 0
    while (i--) {
      number += numbers[3 - i] * Math.pow(2, i * 8)
    }
    return number
  }

  static parse(number) {
    const numbers = []
    let i = 4
    while(i--) {
      numbers.unshift(number & 0xFF)
      number = number >> 8
    }
    return numbers.join('.')
  }
}
