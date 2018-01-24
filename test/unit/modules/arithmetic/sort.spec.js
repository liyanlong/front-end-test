import {
  bubble_sort
} from '@/arithmetic/sort'
import {assert} from 'chai'

describe('Arithmetic Sort', () => {
  const arr = [1, 5, 10, 7, 6, 8, 100]
  const sortArr = [1, 5, 6, 7, 8, 10, 100] 

  describe('#bubble_sort()', () => {
    
    it('bubble_sort desc', () => {
      assert.deepEqual(bubble_sort(arr), sortArr)
    })

    it('bubble_sort asc', () => {
      assert.deepEqual(bubble_sort(arr, 'asc'), sortArr.reverse())
    })
  })

})
