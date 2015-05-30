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
      left: 80 * this.props.position[0],
      top: 60 * this.props.position[1],
      width: 72 * this.props.size[0],
      height: 48 * this.props.size[1]
    }
    return (
      <a
        style={style}
        onClick={this.onPress}
        className={'button'}>{this.props.letter}</a>
    )
  }
})
