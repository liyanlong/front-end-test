import {
  binary_search
} from '@/arithmetic/search'
import {assert} from 'chai'

describe('Search', () => {
  const sortArr = [1, 5, 100, 222, 333, 555, 666, 1111]
  it('#binary_search()', () => {
    assert.equal(binary_search(333, sortArr), 4)
    assert.equal(binary_search(555, sortArr), 5)
  })
})
