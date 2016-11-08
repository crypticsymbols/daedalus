'use strict'

class BaseMode {

  constructor(vehicleConfig) {
    this.vehicleConfig = vehicleConfig
    this.heartbeat = false
  }

  tick() {
  }
}

module.exports = BaseMode

