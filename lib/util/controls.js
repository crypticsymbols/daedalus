'use strict'
var dot = require('dot-object')

Object.resolve = function(path, obj) {
  return path.split('.').reduce(function(prev, curr) {
    return prev ? prev[curr] : undefined
  }, obj || this)
}

function Controls(options) {
  var state = {}

  var opts = Object.assign({
    inputFilters: {},
    outputFilters: {}
  }, options)

  var convert = (direction, values) => {
    direction += 'Filters'
    let dotValues = dot.dot(values)
    let returnObject = {}
    for (var key in dotValues) {
      var originalValue = dotValues[key]
      var converter = opts[direction][key]
      var runList
      if (converter) {
        runList = (typeof converter === 'function' ? [converter] : converter)
      }
      if (runList) {
        var value = originalValue
        runList.map(function(c) {
          value = c(value)
        })
        returnObject[key] = value
      } else {
        returnObject[key] = originalValue
      }
    }
    return dot.object(returnObject)
  }

  this.setState = function(inputs, callback) {
    var ins = convert('input', inputs)
    Object.freeze(ins)
    state = ins
    var returnState = this.getState()// deep copy magic
    if (callback) callback(returnState)
  }

  this.getState = function() {
    // cheap deep copy
    let unfrozen = JSON.parse(JSON.stringify(state))
    let convertedState = convert('output', unfrozen)
    return convertedState
  }
}

module.exports = Controls
