'use strict'
var BaseMode = require('./baseMode')

class Calibrate extends BaseMode {
  tick(inputs, vehicleState, controlFunction, opts) {
    inputs = inputs || {}
    var pwmRange = this.vehicleConfig.throttle
    var stage = opts.stage
    // zero attitude inputs so PWM values do not get mapped
    inputs.attitude = {
      xR: 0,
      yR: 0,
      zR: 0
    }
    inputs.throttle = pwmRange[stage]
    controlFunction(inputs)
  }
}

module.exports = Calibrate

