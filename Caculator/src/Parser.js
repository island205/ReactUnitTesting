"use strict";

export default class Parser {
  constructor () {
    this.result = 0
    this.state = Parser.state.START
  }

  take (char) {
    if ((char >= '0' && char <= '9') || char == '.') {
      this.addDigit(char)
    } else if (['C', '±', '/', '×', '-', '+', '='].indexOf(char)) {
      this.operate(char)
    }
  }

  addDigit (char) {
    if (this.state <= Parser.state.INPUT_LEFT_OPERATING_VALUE) {
      if (char == '.' && (this.result + '').indexOf('.') > -1) {
        return
      }
      this.state = Parser.state.INPUT_LEFT_OPERATING_VALUE
      this.result = parseFloat(this.result + char)
    }
  }

  operate (char) {
    switch (char) {
      case 'C':
        this.state = Parser.state.START
        this.result = 0
        break;
      case '±':
        this.result = - this.result
      default:

    }
  }

  getResult () {
    return this.result
  }
}

Parser.state = {
  START: 0,
  INPUT_LEFT_OPERATING_VALUE: 1
}
