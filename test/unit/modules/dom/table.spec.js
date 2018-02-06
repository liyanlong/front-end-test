/* eslint-env mocha */
import {assert} from 'chai'
import {
  createElm
} from '../../utils'

import {
  trim
} from 'core/util'

import { mergeRowspan, mergeColspan } from '../../../../src/core/dom/table/merge_span'

describe('Table', () => {
  let table1
  let table2
  beforeEach(() => {
    table1 = createElm('table')
    table2 = createElm('table')
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
      let html1 = `
      <thead><tr><td>Column 1</td><td>Column 2</td></tr></thead>  
      <tbody>
        <tr><td>A</td><td>testA</td></tr>
        <tr><td>B</td><td>testA</td></tr>
        <tr><td>B</td><td>testB2</td></tr>
      </tbody>
      `
      let html2 = `
      <thead><tr><td>Column 1</td><td>Column 2</td><td>Column 3</td></tr></thead>  
      <tbody>
        <tr><td>A</td><td>testA</td><td>testA</td></tr>
        <tr><td>B</td><td>testB</td><td>testB</td></tr>
        <tr><td>C</td><td>testC1</td><td>testC1</td></tr>
      </tbody>
      `
      table1.innerHTML = trim(html1)
      table2.innerHTML = trim(html2)
      document.body.appendChild(table1)
      document.body.appendChild(table2)
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
      mergeRowspan(table1)
      const column1 = table1.querySelector('tbody > tr:first-child > td:nth-child(2)')
      const column2 = table1.querySelector('tbody > tr:nth-child(2) > td:first-child')
      assert.equal(column1.rowSpan, '2')
      assert.equal(column2.rowSpan, '2')
    })

    /**
     * 
     * -----------------------       -------------------------
     * | A | testA  |  testA |       | A |      testA        |
     * -----------------------       -------------------------
     * | B | testB  |  testB |   =>  | B |      testB        |
     * ----------------------        -------------------------
     * | C | testC1 | testC2 |       | C |  testC1 |  testC2 |
     * -----------------------       -------------------------
     * 
     */
    it('#mergeColspan()', () => {
      mergeColspan(table2)
      const column1 = table2.querySelector('tbody > tr:first-child > td:nth-child(2)')
      const column2 = table2.querySelector('tbody > tr:nth-child(2) > td:nth-child(2)')
      assert.equal(column1.colSpan, '2')
      assert.equal(column2.colSpan, '2')
    })

  })

  afterEach(function () {
    document.body.removeChild(table1)
    document.body.removeChild(table2)
  })
})
