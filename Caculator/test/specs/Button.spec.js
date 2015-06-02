import React from 'react/addons'
import Button from '../../src/Button'

var TestUtils = React.addons.TestUtils

describe('Button', function () {

  it('should generate an equal button', function () {
    var button = TestUtils.renderIntoDocument(
      <Button letter="=" />
    )
    expect(button.getDOMNode().textContent).toBe('=')
  })

  it('should call onPress as being clicked', function () {
    var letter
    var button = TestUtils.renderIntoDocument(
      <Button
        letter="=" onPress={function (lt) {
        letter = lt
      }}/>
    )

    TestUtils.Simulate.click(button.getDOMNode())

    expect(letter).toBe('=')
  })

  it('should have right position and size', function () {
    var position = [1, 3]
    var size = [2, 1]
    var button = TestUtils.renderIntoDocument(
      <Button letter='=' position={position} size={size}/>
    )
    var domNode = button.getDOMNode()
    expect(domNode.style.width).toBe(size[0] * 48 + 8 + 'px')
    expect(domNode.style.top).toBe(position[1] * 38 + 'px')
  })
})
