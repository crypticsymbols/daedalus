'use strict'

var deap = require('deap')

class BaseMode {

  constructor(vehicleConfig) {
    this.vehicleConfig = vehicleConfig
    this.heartbeat = false
    this.options = {}
  }

  setOptions(options) {
    options = options || {}
    let currentOpts = this.getOptions()
    this.options = deap.extend(currentOpts, options)
    return this.getOptions()
  }

  getOptions() {
    return JSON.parse(JSON.stringify(this.options))
  }

  tick() {
  }
}

module.exports = BaseMode

