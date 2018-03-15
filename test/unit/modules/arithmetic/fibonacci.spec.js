import {
  normal,
  tail,
  fast,
} from '@/arithmetic/fibonacci'
import {assert} from 'chai'

describe('fibonacci arithmetic', () => {
  
  describe('check fibonacci ok', () => {

    it('#normal fibonacci', () => {
      assert.equal(normal(5), 5, 'the normal fibonacci is not pass')
    })
  
    it('#tail arithmetic', () => {
      assert.equal(tail(5), 5, 'the normal fibonacci is not pass')
    })
  
    it('#fast arithmetic', () => {
      assert.equal(fast(5), 5, 'the normal fibonacci is not pass')
    })
  
  })

})
