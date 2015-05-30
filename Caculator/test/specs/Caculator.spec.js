import React from 'react/addons'
import Caculator from '../../src/Caculator'

var TestUtils = React.addons.TestUtils

describe('Caculator', function () {
  var caculator

  beforeEach(function () {
    caculator = TestUtils.renderIntoDocument(<Caculator />)
  })

  it('should display a caculator', function () {
    var divs = TestUtils.scryRenderedDOMComponentsWithTag(caculator, 'div')
    expect(divs.length).toBe(3)
    var as = TestUtils.scryRenderedDOMComponentsWithTag(caculator, 'a')
    expect(as.length).toBe(18)
  })
})
