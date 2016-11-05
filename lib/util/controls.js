var utils = require('./shared');

var Controls = function(){

  var state = {}

  var fullThrow1toRadians = function(deflection){
    return (deflection / 20); // temp
  }

  var opts = {
    throttle: {
      min: 1100,
      max: 1900
    }
  }

  this.throttleInput = function(throttleValue){
    var min = opts.throttle.min
    var max = opts.throttle.max
    return utils.scalePercentageToValue(throttleValue, min, max);
  }

  this.mapInputs = function(inputs){
    var result = {};
    for (name in inputs){
      var vals = inputs[name]
      if (vals.forEach){
        result[name] = this.mapInputs(inputs[name])
      } else {
        if (typeof(this[name+'Input']) == 'function'){
          result[name] = this[name+'Input'](inputs[name])
        } else {
          result[name] = inputs[name]
        }
      }
    }
    return result;
  }

  this.setState = function(inputs){

    var ins = this.mapInputs(inputs);
    console.log(ins);

    Object.freeze(inputs)
    state = inputs
  }

  this.getState = function(){
    // cheap deep copy
    return JSON.parse(JSON.stringify(state));
  }

}

module.exports = Controls
