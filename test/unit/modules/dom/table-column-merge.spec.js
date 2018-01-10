import {
  createElm
} from '../../utils'



describe('merge table', () => {
  let table
  beforeEach(() => {

    table = createElm('table')
  });

  /**
   * 
   * --------------        --------------
   * | A | testA  |        | A | testA  |
   * --------------        --------------
   * | B | testB1 |   =>   |   | testB1 |
   * --------------          B  ---------
   * | B | testB2 |        |   | testB2 |
   * --------------        --------------
   * 
   * 
   */
  it('merge tr table', () => {

  })


})