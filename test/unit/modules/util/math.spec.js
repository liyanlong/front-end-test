/* eslint-env mocha */
import {add} from 'core/util/math'
import {assert} from 'chai'

describe('Math ', () => {

  it('#add()', () => {
    const params = [
      ['3', '2', '5'],
      ['123', '456', '579'],
      ['999999', '1', '1000000'],
      ['9'.repeat(364), '1', '1' + '0'.repeat(364)]
    ]
    for (let param of params) {
      assert.equal(add(param[0], param[1]), param[2]) 
    }
  })
})
