import {assert} from 'chai'
import {
  createElm
} from '../../utils'

import {
  trim
} from 'core/util'

import { mergeRowspan } from '../../../../src/core/dom/table/merge_span'

describe('Table', () => {
  let table
  beforeEach(() => {
    table = createElm('table')
  })


  describe('Table Rowspan', () => {
    
     /**
     * -------------- 
     * | A | testA  | 
     * -------------- 
     * | B | testA  | 
     * -------------- 
     * | B | testB2 | 
     * -------------- 
     */
    beforeEach(() => {
      let html = `
      <thead><tr><td>Column 1</td><td>Column 2</td></tr></thead>  
      <tbody>
        <tr><td>A</td><td>testA</td></tr>
        <tr><td>B</td><td>testA</td></tr>
        <tr><td>B</td><td>testB2</td></tr>
      </tbody>
      `
      table.innerHTML = trim(html)
      document.body.appendChild(table)
    })
    
    /**
     * 
     * --------------        --------------
     * | A | testA  |        | A |        |
     * --------------        ----  testA  |
     * | B | testA  |   =>   |   |        |
     * --------------          B  ---------
     * | B | testB2 |        |   | testB2 |
     * --------------        --------------
     * 
     */
    it('#mergeRowspan()', () => {
      mergeRowspan(table)
      const column = table.querySelector('tbody > tr:first-child > td:nth-child(2)')
      assert.equal(column.rowSpan, '2')
    })
  })

  afterEach(function ()　{
    document.body.removeChild(table)
  })
})