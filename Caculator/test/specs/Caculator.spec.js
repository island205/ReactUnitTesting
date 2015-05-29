import React from 'react/addons'
import Caculator from '../../src/Caculator'

var TestUtils = React.addons.TestUtils

describe('Caculator', function () {
  var caculator

  beforeEach(function () {
    caculator = TestUtils.renderIntoDocument(<Caculator />)
  })

  it('should display a caculator', function () {
    expect(caculator.getDOMNode().textContent).toBe('caculator')
  })
})
