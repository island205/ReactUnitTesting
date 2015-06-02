import React from 'react'

import './Button.less'

var PropTypes = React.PropTypes

export default React.createClass({
  propTypes: {
    letter: PropTypes.string,
    position: PropTypes.array,
    size: PropTypes.array,
    onPress: PropTypes.func
  },
  getDefaultProps: function () {
    return {
      letter: ' ',
      position: [0, 0],
      size: [1, 1],
      onPress: function () {}
    }
  },
  onPress: function (event) {
    event.preventDefault()
    this.props.onPress(this.props.letter)
  },
  render: function () {
    var style = {
      left: 56 * this.props.position[0],
      top: 38 * this.props.position[1],
      width: 48 * this.props.size[0],
      height: 32 * this.props.size[1]
    }

    var type = ''

    if (this.props.size[0] == 2) {
      style.width = style.width + 8
    }

    if (this.props.size[1] == 2) {
      style.height = style.height + 6
    }

    if (this.props.letter == 'C') {
      type = 'clear'
    }

    if (this.props.letter == '=') {
      type = 'equal'
    }

    if (['+', '-', '×', '/', '±'].indexOf(this.props.letter) > -1) {
      type = 'operation'
    }

    return (
      <a
        style={style}
        onClick={this.onPress}
        className={'button ' + type}>{this.props.letter}</a>
    )
  }
})
