"use strict";

export default class Parser {
  constructor () {
    this.reset()
  }

  reset (result) {
    if (result) {
      this.screen = this.result = result
    } else {
      this.screen = this.result = 0
    }
    this.state = Parser.state.RESET
    this.stack = []
    this.operation = null
  }

  take (char) {
    if (this.state == Parser.state.RESET) {
      if (/^([0-9]|\.)$/.test(char)) {
        this.state = Parser.state.INPUT_LEFT_VALUE
        if (char != '.' || this.stack.indexOf(char) == -1) {
          this.stack.push(char)
          this.screen = this.stack.join('')
        }
      } else if (['+', '-', '×', '/'].indexOf(char) > -1) {
        this.state = Parser.state.INPUT_RIGHT_VALUE
        this.operation = char
      } else if (char == 'C') {
        this.reset()
      } else if (char == '±') {
        this.screen = this.result = - this.result
      }
    } else if (this.state == Parser.state.INPUT_LEFT_VALUE) {
      if (/^([0-9]|\.)$/.test(char)) {
        if (char != '.' || this.stack.indexOf(char) == -1) {
          this.stack.push(char)
          this.screen = this.stack.join('')
        }
      } else if (char == '±') {
        if (this.stack[0] != '-') {
          this.stack.unshift('-')
        } else {
          this.stack.shift()
        }
        this.screen = this.stack.join('')
      } else if (char == 'C') {
        this.reset()
      } else if (char == '=') {
        this.reset(parseFloat(this.stack.join('')))
      } else if (['+', '-', '×', '/'].indexOf(char) > -1) {
        this.state = Parser.state.INPUT_RIGHT_VALUE
        this.operation = char
        this.screen = this.stack.join('')
        this.result = parseFloat(this.screen)
        this.stack = []
      }
    } else if (this.state == Parser.state.INPUT_RIGHT_VALUE) {
      if (/^([0-9]|\.)$/.test(char)) {
        if (char != '.' || this.stack.indexOf(char) == -1) {
          this.stack.push(char)
          this.screen = this.stack.join('')
        }
      } else if (char == 'C') {
        this.reset()
      } else if (char == '=') {
        if (this.stack.length == 0) {
          return
        }
        this.operate()
      } else if (['+', '-', '×', '/'].indexOf(char) > -1) {
        if (this.stack.length == 0) {
          this.operation = char
        } else {
          this.operate()
          this.operation = char
          this.state = Parser.state.INPUT_RIGHT_VALUE
        }
      }
    } else if (this.state == Parser.state.ERROR) {
      if (char = 'C') {
        this.reset()
      } else if (/^([0-9]|\.)$/.test(char)) {
        this.state = Parser.state.INPUT_LEFT_VALUE
        if (char != '.' || this.stack.indexOf(char) == -1) {
          this.stack.push(char)
          this.screen = this.stack.join('')
        }
      }
    }
  }

  operate () {
    var rightValue, result
    var leftPointLength, rightPointLength, resultPointLength
    rightValue = parseFloat(this.stack.join(''))
    leftPointLength = this.pointLength(this.result)
    rightPointLength = this.pointLength(rightValue)
    switch (this.operation) {
      case '+':
        result = this.result + rightValue
        resultPointLength = this.pointLength(result)
        if (resultPointLength > leftPointLength
              && resultPointLength > rightPointLength) {
          result = result.toFixed(Math.max(leftPointLength, rightPointLength))
          result = parseFloat(result)
        }
        this.reset(result)
        break
      case '-':
        result = this.result - rightValue
        resultPointLength = this.pointLength(result)
        if (resultPointLength > leftPointLength
              && resultPointLength > rightPointLength) {
          result = result.toFixed(Math.max(leftPointLength, rightPointLength))
          result = parseFloat(result)
        }
        this.reset(result)
        break
      case '×':
        result = this.result * rightValue
        resultPointLength = this.pointLength(result)
        if (resultPointLength > leftPointLength + rightPointLength) {
          result = result.toFixed(leftPointLength + rightPointLength)
          result = parseFloat(result)
        }
        this.reset(result)
        break
      case '/':
        if (rightValue == 0) {
          this.state = Parser.state.ERROR
          this.screen = this.result = 'ERROR'
          this.stack = []
          this.operation = null
        } else {
          result = this.result / rightValue
          resultPointLength = this.pointLength(result)
          if (resultPointLength > 10) {
            result = result.toFixed(10)
            result = parseFloat(result)
          }
          this.reset(result)
        }
      default:

    }
  }

  pointLength (number) {
    number += ''
    if (number.indexOf('.') > -1) {
      return number.length - number.indexOf('.') - 1
    } else {
      return 0
    }
  }

  getScreen () {
    return this.screen
  }
}

Parser.state = {
  RESET: 0,
  INPUT_LEFT_VALUE: 1,
  INPUT_RIGHT_VALUE: 2,
  ERROR: 3
}
