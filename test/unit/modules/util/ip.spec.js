import {Ip} from 'core/class'
import {assert} from 'chai'
describe('Ip', () => {

  let ipList = [];

  beforeEach(function () {
    ipList = [
      '127.0.0.1',
      '192.168.1.1',
      '255.255.255.255',
      '8.8.8.8'
    ]
  })

  function serialize (ip) {
    return Ip.parse(Ip.stringify(ip))
  }

  describe('#stringify, parse()', () => {
    ipList.forEach((ip) => {
      assert.equal(serialize(ip), ip)
    })
  })

})
