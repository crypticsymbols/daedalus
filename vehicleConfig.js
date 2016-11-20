'use strict'
var Copter = require('./lib/platforms/copter')
// vehicle setup
var math = require('./lib/util/math')
var util = require('./lib/util/shared')
var opts = {
  motorMap: {
    // pwmChannel: {x, y, rotation}
    3: {y: 1, x: 1, rotation: 'cw'},
    4: {y: -1, x: -1, rotation: 'cw'},
    5: {y: -1, x: 1, rotation: 'ccw'},
    6: {y: 1, x: -1, rotation: 'ccw'}
  },
  throttle: {
    min: 1100,
    mid: 1500,
    max: 1900
  },
  axisScale: {
    xR: 1,
    yR: 1,
    zR: 1
  },
  inputFilters: {
    throttle: [
      (value) => {
        return math.ellipticalScale(value)
      },
      (value, opts) => {
        let min = opts.throttle.min
        let max = opts.throttle.max
        return util.scalePercentageToValue(value, min, max)
      }
    ]
  }
}

var vehicle = new Copter(opts)

module.exports = vehicle

