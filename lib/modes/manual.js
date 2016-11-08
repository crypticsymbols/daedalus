'use strict'
var BaseMode = require('./baseMode')

class Manual extends BaseMode {
  tick(inputs, vehicleState, controlFunction) {
    controlFunction(inputs)
  }
}

module.exports = Manual

