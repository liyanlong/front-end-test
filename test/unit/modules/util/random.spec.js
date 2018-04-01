/* eslint-env mocha */
import {
  random_num,
  random_num_uniq
} from 'core/util/random'
import {assert} from 'chai'

describe('Random Function', () => {

  describe('#random_num()', () => {
    it('if min === max, repeat the same values', () => {
      assert.sameMembers(random_num(1, 1, 10), Array.from({length: 10}, () => 1), 'the same members')
    })
    it('allow the length gt max - min', () => {
      assert.isAbove(random_num(1, 10, 20).length, 10 - 1)
    })
  })

  describe('#random_num_uniq()', () => {
    
    it('check num uniq', () => {
      const tmp = {}
      const arr = random_num_uniq(1, 10, 10)
      for (let v of arr) {
        tmp[v] = tmp[v] ? tmp[v] + 1 : 1
        assert.equal(tmp[v], 1, '要求值' + v + '是唯一值')
      }
    })

    it('throw error if not error', () => {
      assert.throws(random_num_uniq, Error, '请求参数至少3位')
    })

  })
})
