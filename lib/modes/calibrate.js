'use strict'
var BaseMode = require('./baseMode')

class Calibrate extends BaseMode {
  tick(inputs, vehicleState, controlFunction, opts) {
    var pwmRange = this.vehicleConfig.throttle
    var stage = opts.stage
    console.log(this.vehicleConfig)
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

