'use strict'

var deap = require('deap')
var freeze = require('deep-freeze-node')

class BaseMode {

  constructor(vehicleConfig) {
    this.vehicleConfig = vehicleConfig
    this.heartbeat = false
    this.options = {}
  }

  setOptions(options) {
    options = options || {}
    this.options = freeze(deap.extend(this.getOptions(), options))
    return this.getOptions()
  }

  getOptions() {
    return deap.clone(this.options)
  }

  tick() {
  }
}

module.exports = BaseMode

