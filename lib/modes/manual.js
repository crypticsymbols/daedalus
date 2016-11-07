function Manual(vehicleConfig) {
  this.vehicleConfig = vehicleConfig
  this.heartbeat = false
  this.tick = (inputs, vehicleState, controlFunction) => {
    controlFunction(inputs)
  }
  return this
}

module.exports = Manual

