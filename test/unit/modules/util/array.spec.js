import {assert} from 'chai'
import {
  array_unique,
  array_unique2,
  extend_array_unique,
  create_array
} from 'core/util'

describe('Array', () => {
  describe('Array Unique', () => {
    let arr1
    let arr2
  
    beforeEach(function() {
      arr1 = [1, '1', null, undefined, 1, 0]
      arr2 = [[1, 2, 3], [1, 2, 3], {a: 1, b: 1}, {a: 2}, {b:1, a: 1}]
    })
  
    it('#array_unique()', () => {
      assert.sameMembers(array_unique(arr1), [1, '1', null, undefined, 0])
      assert.lengthOf(array_unique(arr1, arr1), 5)
    })
  
    it('#array_unique2()', () => {
      assert.sameMembers(array_unique2(arr1), [1, '1', null, undefined, 0])
      assert.lengthOf(array_unique2(arr1, arr1), 5)
    })
  
    it('#extend_array_unique()', () => {
      assert.equal(JSON.stringify(extend_array_unique(arr2)), JSON.stringify([[1, 2, 3], {a: 1, b: 1}, {a: 2}]))
      assert.lengthOf(extend_array_unique(arr2), 3)
    })
  })

  describe('Array Create', () => {
    it('#createArray', () => {
      const length = 10
      const maps = [
        create_array(length),
        [...Array(length)],
        Array.from(Array(length))
      ]
      for (let map of maps) {
        assert.lengthOf(map, length)
      }
    })
  })

})
