'use strict'
var BaseMode = require('./baseMode')

class Calibrate extends BaseMode {

  constructor() {
    super(...arguments)
    this.options = {
      min: 1100,
      mid: 1500,
      max: 1900
    }
  }

  tick(inputs, vehicleState, controlFunction) {
    inputs = inputs || {}
    let opts = this.getOptions()
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

