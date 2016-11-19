'use strict'
var expect = require('chai').expect
var math = require('../lib/util/math')

describe('scaling percentages elliptically', function() {
  it('returns 100 at upper limit', function() {
    expect(math.ellipticalScale(100)).to.equal(100)
  })
  it('returns 0 at lower limit', function() {
    expect(math.ellipticalScale(0)).to.equal(0)
  })
  it('returns 24.03 at 50', function() {
    expect(math.ellipticalScale(50)).to.equal(24.03)
  })
  it('returns 0 at lower limit', function() {
    expect(math.ellipticalScale(75)).to.equal(51.37)
  })
})

describe('pointZUnderPlane', function() {
  it('returns a known correct value', function() {
    var planeDef = [
    {x: 1, y: 2, z: 3},
    {x: 1, y: 0, z: 1},
    {x: -2, y: 1, z: 0}
    ]
    expect(math.pointZUnderPlane(planeDef, 7, -2)).to.eql({x: 7, y: -2, z: 3})
  })
})
