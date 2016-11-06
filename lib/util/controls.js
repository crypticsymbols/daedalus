var utils = require('./shared')

var Controls = function(options) {
  var state = {}

  var opts = options

  this.throttleInput = function(throttleValue) {
    var min = opts.throttle.min
    var max = opts.throttle.max
    return utils.scalePercentageToValue(throttleValue, min, max)
  }

  this.attitudeInput = function(axes) {
    var scale = opts.axisScale
    return {
      xR: axes.xR * scale.xR,
      yR: axes.yR * scale.yR,
      zR: axes.zR * scale.zR
    }
  }

  this.mapInputs = function(inputs) {
    var result = {}
    for (name in inputs) {
      var vals = inputs[name]
      if (typeof (this[name + 'Input']) == 'function') {
        result[name] = this[name + 'Input'](inputs[name])
      } else if (vals.forEach) {
        result[name] = this.mapInputs(inputs[name])
      } else {
        result[name] = inputs[name]
      }
    }
    return result
  }

  this.setState = function(inputs, callback) {
    var ins = this.mapInputs(inputs)
    Object.freeze(ins)
    state = ins
    var returnState = this.getState()// deep copy magic
    callback(returnState)
  }

  this.getState = function() {
    // cheap deep copy
    return JSON.parse(JSON.stringify(state))
  }
}

module.exports = Controls
