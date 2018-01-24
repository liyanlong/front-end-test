import {
  random_num
} from 'core/util'
import {assert} from 'chai'

import {caculateBestBuyInOut} from '@/business/stock'

describe('Business Stock', () => {
  it('#caculateBestBuyInOut()', () => {
    const stock30Days = [40, 90, 91, 91, 54, 42, 13, 12, 79, 31, 70, 51, 18, 94, 26, 29, 59, 20, 62, 17, 92, 43, 23, 81, 87, 19, 51, 64, 70, 15]
    const ret = caculateBestBuyInOut(stock30Days)
    assert.deepEqual(ret, {start: 7, end: 13})
  });
});
