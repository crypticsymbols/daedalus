var subject = require('../lib/util/shared')
var expect    = require("chai").expect;

describe('scaling values', function(){

  it('scales values, e.g. % to PWM range', function(){
    expect(subject.scalePercentageToValue(10, 1000, 2000)).to.equal(1100)
    expect(subject.scalePercentageToValue(130, 1000, 2000)).to.equal(1100)
    expect(subject.scalePercentageToValue(37, 174, 2837)).to.equal(1159.31)
  })

})