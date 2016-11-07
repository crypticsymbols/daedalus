function Calibrate(vehicleConfig) {
  this.vehicleConfig = vehicleConfig
  this.heartbeat = false
  this.tick = (inputs, vehicleState, controlFunction, opts) => {
    var pwmRange = vehicleConfig.throttle
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
  return this
}

module.exports = Calibrate

