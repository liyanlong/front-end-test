import {assert} from 'chai'
import {
  camelCaseToUnderline,
  underlineToCamelCase
} from 'core/util'

describe('camelCase <=> underline', () => {

  describe('#camelCaseToUnderline()', () => {
    it('should return camel_case when the value is CamelCase', () => {
      assert.equal(camelCaseToUnderline('CamelCase'), 'camel_case')      
    })
    it('should throw TypeError when the value is not typeof string', () => {
      try {
        camelCaseToUnderline()
      } catch(e) {
        assert.instanceOf(e, TypeError)
      }
    })
  });

  describe('#underlineToCamelCase()', () => {

    it('should throw TypeError when the value is not typeof string', () => {      
      try {
        underlineToCamelCase()
      } catch(e) {
        assert.instanceOf(e, TypeError)
      }
    })
    
    it('should return camelCase when the value is camel_case', () => {
      assert.equal(underlineToCamelCase('camel_case'), 'camelCase')
    })
  })

})
