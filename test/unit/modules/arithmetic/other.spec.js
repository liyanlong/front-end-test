import {
  gotoStep
} from '@/arithmetic/other'
import {assert} from 'chai'

describe('Other', () => {
  
  it('#gotoStep()', () => {
    // 1 => 1
    // 2 => 1, 1; 2
    // 3 => 1, 1, 1; 1, 2; 2, 1
    // 4 => 1, 1, 1, 1;  1, 1, 2; 1, 2, 1; 2, 1, 1; 2, 2;
    assert.lengthOf(gotoStep(1, '', []), 1)
    assert.lengthOf(gotoStep(2, '', []), 2)
    assert.lengthOf(gotoStep(3, '', []), 3)
    assert.lengthOf(gotoStep(4, '', []), 5)
  })
})