import Parser from '../../src/Parser'

describe('Parser', function () {
  var parser

  beforeEach(function () {
    parser = new Parser()
  })

  it('should start with a init state', function () {
    expect(parser.state).toBe(Parser.state.START)
  })

  it('should accept integer number', function () {
    parser.take('1')
    parser.take('2')
    expect(parser.getResult()).toBe(12)
  })

  it('should accpet float number', function () {
    parser.take('.')
    parser.take('1')
    expect(parser.getResult()).toBe(.1)
  })

  it('should ingore dot after dot been input', function () {
    parser.take('1')
    parser.take('.')
    parser.take('.')
    parser.take('1')
    expect(parser.getResult()).toBe(1.1)
  })
})
